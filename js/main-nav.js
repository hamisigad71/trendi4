var Menu = (function () {

    var $ac_content             = $('.primary-header'),
    $title                      = $ac_content.find('h1'),
    $menu                       = $ac_content.find('nav.primary-header-ele'),
    $mainNav                    = $menu.find('ul:first'),
    $menuItems                  = $mainNav.children('li.menuItem');
    $totalItems                 = $menuItems.length,
    $docEl                      = $(document),
    $win                        = $(window),
    winH                        = $win.height(),    // Get the window height.

    $sectionLevel               = $('.container-0-3-31'),
    $mobileSectionLevel         = $('.burger-menu-list.mobile'),
    $panelContainer             = $sectionLevel.find('.panel1.padding.panel-0-3-44'),
    $mobilePanelContainer       = $mobileSectionLevel.find('.menu-item-group'),

    $sideMenuItem               = $sectionLevel.find('nav.container-0-3-34'),
    $sideMenuNav                = $sideMenuItem.find('ul:first'),
    $sideMenuEle                = $sideMenuNav.children('li'),

    $totalItemsSide             = $sideMenuEle.length,

    $secondaryItemsli           = $panelContainer.find("ul li"),
    $mobileSecondaryItemsli     = $mobilePanelContainer.find("ul li.continent-menu"),

    $seondPanelContainer        = $('.panel2.padding.panel-0-3-44'),

    $secondaryItemContainer     = $('.panel-container.panel2 .nav-0-3-488'),
    $thirdItemsli               = $secondaryItemContainer.find("ul li"),

    $burgerMenu                 = $(".js-menu-toggle"),
    $burgerMenuItemContainer    = $(".l-menu.push-right"),
    $languageSwitch             = $(".current-language"),
    $elementLangSwitch          = $(".language-switcher"),
    $mobileMenuToggle           = $(".burger-main-title"),
    $burgerMenuList             = $(".burger-menu-list"),
    $openClass                  = "opened",
    $filterContainer            = $('.special-offer-listing .col-left')

    var menuHeight              = $menu.height();
    var menuHT                  = menuHeight - 8;
    menuH                       = menuHT + "px";

    /* language switcher conditions */
    $languageSwitch.on("click", function (e) {
        var containerUL = $(this).find(".flyout");

        if (!$elementLangSwitch.hasClass($openClass)) {
            $elementLangSwitch.addClass($openClass);
        }
        else {
            $elementLangSwitch.removeClass($openClass);
        }
    });

    $mobileMenuToggle.on("click", function (e) {

        if (!$burgerMenuList.hasClass($openClass)) {
            $burgerMenuList.addClass($openClass);
        }
        else {
            $burgerMenuList.removeClass($openClass);
        }

        if (!$(this).hasClass('active')) {
            $(".burger-main-title").removeClass("active");
            $(".js-push-menu-items.colapsibleContainer").removeClass("active").slideUp();
            if ($(this).parent().find('nav').length) {
                $(this).addClass("active").parent().find('nav').addClass("active").slideDown();
            }
        } else {
            $(".burger-main-title").removeClass("active");
            $(".js-push-menu-items.colapsibleContainer").removeClass("active").slideUp();
        }

    });
    
    $burgerMenu.click(function () {       
        $(this).toggleClass("is-open");
        $(this).parent().parent().toggleClass("push-right-active");
        $burgerMenuItemContainer.toggleClass("push-right--open push-active-item");
        
        $(this).siblings(".l-menu").find(".js-push-menu-items .menu-item-object-page").toggleClass("is-visible");
    });

    //mobile menu - continent
    $mobileSecondaryItemsli.click(function (e) {

        e.stopPropagation();

        var $currentAttr = $(this).children().data("region");
        if ($currentAttr) {

            var currentPanelElemen = $('.mobile.container-0-3-31.mobile-container').find('.panel2[data-region=' + $currentAttr + ']');

            $('.mobile.container-0-3-31.mobile-container').find('.panel2[data-region=' + $currentAttr + ']').addClass("selected").siblings().removeClass("selected"); //opens secondary menu options to display hotels

            $(".breadcrumb-0-3-46").one('click', function (e) {
                
                if (currentPanelElemen.hasClass("selected")) {
                    currentPanelElemen.removeClass("selected");
                }
            });
        }
    });

    $secondaryItemsli.hover(function () {

        var $currentAttr = $(this).children().data("region");

        if ($currentAttr) {

            $panelContainer.find(".closeButton").removeClass("show"); //remove close button from panel1 when panel2 opens

            $('.container-0-3-31.Layout-section-0-3-33').find('.panel1 .nav-0-3-488 ul li .link-0-3-492[data-region=' + $currentAttr + ']').parent().addClass("selected-region").siblings().removeClass("selected-region"); //highlight selected continent

            $('.container-0-3-31.Layout-section-0-3-33').find('.panel2[data-region=' + $currentAttr + ']').addClass("selected").siblings().removeClass("selected"); //opens secondary menu options to display hotels
        }

        $(this).children().find("span.count-0-3-495").toggleClass("selected").siblings().removeClass('selected'); //adds selected class to count of regions
        $(this).next().find(".line-0-3-490").toggleClass("fade");
        $(this).find(".line-0-3-490").toggleClass("fade");

        //Remove close button when panel3 is hidden
        if (!$(".panel3").hasClass("selected")) {
            $seondPanelContainer.find(".closeButton").addClass("show");
        }

    });

    $thirdItemsli.hover(function () {

        var $currentHotel = $(this).data("hotel");
        if ($currentHotel) {
            $seondPanelContainer.find(".closeButton").removeClass("show");   //remove close button from panel1 when panel3 opens

            $('.container-0-3-31.Layout-section-0-3-33').find('.panel2 .nav-0-3-488 ul li[data-hotel=' + $currentHotel + ']').addClass("selected-hotel").siblings().removeClass("selected-hotel");

            $('.container-0-3-31.Layout-section-0-3-33').find('.panel3[data-hotel=' + $currentHotel + ']').addClass("selected").siblings(".panel3").removeClass("selected"); //opens secondary menu options to display hotels
            $('.container-0-3-31.Layout-section-0-3-33').find('.panel3[data-hotel=' + $currentHotel + '] .imageContainer-0-3-53.card').addClass("selected").siblings(".panel3").removeClass("selected");
            $('.container-0-3-31.Layout-section-0-3-33').find('.panel3[data-hotel=' + $currentHotel + '] .leftCurtain-0-3-283.topDown').animate({
                'opacity': '100'
            }, {
                step: function (now, fx) {
                    $(this).css({ "transform": "translate3d(0, " + now + "%, 0)" });
                },
                duration: 500,
                easing: 'linear',
                queue: false,
                complete: function () {
                    $(this).fadeOut();
                }
            }, 'linear');

        }

        $(this).siblings().find(".link-0-3-492").removeClass('selected'); //remove selected class for all other hotel item on hover

        $(this).find(".arrowButton-0-3-496").removeClass("selected").siblings().addClass('selected');
        $(this).next().find(".line-0-3-490").toggleClass("fade");
        $(this).find(".line-0-3-490").toggleClass("fade");

    }, function () {
        $(this).siblings().find(".link-0-3-492").addClass('selected'); //when not hovered add back the selected class to the list items
    });

    $menu.css({ "transform": "translate(0px, 0px)" });

    //If Slider does not exists on page, set fixed nav bar
    if (!($(".slider-content").length ||
        $(".intro-collectibles").length) ||
        (!$(".homepage_slideshow").length && !$(".fullHeroSlider").length) ||
        (!($(".slider-content").length && !$(".intro-collectibles").length))) {
        $ac_content.addClass("scrolled");
        $ac_content.siblings(".site--burger").addClass("scrolled");
        $menu.css({ "transform": "translate(0px, 14px)" });
        $ac_content.css({ "transform": "translate(0px, -28px)", "background": "#ffffff" });
        $(".wrapper").css("padding-top", menuH);
        
    } else { // Allow scroll function if navigation bar is not fixed

        $docEl.on('scroll', function () {

            if ($docEl.scrollTop() > 60) {

                $ac_content.addClass("scrolled");
                $ac_content.siblings(".site--burger").addClass("scrolled");
                $menu.css({ "transform": "translate(0px, 14px)" });
                $ac_content.css({ "transform": "translate(0px, -28px)", "background": "#ffffff" });

                /*hide langswitcher when scrolling*/
                if ($elementLangSwitch.hasClass($openClass)) {
                    $elementLangSwitch.removeClass($openClass);
                }

            } else {

                $ac_content.removeClass("scrolled");
                $ac_content.siblings(".site--burger").removeClass("scrolled");
                $ac_content.css({ "transform": "translate(0px, 0px)", "background": "transparent" });
                $menu.css({ "transform": "translate(0px, 0px)" });
            }
        });
    }

    $docEl.on('scroll', function () {
        if ($docEl.scrollTop() > (winH - 80)) {
            //show sub navigation bar after scroll > 80px
            $(".sub-nav-menu").fadeIn();
        }
        else if ($docEl.scrollTop() < 60) {
            $(".sub-nav-menu").fadeOut();
        }
    });

   function DetectFilterpos() {
        var windowWidth = $(window).width();
        if (windowWidth >= 981) { 
            $filterContainer.css({ "position": "relative", "top": "0" });
            $('.special-offer-listing .col-left.responsive-offers-bar.cta-scroll').css({ "display": "none" });
            $('.special-offer-listing .col-left.offers-bar.cta-scroll').css({ "position": "relative", "top": "0" });
        }
    }

    DetectFilterpos();

    var init = function () {
        initEventMenu();
    },
    loadMenu = function () {
        //$ac_loading.show(); //show loading status image
    },

    /* shows / hides the menu items */
    openSubMenu = function ($item, $sub_menu, el_image) {

        $sub_menu.first().stop()
        .animate({
            transform: "translate(0%, 0px)",
            width: 'toggle'

        });
    },
    initEventMenu = function () {
        $menuItems.each(function (i) {

            var $item   = $(this), // the <li>
            $el_title   = $item.children('a:first'),
            el_image    = $el_title.attr('href'),
            $sub_menu   = $sectionLevel.find('.panel-0-3-44'),
            $opened     = 0,
            $ac_close   = $sub_menu.find('.closeButton');

            //button animation for call + view hotel
            $sectionLevel.find('a.button-0-3-37, a.button-0-3-39').hover(function () {
                $(this).find(".clone-0-3-40").css('transform', 'translate(0px, 0%)');
                $(this).find(".cloneContent-0-3-41").css('transform', 'translate(0px, 0%)');
            }, function () {
                $(this).find(".clone-0-3-40").css('transform', 'translate(0px, -110%)');
                $(this).find(".cloneContent-0-3-41").css('transform', 'translate(0px, 110%)');
            });

            /* user clicks on a menu item */

            if ($opened == 0) {

                $el_title.bind('click.Menu', function (e) {

                    if ((!$(".container-0-3-34, .panel1").hasClass("open"))) {

                        openSubMenu($item, $sub_menu, el_image);
                        $opened = 1;
                    }

                    $('.container-0-3-34, .panel1').css({ "opacity": 1, "transform": "translate(0%, 0px)", "pointer-events": "all" }).addClass("open"); //opens primary menu
                    $('.container-0-3-31').css({ "pointer-events": "all" });
                    $('.overlay-0-3-32').fadeTo("slow", 0.6);

                    $('.closeButton').addClass("show"); //for close button to appear

                    $(this).removeClass('selected').addClass('selected');

                    return false;
                });
            }

            /* closes the submenu */
            $ac_close.bind('click.Menu', function (e) {

                $('.container-0-3-34, .panel1').css({ "opacity": 0, "transform": "translate(-110%, 0)", "pointer-events": "none" }).removeClass("open");
                $('.container-0-3-31').css({ "pointer-events": "none" });
                $('.container-0-3-34').css({ "pointer-events": "none" }).fadeTo("slow", 0).removeClass("open"); //closes primary menu
                $('.line-sep').fadeTo("slow", 0);
                $('.overlay-0-3-32').fadeTo("slow", 0);

                $('.closeButton').removeClass("show"); //for close button to appear

                $('.container-0-3-31.Layout-section-0-3-33').find('.panel2').removeClass("selected");
                $('.container-0-3-31.Layout-section-0-3-33').find('.panel3').removeClass("selected");
                
                return false;
            });
        });

    };

    return {
        init: init
    };

})();

Menu.init();