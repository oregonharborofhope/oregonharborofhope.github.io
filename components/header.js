/**
 * Oregon Harbor of Hope - Header Navigation JavaScript
 * Handles mobile menu functionality and navigation interactions
 */

// Main function to toggle mobile menu
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        const menuToggle = document.querySelector('.menu-toggle');
        const isExpanded = mobileNav.classList.contains('active');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', isExpanded);
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Oregon Harbor of Hope navigation initializing...');
    
    // Add accessibility attributes
    initializeAccessibility();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize dropdown functionality
    initializeDropdowns();
    
    console.log('Navigation initialized successfully');
});

/**
 * Setup accessibility attributes for screen readers
 */
function initializeAccessibility() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (menuToggle && mobileNav) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-controls', 'mobileNav');
        mobileNav.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Setup all event listeners for navigation functionality
 */
function setupEventListeners() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', handleOutsideClick);
    
    // Handle window resize
    window.addEventListener('resize', handleWindowResize);
    
    // Handle keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Setup mobile nav link clicks
    setupMobileNavLinks();
    
    // Setup social media link analytics (optional)
    setupSocialMediaTracking();
}

/**
 * Handle clicks outside the mobile menu to close it
 */
function handleOutsideClick(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileNav && menuToggle) {
        // Check if click is outside both mobile nav and menu toggle
        if (!mobileNav.contains(event.target) && 
            !menuToggle.contains(event.target) && 
            mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

/**
 * Handle window resize events
 */
function handleWindowResize() {
    const mobileNav = document.getElementById('mobileNav');
    
    // Close mobile menu when resizing to desktop view
    if (window.innerWidth > 1024 && mobileNav) {
        closeMobileMenu();
    }
}

/**
 * Handle keyboard navigation for accessibility
 */
function handleKeyboardNavigation(event) {
    const mobileNav = document.getElementById('mobileNav');
    
    // Close mobile menu on Escape key
    if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        closeMobileMenu();
        
        // Return focus to menu toggle button
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.focus();
        }
    }
    
    // Handle tab navigation within mobile menu
    if (mobileNav && mobileNav.classList.contains('active')) {
        trapFocusInMobileMenu(event);
    }
}

/**
 * Trap focus within mobile menu for accessibility
 */
function trapFocusInMobileMenu(event) {
    if (event.key !== 'Tab') return;
    
    const mobileNav = document.getElementById('mobileNav');
    const focusableElements = mobileNav.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        }
    } else {
        // Tab
        if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
}

/**
 * Close mobile menu and update accessibility attributes
 */
function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileNav) {
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

/**
 * Setup mobile navigation link click handlers
 */
function setupMobileNavLinks() {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Close mobile menu when clicking on internal links
            if (this.getAttribute('href').startsWith('./') || 
                this.getAttribute('href').startsWith('#')) {
                closeMobileMenu();
            }
            
            // Add small delay for smooth transition
            setTimeout(() => {
                // Optional: Add smooth scroll for anchor links
                if (this.getAttribute('href').startsWith('#')) {
                    event.preventDefault();
                    smoothScrollToAnchor(this.getAttribute('href'));
                }
            }, 150);
        });
    });
}

/**
 * Initialize dropdown menu functionality for desktop
 */
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownLink = dropdown.querySelector('.nav-link');
        
        if (dropdownMenu && dropdownLink) {
            // Add keyboard support for dropdowns
            dropdownLink.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const firstMenuItem = dropdownMenu.querySelector('a');
                    if (firstMenuItem) {
                        firstMenuItem.focus();
                    }
                }
            });
            
            // Close dropdown on Escape
            dropdownMenu.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    dropdownLink.focus();
                }
            });
        }
    });
}

/**
 * Setup social media link tracking (optional analytics)
 */
function setupSocialMediaTracking() {
    const socialLinks = document.querySelectorAll('.social-icons a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = getSocialPlatform(this.href);
            
            // Optional: Add analytics tracking here
            console.log(`Social media click: ${platform}`);
            
            // You can integrate with Google Analytics, Facebook Pixel, etc.
            // Example: gtag('event', 'social_click', { platform: platform });
        });
    });
}

/**
 * Get social media platform from URL
 */
function getSocialPlatform(url) {
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('youtube.com')) return 'YouTube';
    if (url.includes('x.com') || url.includes('twitter.com')) return 'X/Twitter';
    return 'Unknown';
}

/**
 * Smooth scroll to anchor links (optional enhancement)
 */
function smoothScrollToAnchor(anchor) {
    const target = document.querySelector(anchor);
    if (target) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Handle scroll events to add/remove header background (optional)
 */
function handleScroll() {
    const header = document.querySelector('.site-header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

/**
 * Initialize scroll handling (uncomment if you want header background on scroll)
 */
// window.addEventListener('scroll', handleScroll);

/**
 * Utility function to debounce events
 */
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

// Debounced resize handler for better performance
const debouncedResize = debounce(handleWindowResize, 250);
window.addEventListener('resize', debouncedResize);

/**
 * Error handling for missing elements
 */
function checkRequiredElements() {
    const requiredElements = [
        { selector: '.site-header', name: 'Site Header' },
        { selector: '.menu-toggle', name: 'Menu Toggle' },
        { selector: '#mobileNav', name: 'Mobile Navigation' }
    ];
    
    requiredElements.forEach(element => {
        if (!document.querySelector(element.selector)) {
            console.warn(`Warning: ${element.name} not found (${element.selector})`);
        }
    });
}

// Check for required elements after DOM load
document.addEventListener('DOMContentLoaded', function() {
    checkRequiredElements();
});

// Expose global functions for inline onclick handlers
window.toggleMobileMenu = toggleMobileMenu;