// Enhanced Wedding Coffee Bar Website JavaScript
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Configuration specific to wedding site
    const config = {
        animationDuration: 300,
        scrollOffset: 80,
        observerThreshold: 0.1,
        mobileBreakpoint: 768,
        weddingColors: ['#8b5cf6', '#fb7185', '#06b6d4', '#10b981'],
        serviceAreas: [
            'Tampa', 'St. Petersburg', 'Clearwater', 'Lakeland', 'Largo', 'Bradenton',
            'Sarasota', 'Brandon', 'Riverview', 'Wesley Chapel', 'Town \'n\' Country', 
            'Plant City', 'Palm Harbor', 'Dunedin', 'Tarpon Springs', 'Pinellas Park',
            'Seminole', 'Temple Terrace', 'Safety Harbor', 'Gulfport', 'Oldsmar',
            'New Port Richey', 'Zephyrhills', 'Dade City', 'Brooksville', 'Spring Hill',
            'Land O\' Lakes', 'Lutz', 'Valrico', 'Apollo Beach', 'Ruskin', 'Sun City Center',
            'Palmetto', 'Venice', 'Ellenton', 'Parrish', 'Siesta Key'
        ],
        tampaBayCenter: { lat: 27.9506, lng: -82.4572 }
    };

    // Utility Functions
    const utils = {
        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Smooth scroll to element
        smoothScrollTo: function(target, offset = config.scrollOffset) {
            const element = document.querySelector(target);
            if (element) {
                const targetPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    // Loading Screen Management
    const loadingManager = {
        init: function() {
            const loader = document.getElementById('loader');
            if (loader) {
                // Hide loading screen after page loads
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                        }, 500);
                    }, 1000); // Show loader for at least 1 second
                });
            }
        }
    };

    // Mobile Menu Management
    const mobileMenu = {
        init: function() {
            const menuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (menuToggle && mobileMenu) {
                let isOpen = false;
                
                menuToggle.addEventListener('click', () => {
                    isOpen = !isOpen;
                    this.toggleMenu(mobileMenu, menuToggle, isOpen);
                });

                // Close menu when clicking on links
                const menuLinks = mobileMenu.querySelectorAll('a');
                menuLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        isOpen = false;
                        this.toggleMenu(mobileMenu, menuToggle, isOpen);
                    });
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (isOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                        isOpen = false;
                        this.toggleMenu(mobileMenu, menuToggle, isOpen);
                    }
                });
            }
        },

        toggleMenu: function(menu, toggle, isOpen) {
            if (isOpen) {
                menu.style.maxHeight = menu.scrollHeight + 'px';
                menu.style.opacity = '1';
                toggle.innerHTML = '<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
            } else {
                menu.style.maxHeight = '0';
                menu.style.opacity = '0';
                toggle.innerHTML = '<svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
            }
        }
    };

    // Smooth Scrolling for Navigation Links
    const smoothScrolling = {
        init: function() {
            // Handle all anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('href');
                    if (target && target !== '#') {
                        utils.smoothScrollTo(target);
                    }
                });
            });
        }
    };

    // Intersection Observer for Reveal Animations
    const revealAnimations = {
        init: function() {
            const revealElements = document.querySelectorAll('.reveal');
            
            if (revealElements.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('active');
                            // Add wedding sparkle effect
                            this.addWeddingSparkle(entry.target);
                        }
                    });
                }, {
                    threshold: config.observerThreshold,
                    rootMargin: '0px 0px -50px 0px'
                });

                revealElements.forEach(element => {
                    observer.observe(element);
                });
            }
        },

        addWeddingSparkle: function(element) {
            if (element.classList.contains('hero-title')) {
                // Add sparkle animation to wedding titles
                element.style.position = 'relative';
                const sparkle = document.createElement('span');
                sparkle.innerHTML = '✨';
                sparkle.className = 'wedding-sparkle';
                sparkle.style.position = 'absolute';
                sparkle.style.top = '-10px';
                sparkle.style.left = '50%';
                sparkle.style.transform = 'translateX(-50%)';
                element.appendChild(sparkle);
            }
        }
    };

    // FAQ Functionality
    const faqManager = {
        init: function() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = question.querySelector('i');
                
                if (question && answer) {
                    question.addEventListener('click', () => {
                        const isOpen = answer.style.display === 'block';
                        
                        // Close all other FAQ items
                        faqItems.forEach(otherItem => {
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.faq-question i');
                            if (otherAnswer && otherItem !== item) {
                                otherAnswer.style.display = 'none';
                                if (otherIcon) {
                                    otherIcon.style.transform = 'rotate(0deg)';
                                }
                            }
                        });
                        
                        // Toggle current item
                        if (isOpen) {
                            answer.style.display = 'none';
                            if (icon) icon.style.transform = 'rotate(0deg)';
                        } else {
                            answer.style.display = 'block';
                            if (icon) icon.style.transform = 'rotate(180deg)';
                        }
                    });
                }
            });
        }
    };

    // Wedding-specific Features
    const weddingFeatures = {
        init: function() {
            this.createFloatingHearts();
            this.addWeddingDecorations();
            this.initWeddingInteractions();
            this.createWeddingQuoteModal();
            this.createServiceAreaDisplay();
        },

        createFloatingHearts: function() {
            const heartsContainer = document.createElement('div');
            heartsContainer.className = 'floating-hearts';
            document.body.appendChild(heartsContainer);

            // Create additional floating hearts
            setInterval(() => {
                if (Math.random() > 0.7) {
                    this.createSingleHeart();
                }
            }, 3000);
        },

        createSingleHeart: function() {
            const heart = document.createElement('div');
            heart.innerHTML = ['💖', '💕', '💗', '💝'][Math.floor(Math.random() * 4)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100vh';
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1';
            heart.style.animation = 'floatingHearts 8s linear forwards';
            
            document.body.appendChild(heart);

            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 8000);
        },

        addWeddingDecorations: function() {
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                if (index % 2 === 0) {
                    const decoration = document.createElement('div');
                    decoration.className = 'wedding-decoration';
                    decoration.innerHTML = ['💐', '🌸', '🌹', '💍'][index % 4];
                    decoration.style.top = '20px';
                    decoration.style.right = '20px';
                    section.style.position = 'relative';
                    section.appendChild(decoration);
                }
            });
        },

        initWeddingInteractions: function() {
            // Add hover effects to service cards
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-10px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add click tracking for analytics
            document.querySelectorAll('[href*="quote"]').forEach(link => {
                link.addEventListener('click', () => {
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'click', {
                            event_category: 'Wedding Booking',
                            event_label: 'Quote Request'
                        });
                    }
                });
            });
        },

        createWeddingQuoteModal: function() {
            // Create a beautiful modal for wedding quotes
            const modal = document.createElement('div');
            modal.id = 'wedding-quote-modal';
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center';
            modal.innerHTML = `
                <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center relative">
                    <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').classList.add('hidden')">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                    <div class="text-6xl mb-4">💕</div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">Ready to Plan Your Perfect Day?</h3>
                    <p class="text-gray-600 mb-6">Let's create a beautiful coffee experience for your wedding celebration!</p>
                    <div class="space-y-3">
                        <a href="https://www.delightfulbean.com/quote" class="block w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-2xl transition-all hover:scale-105">
                            Get Wedding Quote
                        </a>
                        <a href="tel:+18134197438" class="block w-full border-2 border-purple-500 text-purple-500 py-4 px-8 rounded-2xl font-semibold hover:bg-purple-50 transition-all hover:scale-105">
                            Call Wedding Specialist
                        </a>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        },

        createServiceAreaDisplay: function() {
            // Create dynamic service area showcase with dropdown
            const serviceSection = document.querySelector('#services');
            if (serviceSection) {
                const serviceAreaDiv = document.createElement('div');
                serviceAreaDiv.className = 'mt-12 p-8 bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-lg';
                serviceAreaDiv.innerHTML = `
                    <div class="text-center">
                        <h4 class="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
                            <i class="fas fa-map-marked-alt mr-2"></i>We Serve 35+ Tampa Bay Communities
                        </h4>
                        
                        <div class="relative inline-block w-full max-w-md mx-auto mb-6">
                            <button class="service-area-dropdown w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-2xl transition-all hover:scale-105 focus:outline-none flex items-center justify-center" onclick="this.nextElementSibling.classList.toggle('hidden')">
                                <span>View All Service Areas</span>
                                <i class="fas fa-chevron-down ml-2 transition-transform duration-300"></i>
                            </button>
                            
                            <div class="service-area-list hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 max-h-64 overflow-y-auto z-50">
                                <div class="p-4">
                                    <div class="grid grid-cols-1 gap-2">
                                        ${config.serviceAreas.map(city => `
                                            <div class="service-area-item px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 cursor-pointer font-medium text-gray-700 border border-transparent hover:border-white/30">
                                                ${city}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <p class="text-gray-600 font-semibold text-lg">
                            Professional wedding coffee service throughout the Tampa Bay area!
                        </p>
                    </div>
                `;
                
                serviceSection.appendChild(serviceAreaDiv);
                
                // Add click outside to close dropdown
                document.addEventListener('click', function(event) {
                    const dropdown = serviceAreaDiv.querySelector('.service-area-dropdown');
                    const dropdownList = serviceAreaDiv.querySelector('.service-area-list');
                    
                    if (dropdown && dropdownList && !dropdown.contains(event.target) && !dropdownList.contains(event.target)) {
                        dropdownList.classList.add('hidden');
                        dropdown.querySelector('i').style.transform = 'rotate(0deg)';
                    }
                });
                
                // Add rotation animation to chevron
                const dropdownButton = serviceAreaDiv.querySelector('.service-area-dropdown');
                if (dropdownButton) {
                    dropdownButton.addEventListener('click', function() {
                        const chevron = this.querySelector('i');
                        const dropdownList = this.nextElementSibling;
                        
                        if (dropdownList.classList.contains('hidden')) {
                            chevron.style.transform = 'rotate(180deg)';
                        } else {
                            chevron.style.transform = 'rotate(0deg)';
                        }
                    });
                }
            }
        }
    };

    // Performance Optimizations
    const performanceOptimizer = {
        init: function() {
            this.lazyLoadImages();
            this.preloadCriticalResources();
            this.optimizeScrollEvents();
        },

        lazyLoadImages: function() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src || img.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(img => imageObserver.observe(img));
            }
        },

        preloadCriticalResources: function() {
            // Preload wedding-related images
            const criticalImages = [
                'images/Delightful Bean Coffee Cart.webp',
                'images/Coffee Cup.webp'
            ];

            criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            });
        },

        optimizeScrollEvents: function() {
            let ticking = false;
            
            const updateScrollEffects = () => {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('header');
                
                if (header) {
                    if (scrolled > 100) {
                        header.style.backdropFilter = 'blur(20px)';
                        header.style.background = 'linear-gradient(135deg, rgba(253, 248, 252, 0.95) 0%, rgba(254, 242, 248, 0.95) 100%)';
                    } else {
                        header.style.backdropFilter = 'blur(10px)';
                        header.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #c7d2fe 100%)';
                    }
                }
                
                ticking = false;
            };

            const requestScrollUpdate = () => {
                if (!ticking) {
                    requestAnimationFrame(updateScrollEffects);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', requestScrollUpdate, { passive: true });
        }
    };

    // Accessibility Enhancements
    const accessibilityManager = {
        init: function() {
            this.enhanceKeyboardNavigation();
            this.addAriaLabels();
            this.manageFocusStates();
        },

        enhanceKeyboardNavigation: function() {
            // Add keyboard support for FAQ items
            document.querySelectorAll('.faq-question').forEach(question => {
                question.setAttribute('tabindex', '0');
                question.setAttribute('role', 'button');
                
                question.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        question.click();
                    }
                });
            });
        },

        addAriaLabels: function() {
            // Add aria labels to interactive elements
            const ctaButtons = document.querySelectorAll('.modern-cta-button');
            ctaButtons.forEach(button => {
                if (!button.getAttribute('aria-label')) {
                    button.setAttribute('aria-label', 'Request wedding coffee service quote');
                }
            });
        },

        manageFocusStates: function() {
            // Enhance focus states for better visibility
            const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
            focusableElements.forEach(element => {
                element.addEventListener('focus', () => {
                    element.style.outline = '3px solid #8b5cf6';
                    element.style.outlineOffset = '2px';
                });
                
                element.addEventListener('blur', () => {
                    element.style.outline = '';
                    element.style.outlineOffset = '';
                });
            });
        }
    };

    // Wedding Analytics
    const weddingAnalytics = {
        init: function() {
            this.trackWeddingInteractions();
            this.trackScrollDepth();
        },

        trackWeddingInteractions: function() {
            // Track wedding-specific interactions
            document.addEventListener('click', (e) => {
                const target = e.target.closest('[data-wedding-action]');
                if (target) {
                    const action = target.getAttribute('data-wedding-action');
                    this.sendEvent('Wedding Interaction', action);
                }
            });
        },

        trackScrollDepth: function() {
            let maxScroll = 0;
            const trackingPoints = [25, 50, 75, 100];
            
            window.addEventListener('scroll', utils.debounce(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                
                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                    
                    trackingPoints.forEach(point => {
                        if (scrollPercent >= point && maxScroll >= point) {
                            this.sendEvent('Scroll Depth', `${point}%`);
                        }
                    });
                }
            }, 250));
        },

        sendEvent: function(category, action) {
            if (typeof gtag !== 'undefined') {
                gtag('event', action, {
                    event_category: category,
                    custom_map: { 'site_type': 'wedding_coffee_bar' }
                });
            }
        }
    };

    // Initialize all modules
    loadingManager.init();
    mobileMenu.init();
    smoothScrolling.init();
    revealAnimations.init();
    faqManager.init();
    weddingFeatures.init();
    performanceOptimizer.init();
    accessibilityManager.init();
    weddingAnalytics.init();

    // Wedding-specific page enhancements
    setTimeout(() => {
        // Show wedding quote modal after 30 seconds on first visit
        if (!localStorage.getItem('wedding_modal_shown')) {
            setTimeout(() => {
                const modal = document.getElementById('wedding-quote-modal');
                if (modal) {
                    modal.classList.remove('hidden');
                    localStorage.setItem('wedding_modal_shown', 'true');
                }
            }, 30000);
        }
    }, 1000);

    console.log('✨ Modern Wedding Coffee Bar website initialized successfully! 🚀');
});