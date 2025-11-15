/**
 * Main JavaScript for GERD-Friendly Food Blog
 * Handles navigation, smooth scrolling, lazy loading, and accessibility
 */

(function() {
    'use strict';

    // ==========================================
    // Announcement Bar Close
    // ==========================================
    function initAnnouncementBar() {
        const announcementBar = document.querySelector('.announcement-bar');
        const closeButton = document.querySelector('.announcement-bar__close');
        
        if (!announcementBar || !closeButton) return;
        
        // Check if user has previously closed the banner
        if (localStorage.getItem('announcementBarClosed') === 'true') {
            announcementBar.classList.add('announcement-bar--hidden');
        }
        
        closeButton.addEventListener('click', function() {
            announcementBar.classList.add('announcement-bar--hidden');
            localStorage.setItem('announcementBarClosed', 'true');
        });
    }

    // ==========================================
    // Mobile Navigation Toggle
    // ==========================================
    function initMobileNav() {
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle menu visibility
            navMenu.classList.toggle('active');
            
            // Toggle body scroll
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                navToggle.focus();
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // Smooth Scrolling for Anchor Links
    // ==========================================
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerOffset = 80; // Account for fixed header
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Set focus for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            });
        });
    }

    // ==========================================
    // Lazy Loading Images
    // ==========================================
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback to Intersection Observer
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ==========================================
    // Sticky Header on Scroll
    // ==========================================
    function initStickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > scrollThreshold) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // ==========================================
    // Back to Top Button (Optional)
    // ==========================================
    function initBackToTop() {
        // Create back to top button
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.style.display = 'none';
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // Accessible Focus Management
    // ==========================================
    function initFocusManagement() {
        // Add visible focus indicator for keyboard navigation
        document.body.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.body.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
    }

    // ==========================================
    // Animation on Scroll (Optional)
    // ==========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.meal-card, .recipe-card, .article-card');
        animatedElements.forEach(el => observer.observe(el));
    }

    // ==========================================
    // Performance: Debounce Function
    // ==========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==========================================
    // FAQ Accordion
    // ==========================================
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq__item');
        
        if (!faqItems.length) return;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq__question');
            const answer = item.querySelector('.faq__answer');
            
            if (!question || !answer) return;
            
            question.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq__question');
                        const otherAnswer = otherItem.querySelector('.faq__answer');
                        
                        if (otherQuestion && otherAnswer) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherItem.classList.remove('faq__item--active');
                        }
                    }
                });
                
                // Toggle current FAQ item
                this.setAttribute('aria-expanded', !isExpanded);
                item.classList.toggle('faq__item--active');
                
                // Smooth scroll to question if opening and not in viewport
                if (!isExpanded) {
                    setTimeout(() => {
                        const rect = item.getBoundingClientRect();
                        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight * 0.3;
                        
                        if (!isVisible) {
                            const headerOffset = 100;
                            const elementPosition = item.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            });
            
            // Keyboard navigation
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // ==========================================
    // Initialize All Features
    // ==========================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initAnnouncementBar();
        initMobileNav();
        initSmoothScroll();
        initLazyLoading();
        initStickyHeader();
        initBackToTop();
        initFocusManagement();
        initFAQAccordion();
        
        // Delay scroll animations slightly for better performance
        setTimeout(initScrollAnimations, 100);
        
        // Log successful initialization (remove in production)
        console.log('🥗 Gentle Eating: JavaScript initialized successfully');
    }

    // Start initialization
    init();

})();

// ==========================================
// Add CSS for Back to Top Button
// ==========================================
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: var(--color-accent, #7ab892);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .back-to-top:hover,
    .back-to-top:focus {
        background-color: var(--color-hover, #5a9872);
        transform: translateY(-3px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }
    
    .back-to-top:active {
        transform: translateY(-1px);
    }
    
    /* Keyboard focus styles */
    body.keyboard-nav *:focus {
        outline: 3px solid var(--color-accent, #7ab892) !important;
        outline-offset: 2px !important;
    }
    
    /* Scroll animation classes */
    .meal-card,
    .recipe-card,
    .article-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .meal-card.animate-in,
    .recipe-card.animate-in,
    .article-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Disable animations if user prefers reduced motion */
    @media (prefers-reduced-motion: reduce) {
        .meal-card,
        .recipe-card,
        .article-card {
            opacity: 1;
            transform: none;
            transition: none;
        }
    }
`;
document.head.appendChild(style);
