jQuery(function($) {
    'use strict';
    
    // Performance optimization
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Smooth scroll with performance optimization
    const smoothScroll = (target, offset = 80) => {
        $('html, body').animate({
            scrollTop: $(target).offset().top - offset
        }, 800, 'swing');
    };

    // Scroll event with debounce
    $(window).scroll(debounce(function() {
        updateActiveNav();
        animateOnScroll();
    }, 10));

    // Navigation click handler
    $('.navbar-collapse ul li a').on('click', function(e) {
        const href = $(this).attr('href');
        if (href === 'index.html' || href.startsWith('index.html#')) {
            // Allow default navigation to index.html or index.html#section
            return true;
        }
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                smoothScroll(target);
                $('.navbar-collapse').collapse('hide');
            }
        }
    });

    // Update active navigation
    function updateActiveNav() {
        const scrollPosition = $(window).scrollTop();
        $('.navbar-collapse .scroll a').each(function() {
            const target = $($(this).attr('href'));
            if (target.length) {
                const targetTop = target.offset().top - 100;
                const targetBottom = targetTop + target.height();
                if (scrollPosition >= targetTop && scrollPosition < targetBottom) {
                    $('.navbar-collapse li.scroll').removeClass('active');
                    $(this).parent().addClass('active');
                }
            }
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).height();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animated');
            }
        });
    }

    // Initialize WOW.js for scroll animations
    new WOW().init();

    // Portfolio filtering with smooth transitions
    $(window).on('load', function() {
        const $portfolio = $('.portfolio-items');
        const $portfolioFilters = $('.portfolio-filter > li > a');

        $portfolio.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.4s'
        });

        $portfolioFilters.on('click', function(e) {
            e.preventDefault();
            $portfolioFilters.removeClass('active');
            $(this).addClass('active');
            
            const filterValue = $(this).attr('data-filter');
            $portfolio.isotope({ filter: filterValue });
        });
    });

    // Animate numbers with improved performance
    $.fn.animateNumbers = function(stop, commas, duration, ease) {
        return this.each(function() {
            const $this = $(this);
            const start = parseInt($this.text().replace(/,/g, ""));
            const commaFormat = commas === undefined ? true : commas;
            
            $({ value: start }).animate({ value: stop }, {
                duration: duration || 1000,
                easing: ease || "swing",
                step: function() {
                    $this.text(Math.floor(this.value));
                    if (commaFormat) {
                        $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                    }
                },
                complete: function() {
                    if (parseInt($this.text()) !== stop) {
                        $this.text(stop);
                        if (commaFormat) {
                            $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        }
                    }
                }
            });
        });
    };

    // Animate stats when in view
    $('.business-stats').bind('inview', function(event, visible) {
        if (visible) {
            const $this = $(this);
            $this.animateNumbers($this.data('digit'), false, $this.data('duration'));
            $this.unbind('inview');
        }
    });

    // Initialize prettyPhoto with custom settings
    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: false,
        theme: 'light_rounded',
        animation_speed: 'fast',
        slideshow: 5000,
        autoplay_slideshow: false,
        show_title: true,
        overlay_gallery: true
    });
});

// Language toggle with improved performance
document.getElementById("toggleLang").addEventListener("click", function() {
    const isEnglish = document.documentElement.lang === "en";
    document.documentElement.lang = isEnglish ? "ar" : "en";
    this.textContent = isEnglish ? "EN" : "AR";

    // Use requestAnimationFrame for smooth DOM updates
    requestAnimationFrame(() => {
        document.querySelectorAll("[data-en]").forEach(element => {
            const contentEn = element.getAttribute("data-en");
            const contentAr = element.getAttribute("data-ar");

            if (contentEn && contentAr) {
                let textNodeFound = false;
                element.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && !textNodeFound) {
                        node.nodeValue = isEnglish ? contentAr : contentEn;
                        textNodeFound = true;
                    }
                });
            }
        });
    });
});

// Contact form handler with validation
function sendMail(event) {
    event.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value.trim(),
        email: document.querySelector('input[name="email"]').value.trim(),
        subject: document.querySelector('input[name="subject"]').value.trim(),
        message: document.querySelector('textarea[name="message"]').value.trim()
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all required fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Create mailto link with encoded parameters
    const mailtoLink = `mailto:Mustafamemo2274@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
    )}`;

    // Open mailto link
    window.location.href = mailtoLink;
}
