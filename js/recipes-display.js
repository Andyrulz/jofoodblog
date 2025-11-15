/**
 * Recipe Display Module
 * Handles rendering recipe cards to the DOM
 */

(function() {
    'use strict';

    // Recipe card template
    function createRecipeCard(recipe) {
        const card = document.createElement('article');
        card.className = 'recipe-card';
        card.setAttribute('data-recipe-id', recipe.id);
        
        // Create difficulty badge
        const difficultyBadge = recipe.difficulty 
            ? `<span class="recipe-card__difficulty recipe-card__difficulty--${recipe.difficulty}">${recipe.difficulty}</span>`
            : '';
        
        // Create time badge
        const totalTime = calculateTotalTime(recipe.prepTime, recipe.cookTime);
        const timeBadge = totalTime 
            ? `<span class="recipe-card__time">⏱️ ${totalTime}</span>`
            : '';
        
        // Create dietary tags
        const dietaryTags = recipe.dietaryTags && recipe.dietaryTags.length > 0
            ? recipe.dietaryTags.slice(0, 2).map(tag => 
                `<span class="recipe-card__tag">${formatTag(tag)}</span>`
              ).join('')
            : '';
        
        card.innerHTML = `
            <a href="recipes/${recipe.slug}.html" class="recipe-card__link">
                <div class="recipe-card__image-wrapper">
                    <img 
                        src="../${recipe.image}" 
                        alt="${recipe.title}"
                        class="recipe-card__image"
                        loading="lazy"
                    >
                    <div class="recipe-card__badges">
                        ${difficultyBadge}
                        ${timeBadge}
                    </div>
                </div>
                <div class="recipe-card__content">
                    <h3 class="recipe-card__title">${recipe.title}</h3>
                    <p class="recipe-card__description">${recipe.description}</p>
                    <div class="recipe-card__meta">
                        <div class="recipe-card__tags">
                            ${dietaryTags}
                        </div>
                        <div class="recipe-card__stats">
                            <span class="recipe-card__stat">
                                <span class="recipe-card__stat-icon">🍽️</span>
                                ${recipe.servings} servings
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        `;
        
        return card;
    }

    // Calculate total time from prep and cook time strings
    function calculateTotalTime(prepTime, cookTime) {
        const prepMinutes = extractMinutes(prepTime);
        const cookMinutes = extractMinutes(cookTime);
        const total = prepMinutes + cookMinutes;
        
        if (total === 0) return '';
        if (total < 60) return `${total} min`;
        
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }

    // Extract minutes from time string (e.g., "10 minutes" -> 10)
    function extractMinutes(timeStr) {
        if (!timeStr) return 0;
        const match = timeStr.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }

    // Format tag for display
    function formatTag(tag) {
        return tag
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Render recipes to the grid
    function renderRecipes(recipes) {
        const grid = document.getElementById('recipesGrid');
        const noResults = document.getElementById('noResults');
        const countElement = document.getElementById('recipesCountNumber');
        const countText = document.getElementById('recipesCount');
        
        if (!grid) return;
        
        // Clear existing content
        grid.innerHTML = '';
        
        // Update count
        if (countElement) {
            countElement.textContent = recipes.length;
        }
        
        if (countText) {
            countText.textContent = recipes.length === 0 
                ? 'No recipes found' 
                : `Showing ${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}`;
        }
        
        // Show/hide no results message
        if (recipes.length === 0) {
            if (noResults) noResults.style.display = 'block';
            return;
        } else {
            if (noResults) noResults.style.display = 'none';
        }
        
        // Render recipe cards
        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            grid.appendChild(card);
        });
        
        // Trigger animation (if you have scroll animations)
        setTimeout(() => {
            const cards = grid.querySelectorAll('.recipe-card');
            cards.forEach(card => card.classList.add('animate-in'));
        }, 50);
    }

    // Sort recipes
    function sortRecipes(recipes, sortBy) {
        const sorted = [...recipes];
        
        switch (sortBy) {
            case 'featured':
                return sorted.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return a.id - b.id;
                });
                
            case 'newest':
                return sorted.sort((a, b) => b.id - a.id);
                
            case 'title-asc':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
                
            case 'title-desc':
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
                
            case 'quick':
                return sorted.sort((a, b) => {
                    const timeA = extractMinutes(a.prepTime) + extractMinutes(a.cookTime);
                    const timeB = extractMinutes(b.prepTime) + extractMinutes(b.cookTime);
                    return timeA - timeB;
                });
                
            default:
                return sorted;
        }
    }

    // Export functions to window object for use by filter module
    window.RecipeDisplay = {
        renderRecipes,
        sortRecipes,
        createRecipeCard
    };

})();
