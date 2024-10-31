/*
Author: webthemez.com
Author URL: http://webthemez.com
*/
jQuery(function($) {
    'use strict';
     
    $(window).scroll(function(event) {
        Scroll();
    });

    $('.navbar-collapse ul li a').on('click', function() {
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 80
        }, 1000);
        return false;
    });
 
    function Scroll() {
        var contentTop = [];
        var contentBottom = [];
        var winTop = $(window).scrollTop();
        var rangeTop = 200;
        var rangeBottom = 500;
        $('.navbar-collapse').find('.scroll a').each(function() {
            contentTop.push($($(this).attr('href')).offset().top);
            contentBottom.push($($(this).attr('href')).offset().top + $($(this).attr('href')).height());
        })
        $.each(contentTop, function(i) {
            if (winTop > contentTop[i] - rangeTop) {
                $('.navbar-collapse li.scroll')
                    .removeClass('active')
                    .eq(i).addClass('active');
            }
        })
    };

    $('#tohash').on('click', function() {
        $('html, body').animate({
            scrollTop: $(this.hash).offset().top - 5
        }, 1000);
        return false;
    });

  
    new WOW().init();
     
    smoothScroll.init();

    
    $(window).load(function() {
        'use strict';
        var $portfolio_selectors = $('.portfolio-filter >li>a');
        var $portfolio = $('.portfolio-items');
        $portfolio.isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $portfolio_selectors.on('click', function() {
            $portfolio_selectors.removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $portfolio.isotope({
                filter: selector
            });
            return false;
        });
    });

    $(document).ready(function() {
   
        $.fn.animateNumbers = function(stop, commas, duration, ease) {
            return this.each(function() {
                var $this = $(this);
                var start = parseInt($this.text().replace(/,/g, ""));
                commas = (commas === undefined) ? true : commas;
                $({
                    value: start
                }).animate({
                    value: stop
                }, {
                    duration: duration == undefined ? 1000 : duration,
                    easing: ease == undefined ? "swing" : ease,
                    step: function() {
                        $this.text(Math.floor(this.value));
                        if (commas) {
                            $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                        }
                    },
                    complete: function() {
                        if (parseInt($this.text()) !== stop) {
                            $this.text(stop);
                            if (commas) {
                                $this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                            }
                        }
                    }
                });
            });
        };

        $('.business-stats').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
            var $this = $(this);
            if (visible) {
                $this.animateNumbers($this.data('digit'), false, $this.data('duration'));
                $this.unbind('inview');
            }
        });
    });

 
    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: false
    });
 

});
document.getElementById("toggleLang").addEventListener("click", function() {
    const isEnglish = document.documentElement.lang === "en";
    document.documentElement.lang = isEnglish ? "ar" : "en";
    document.getElementById("toggleLang").textContent = isEnglish ? "EN" : "AR";

    // Toggle text content for each element with [data-en] and [data-ar]
    document.querySelectorAll("[data-en]").forEach(element => {
        const contentEn = element.getAttribute("data-en");
        const contentAr = element.getAttribute("data-ar");

        if (contentEn && contentAr) {
            // التأكد من تحديث العقدة النصية الأولى فقط بدون التأثير على البنية
            let textNodeFound = false;
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && !textNodeFound) {
                    node.nodeValue = isEnglish ? contentAr : contentEn;
                    textNodeFound = true; // تحديث العقدة النصية الأولى فقط لتجنب التكرار
                }
            });
        }
    });
});
function sendMail(event) {
    event.preventDefault(); // منع إرسال النموذج بشكل عادي

    // الحصول على قيم الحقول
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const subject = document.querySelector('input[name="subject"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // إنشاء رابط mailto
    const mailtoLink = `mailto:Mustafamemo2274@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage: " + message)}`;

    // فتح رابط mailto
    window.location.href = mailtoLink;
  };
