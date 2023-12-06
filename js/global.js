$(document).ready(function () {

    //Define important vars
    var player;
    var $doc = $(document);
    var runningAjax = false;
    var getAdvertHeight = $(".advert-banner").outerHeight();
    var isWindow962;

    //Forms: Newsletter Close popup
    $doc.on('click', '.jsClosePopoutTrigger', function (e) {
        $('.block-newsletter-form[data-popout-container="newsletter-form"]').removeClass("popout-is-active");
        $('body').removeClass('mobile-open');
    });

    //Click event to scroll to top
    $('.scrollup').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    //set height gap to main nav + slideshows
    $(".setHeight").css("top", getAdvertHeight + "px");
    $(".site--burger-fixed.setHeight").css("top", "78px");

    //trigger youtube click on slider
    $doc.on('click', '.play_btn', function (e) {

        var parent = $(this);
        var ytVideoId = parent.attr('data-yt');
        var urlRegex = "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?";

        //Check if videoLink has full youtube link instead of only video Id and remove all except video Id
        if (new RegExp(urlRegex).test(ytVideoId)) {
            var videoid = ytVideoId.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if (videoid != null) {
                ytVideoId = videoid[1];
            }
        }

        //remove all classes while keeping .ytVideoWrapper
        $('.ytVideoWrapper').addClass('active');

        setTimeout(function () {
            player = new YT.Player('ytplayer', {
                videoId: ytVideoId,
                host: 'https://www.youtube.com',
                playerVars: { autoplay: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 1 },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            })

            function onPlayerReady() {
                $('.ytVideoWrapper').find('.iframewrapper').addClass('active');
                $('.animatedBody').css('z-index', 'initial');
            };

            function onPlayerStateChange(event) {
                if (event.data == 0) {
                    setTimeout(function () {
                        closePopup();
                    }, 500);
                }
            }
        }, 500);
    });

 

    $(document).on('submit', '.submitWithAjax form', function (e) {

        var formId = $(this).closest('div > .form-content').attr("data-id");

        if (runningAjax === true) return false

        runningAjax = true;
        let $thisForm = $(this);

        $.post({
            method: $thisForm.attr('method'),
            url: $thisForm.attr('action'),
            data: $thisForm.serialize(),
            target: $(this).closest('div').attr('id'),
            success: function (response) {

                //$doc.find('.block-newsletter-form[data-popout-container="newsletter-form"] .block-newsletter-form__outer .popout-content-container .form-content').html(response);
                $doc.find('.form-content[data-id="' + formId + '"]').html(response);
                runningAjax = false;

            },
            error: function () {
                alert('Form Error !');
                runningAjax = false;
            }

        });

        e.preventDefault();
        return false;
    });

    // Footer links resize on Mobile
    $(window).resize(function () {

        isWindow962 = $(window).width() < 962;

        if (isWindow962) {

            $(".footer-home.colapsibleContainer").removeClass("ulActive").css("display", "none");
            $(".colapsibleHead").removeClass("ulActive");

        } else {

            $(".footer-home.colapsibleContainer").css("display", "block");
        }
    });

    // Footer links click & toggle on Mobile
    $(".colapsibleHead").click(function () {
        if (isWindow962) { // Trigger only on window size 995 or less
            var $this = $(this);
            var $container = $('.footer-home.colapsibleContainer');
            var $ul = $this.parent().find('ul');
            var $newsletterFormContainer = $this.parent().find('.newsletter-form-cn.colapsibleContainer');

            if (!$this.hasClass('ulActive')) {
                $('.colapsibleHead').removeClass("ulActive");
                $container.removeClass("ulActive").slideUp();

                if ($ul.length) {
                    $this.addClass("ulActive");
                    $ul.addClass("ulActive").slideDown();
                } else {
                    $this.addClass("ulActive");
                    $newsletterFormContainer.addClass("ulActive").slideDown();
                }
            } else {
                $('.colapsibleHead').removeClass("ulActive");
                $container.removeClass("ulActive").slideUp();
            }
        }
    });

    // fade in grid items - Rooms and Restaurants Listing Pages ================================== //
    $doc.on("scroll", function () {
        var pageTop = $doc.scrollTop();
        var pageBottom = pageTop + $(window).height();
        var tags = $(".fadein");

        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i]

            if ($(tag).offset().top < pageBottom) {
                $(tag).addClass("visible")
            } else {
                $(tag).removeClass("visible")
            }
        }

        if ($(this).scrollTop() > 800) { //show scroll top button
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }

    });

    //footer resorts links toggle
    $("ul.footer_nav > li").addClass("hoverElement");    

});


function closePopup() {
    var $ytVideoWrapper = $('.ytVideoWrapper');
    var $animatedBody = $('.animatedBody');

    $ytVideoWrapper.find('.iframewrapper').removeClass('active');
    $animatedBody.css('z-index', 150);

    setTimeout(function () {
        $ytVideoWrapper.removeClass('active');
        $('.iframewrapper').html('<div id="ytplayer"></div>');
        $animatedBody.css('z-index', 150);
    }, 400);
}

//Remove loader after slick slider has been initialised
$('.slider-content').on('init', function (event, slick) {

    //display title on the first image only
    $(".slick-slide:eq(0)").find(".VideoPlayer-Title").show();

    $(".loader-container").animate({
        opacity: 0
    }, 500, function () {
        $(this).remove();
    });
});

//Init hero slider on different pages
$(".slider-content").slick({
    dots: false,
    infinite: false,
    speed: 1000,
    autoplay: 5000,
    fade: true,
    cssEase: 'linear',
    lazyLoad: 'progressive',
    nextArrow: '<button type="button" class="slickNavBtn-next slickNavBtn" aria-label="Next Arrow"><i class="far fa-angle-right"></i></button>',
    prevArrow: '<button type="button" class="slickNavBtn-prev slickNavBtn" aria-label="Previous Arrow"><i class="far fa-angle-left"></i></button>',
    responsive: [{
        breakpoint: 1024,
        settings: {
            swipe: true
        }
    }]
});

//Remove autoplay if video is present in slider
if ($(".slide-video").length) {
    $(".slider-content").slick("slickPause");
}

// jQuery plugin to prevent double submission of forms
jQuery.fn.preventDoubleSubmission = function (formClass) {
    $formContainer = $('.' + formClass + ' form');

    $formContainer.submit(function (e) {
        e.preventDefault();
        var $form = $formContainer;
        if ($form.valid()) {
            $form.data('submitted', true);
            // Make ajax call form submission
            $.ajax({
                url: ($form).attr('action'),
                type: 'POST',
                cache: false,
                data: $form.serialize(),
                success: function (result) {
                    $('.' + formClass + ' .umbraco-forms-submitmessage').css("display", "block !important");
                    var thankYouMessage = $(result).find('.umbraco-forms-submitmessage');
                    $('.' + formClass + ' .umbraco-forms-page').html(thankYouMessage);
                    $('.' + formClass + ' input').css("display", "none !important");
                }
            });
        } else {

        }
    });

    // Keep chainability
    return this;
};

//Resort Offers Carousel
if ($("#grid-offers").hasClass("centerMode")) {
    var cardCount = $("#grid-offers").attr("item-count");
    //Default (No responsive settings)
    if ($(window).width() >= 1600 && cardCount < 5) {
        var centerOption = true;
        //Default (responsive settings for 1200 to 1600)
    } else if ($(window).width() >= 1200 && cardCount <= 4) {
        var centerOption = true;
        //Default (responsive settings for 800 to 1199)
    } else if ($(window).width() >= 800 && cardCount <= 3) {
        var centerOption = true;
        //Default (responsive settings for mobile to 799)
    } else if ($(window).width() >= 520 && cardCount < 2) {
        var centerOption = true;
    } else {
        var centerOption = false;
    }
} else if ($("#grid-offers").hasClass("centerModeMobile")) {
    var centerOption = true;
    centerPadding: '20px'
} else {
    var centerOption = false;
}

$("#grid-offers").slick({
    slidesToShow: 5,
    infinite: false,
    nextArrow: '<button type="button" class="slickNavBtn-next slickNavBtn" aria-label="Next Arrow"><i class="far fa-angle-right"></i></button>',
    prevArrow: '<button type="button" class="slickNavBtn-prev slickNavBtn" aria-label="Previous Arrow"><i class="far fa-angle-left"></i></button>',
    centerMode: centerOption,
    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 520,
            settings: {
                slidesToShow: 1,
                centerPadding: '20px'
            }
        }
    ]
});

// Video Controls on HeroSlider
var userUnmute = false;

$(".video-volume").click(function () {
    if ($("video").prop('muted')) {
        //Unmute Video
        unmuteAudio();
        userUnmute = true;
    } else {
        //Mute Video
        muteAudio();
        userUnmute = false;
    }
});

$(".video-play").click(function () {
    if ($("video").prop('paused')) {
        $("video")[0].play();
        $(".btn-play").css("display", "none");
        $(".btn-pause").css("display", "block");
    } else {
        $("video")[0].pause();
        $(".btn-play").css("display", "block");
        $(".btn-pause").css("display", "none");
    }
});

$(window).scroll(function () {
    var audioHeight = $('.animatedBody').offset().top / 1.1; // set sound off when scrolling down on the page reach the content section
    var currentpos = $(window).scrollTop();
    if ((currentpos >= 0) && (currentpos < audioHeight) && userUnmute) {
        unmuteAudio();
    } else {
        muteAudio();
    }
});

function muteAudio() {
    $("video").prop('muted', true); // set video to sound off
    $(".btn-mute").css("display", "block");
    $(".btn-unmute").css("display", "none");
}
function unmuteAudio() {
    $("video").prop('muted', false); // set video to sound on
    $(".btn-mute").css("display", "none");
    $(".btn-unmute").css("display", "block");
}

//Reasons To Go Slider + USPs Masonry sliders on width 768px or less
let RTGSlider = $(".reasons-to-go-collection");

const RTGSlider_settings = {
    lazyLoad: "ondemand",
    mobileFirst: !0,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '30px',
    swipeToSlide: true,
    autoplay: false,
    nextArrow: '<button type="button" class="slickNavBtn-next slickNavBtn" aria-label="Next Arrow"><i class="far fa-angle-right"></i></button>',
    prevArrow: '<button type="button" class="slickNavBtn-prev slickNavBtn" aria-label="Previous Arrow"><i class="far fa-angle-left"></i></button>',
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerPadding: '20px'
            }
        },
        {
            breakpoint: 767,  // unslick when greater than 767 pixel width
            settings: "unslick"
        }
    ]
};

// check in a condition, similar to a debounce
const ss = $(RTGSlider).slick(RTGSlider_settings);

$(window).on('resize', function () {
    // on resize, if the width is less than 768, and has no init class, re initialize.
    if ($(window).width() < 768 && !ss.hasClass('slick-initialized')) {
        $(RTGSlider).slick(RTGSlider_settings);
    }
});



/* FAQs Accordion */
$(function () {

    var activated = false;

    $(".reasons li").each(function () {
        if ($(this).find("p").length) {
            if (!$(".reasons .active").length) {
                $(this).addClass("active");
            }
        }
    });

    $(".reasons .title").on("click", function () {
        if (activated || $(this).hasClass("text-unavailable")) {
            return false;
        }
        activated = true;
        if ($(this).parent().hasClass("active")) {
            $(".reasons .active").find("p").slideUp(300, function () {
                $(this).parent().removeClass("active");
            })
            activated = false;
            return;
        }
        $(".reasons .active").find("p").slideUp(300, function () {
            $(this).parent().removeClass("active");
        })
        $(this).parent().find("p").slideDown(300, function () {
            activated = false;
            $(this).parent().addClass("active");
        });
    });

});

// bdi on (a title) tags on FAQs

$('.faq-details a').each(function () {
    var replaceTitle = $(this).attr('title').replace('<bdi>* </bdi>', '*').replace('<bdi>&</bdi>', '&').replace('<bdi>*</bdi>', '*');
    $(this).attr('title', replaceTitle);
});