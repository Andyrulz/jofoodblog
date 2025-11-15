/**
 * Recipe Filter Module
 * Handles filtering, searching, and user interactions
 */

(function() {
    'use strict';

    // State
    let allRecipes = [];
    let filteredRecipes = [];
    let activeFilters = {
        mealType: [],
        dietary: [],
        time: [],
        ingredient: [],
        search: ''
    };
    let currentSort = 'featured';

    // DOM Elements
    const elements = {
        searchInput: null,
        searchClear: null,
        sortSelect: null,
        filterChips: null,
        recipesCount: null,
        clearAllButton: null,
        sidebarClearAll: null,
        filtersSidebar: null,
        filtersMobileToggle: null,
        filtersMobileClose: null
    };

    // Initialize
    function init() {
        // Cache DOM elements
        elements.searchInput = document.getElementById('recipeSearch');
        elements.searchClear = document.getElementById('searchClear');
        elements.sortSelect = document.getElementById('sortSelect');
        elements.recipesCount = document.getElementById('recipesCount');
        elements.clearAllButton = document.getElementById('clearAllFilters');
        elements.sidebarClearAll = document.getElementById('sidebarClearAll');
        elements.filtersSidebar = document.getElementById('filtersSidebar');
        elements.filtersMobileToggle = document.getElementById('filtersMobileToggle');
        elements.filtersMobileClose = document.getElementById('filtersMobileClose');
        
        // Get all filter chips
        elements.filterChips = document.querySelectorAll('.filter-chip');
        
        // Load recipes
        loadRecipes();
        
        // Set up event listeners
        setupEventListeners();
    }

    // Load recipes from JSON
    async function loadRecipes() {
        try {
            const response = await fetch('../data/recipes.json');
            const data = await response.json();
            allRecipes = data.recipes || [];
            filteredRecipes = [...allRecipes];
            
            // Initial render
            updateDisplay();
        } catch (error) {
            console.error('Error loading recipes:', error);
            showError();
        }
    }

    // Set up all event listeners
    function setupEventListeners() {
        // Search input
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', handleSearch);
        }
        
        // Search clear button
        if (elements.searchClear) {
            elements.searchClear.addEventListener('click', clearSearch);
        }
        
        // Sort select
        if (elements.sortSelect) {
            elements.sortSelect.addEventListener('change', handleSort);
        }
        
        // Filter chips
        elements.filterChips.forEach(chip => {
            chip.addEventListener('click', handleFilterClick);
        });
        
        // Clear all filters buttons
        if (elements.clearAllButton) {
            elements.clearAllButton.addEventListener('click', clearAllFilters);
        }
        
        if (elements.sidebarClearAll) {
            elements.sidebarClearAll.addEventListener('click', clearAllFilters);
        }
        
        // Mobile sidebar toggle
        if (elements.filtersMobileToggle) {
            elements.filtersMobileToggle.addEventListener('click', toggleMobileSidebar);
        }
        
        if (elements.filtersMobileClose) {
            elements.filtersMobileClose.addEventListener('click', closeMobileSidebar);
        }
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                elements.filtersSidebar && 
                elements.filtersSidebar.classList.contains('active') &&
                !elements.filtersSidebar.contains(e.target) &&
                !elements.filtersMobileToggle.contains(e.target)) {
                closeMobileSidebar();
            }
        });
    }
    
    // Toggle mobile sidebar
    function toggleMobileSidebar() {
        if (elements.filtersSidebar) {
            elements.filtersSidebar.classList.toggle('active');
            if (elements.filtersMobileClose) {
                elements.filtersMobileClose.style.display = 
                    elements.filtersSidebar.classList.contains('active') ? 'block' : 'none';
            }
        }
    }
    
    // Close mobile sidebar
    function closeMobileSidebar() {
        if (elements.filtersSidebar) {
            elements.filtersSidebar.classList.remove('active');
            if (elements.filtersMobileClose) {
                elements.filtersMobileClose.style.display = 'none';
            }
        }
    }

    // Handle search input
    function handleSearch(e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        activeFilters.search = searchTerm;
        
        // Show/hide clear button
        if (elements.searchClear) {
            if (searchTerm) {
                elements.searchClear.classList.add('active');
            } else {
                elements.searchClear.classList.remove('active');
            }
        }
        
        applyFilters();
    }

    // Clear search
    function clearSearch() {
        if (elements.searchInput) {
            elements.searchInput.value = '';
            activeFilters.search = '';
        }
        if (elements.searchClear) {
            elements.searchClear.classList.remove('active');
        }
        applyFilters();
    }

    // Handle filter chip click
    function handleFilterClick(e) {
        const chip = e.currentTarget;
        const filterType = chip.getAttribute('data-filter');
        const filterValue = chip.getAttribute('data-value');
        
        // Toggle active state
        chip.classList.toggle('active');
        
        // Update active filters
        const isActive = chip.classList.contains('active');
        
        if (isActive) {
            if (!activeFilters[filterType].includes(filterValue)) {
                activeFilters[filterType].push(filterValue);
            }
        } else {
            activeFilters[filterType] = activeFilters[filterType].filter(v => v !== filterValue);
        }
        
        applyFilters();
        updateActiveFiltersDisplay();
    }

    // Handle sort change
    function handleSort(e) {
        currentSort = e.target.value;
        updateDisplay();
    }

    // Apply all filters
    function applyFilters() {
        filteredRecipes = allRecipes.filter(recipe => {
            // Search filter
            if (activeFilters.search) {
                const searchLower = activeFilters.search.toLowerCase();
                const matchesTitle = recipe.title.toLowerCase().includes(searchLower);
                const matchesDescription = recipe.description.toLowerCase().includes(searchLower);
                const matchesIngredients = recipe.mainIngredients && 
                    recipe.mainIngredients.some(ing => ing.toLowerCase().includes(searchLower));
                
                if (!matchesTitle && !matchesDescription && !matchesIngredients) {
                    return false;
                }
            }
            
            // Meal type filter
            if (activeFilters.mealType.length > 0) {
                const hasMealType = recipe.mealTypes && 
                    activeFilters.mealType.some(type => recipe.mealTypes.includes(type));
                if (!hasMealType) return false;
            }
            
            // Dietary filter
            if (activeFilters.dietary.length > 0) {
                const hasDietary = recipe.dietaryTags && 
                    activeFilters.dietary.every(tag => recipe.dietaryTags.includes(tag));
                if (!hasDietary) return false;
            }
            
            // Time filter
            if (activeFilters.time.length > 0) {
                const hasTime = recipe.prepTimeCategory && 
                    activeFilters.time.includes(recipe.prepTimeCategory);
                if (!hasTime) return false;
            }
            
            // Ingredient filter
            if (activeFilters.ingredient.length > 0) {
                const hasIngredient = recipe.mainIngredients && 
                    activeFilters.ingredient.some(ing => recipe.mainIngredients.includes(ing));
                if (!hasIngredient) return false;
            }
            
            return true;
        });
        
        updateDisplay();
    }

    // Update the display
    function updateDisplay() {
        // Sort recipes
        const sorted = window.RecipeDisplay.sortRecipes(filteredRecipes, currentSort);
        
        // Render recipes
        window.RecipeDisplay.renderRecipes(sorted);
    }

    // Update active filters display - DISABLED in sidebar layout
    // Active filters are now visible in the sidebar at all times
    function updateActiveFiltersDisplay() {
        // No longer needed - filters shown in sidebar
        return;
    }

    // Create active filter tag HTML - DISABLED in sidebar layout
    function createActiveFilterTag(type, value, label) {
        return '';
    }

    // Format filter value for display
    function formatFilterValue(value) {
        return value
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Remove a specific filter
    function removeFilter(type, value) {
        if (type === 'search') {
            clearSearch();
            return;
        }
        
        // Remove from active filters
        activeFilters[type] = activeFilters[type].filter(v => v !== value);
        
        // Update chip visual state
        const chip = document.querySelector(
            `.filter-chip[data-filter="${type}"][data-value="${value}"]`
        );
        if (chip) {
            chip.classList.remove('active');
        }
        
        applyFilters();
        updateActiveFiltersDisplay();
    }

    // Clear all filters
    function clearAllFilters() {
        // Reset all filters
        activeFilters = {
            mealType: [],
            dietary: [],
            time: [],
            ingredient: [],
            search: ''
        };
        
        // Remove active class from all chips
        elements.filterChips.forEach(chip => {
            chip.classList.remove('active');
        });
        
        // Clear search
        clearSearch();
        
        // Update display
        applyFilters();
        updateActiveFiltersDisplay();
    }

    // Show error message
    function showError() {
        const grid = document.getElementById('recipesGrid');
        if (grid) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                    <p style="color: var(--color-text-secondary); font-size: 1.125rem;">
                        Sorry, there was an error loading recipes. Please try again later.
                    </p>
                </div>
            `;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export functions to window object
    window.RecipeFilter = {
        removeFilter,
        clearAllFilters
    };

})();
