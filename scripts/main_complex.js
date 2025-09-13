// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavigation();
    initializeProjectFilter();
    initializeSmoothScrolling();
    initializeScrollEffects();
    initializeCursorEffects();
    initializeParticleEffects();
    initializeRandomColorAnimations();
});

// Cursor Effects
function initializeCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    });
    
    // Smooth follower animation
    function animateCursorFollower() {
        followerX += (cursorX - followerX) * 0.1;
        followerY += (cursorY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursorFollower);
    }
    
    animateCursorFollower();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
            cursorFollower.classList.add('cursor-grow');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
            cursorFollower.classList.remove('cursor-grow');
        });
    });
}

// Particle Effects
function initializeParticleEffects() {
    const heroSection = document.querySelector('.hero');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle(heroSection, i);
    }
}

function createFloatingParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'dynamic-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: ${getRandomAccentColor()};
        border-radius: 50%;
        pointer-events: none;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: dynamicFloat ${15 + Math.random() * 10}s linear infinite;
        animation-delay: ${index * 0.5}s;
        box-shadow: 0 0 10px currentColor;
        opacity: 0.6;
    `;
    
    container.appendChild(particle);
}

function getRandomAccentColor() {
    const colors = [
        'var(--accent-red)',
        'var(--accent-yellow)',
        'var(--accent-blue)',
        'var(--primary-color)',
        'var(--secondary-color)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Random Color Animations
function initializeRandomColorAnimations() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance every interval
                shape.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(1.2)`;
                setTimeout(() => {
                    shape.style.filter = '';
                }, 1000);
            }
        }, 3000 + index * 500);
    });
}

// Navigation Menu Toggle
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Project Filtering System
function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects with animation
            filterProjects(filter, projectItems);
        });
    });
}

function filterProjects(filter, projectItems) {
    projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            // Show item with animation
            item.classList.remove('hidden', 'fade-out');
            item.classList.add('fade-in');
            
            setTimeout(() => {
                item.classList.remove('fade-in');
            }, 500);
        } else {
            // Hide item with animation
            item.classList.add('fade-out');
            
            setTimeout(() => {
                item.classList.add('hidden');
                item.classList.remove('fade-out');
            }, 300);
        }
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 32, 44, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(26, 32, 44, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-item, .about-content, .contact-content');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
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

// Project Modal (for future enhancement)
function openProjectModal(projectData) {
    // This function can be expanded to show detailed project information
    console.log('Opening project modal for:', projectData);
    // Implementation for project detail modal would go here
}

// Search functionality (for future enhancement)
function initializeProjectSearch() {
    const searchInput = document.querySelector('.project-search');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (searchInput) {
        const debouncedSearch = debounce(function(searchTerm) {
            searchProjects(searchTerm, projectItems);
        }, 300);
        
        searchInput.addEventListener('input', function() {
            debouncedSearch(this.value.toLowerCase());
        });
    }
}

function searchProjects(searchTerm, projectItems) {
    projectItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('p').textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matchesSearch = title.includes(searchTerm) || 
                            description.includes(searchTerm) || 
                            tags.some(tag => tag.includes(searchTerm));
        
        if (matchesSearch || searchTerm === '') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Performance optimization: Lazy loading for images (when real images are added)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme switching (for future enhancement)
function initializeThemeSwitch() {
    const themeSwitch = document.querySelector('.theme-switch');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Analytics and tracking (placeholder for future implementation)
function trackProjectView(projectId) {
    // Placeholder for analytics tracking
    console.log('Project viewed:', projectId);
}

function trackFilterUsage(filterType) {
    // Placeholder for analytics tracking
    console.log('Filter used:', filterType);
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = ['.navbar', '.hero', '.projects'];
    
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element not found: ${selector}`);
        }
    });
}

// Initialize error handling
handleMissingElements();