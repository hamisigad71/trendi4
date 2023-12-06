$(function () {
    var geoCode         = getCookie("geocode");
    var $bookBtn        = $(".open-booking");
    var $layaBookBtn    = $(".open-booking-laya .dropdown-links .hotel-book");
    var $countryPop     = $("#country_special_popup");
    var $packagePop     = $("#package_special_popup");
    var $selectOfferPop = $("#select-offer-prompt");
    var packageTrigger  = false;
    var $closeBtn       = $(".closeButton, .okButton");
    var hidValue        = $(".open-booking").attr("hid");

    $("#btnBookso, .hotelBookingBtn").click(function () {
        if (!$(this).hasClass("hotelBookingBtn")) {

            if ($(".open-booking-laya .dropdown-links .hotel-book").length == 0) {
                $bookBtn.attr("data-promocode", $(this).attr("data-promocode")).trigger("click");
            }else {
                $layaBookBtn.attr("data-promocode", $(this).attr("data-promocode")).trigger("click");
            }
            
        } else {
            
            if ($(".open-booking-laya .dropdown-links .hotel-book").length == 0) {
                $bookBtn.attr("hid", $(this).attr("hid")).trigger("click");
            }else {
                $layaBookBtn.attr("hid", $(this).attr("hid")).trigger("click");
            }
        }
    });

    // Close Geo Container if open
    $closeBtn.click(function () {
        $(".geoQuestionsContainer").slideUp();
        $(".booking-overlay").fadeOut();
    });
    
    $bookBtn.click(function (evt) {
        var link        = $(this).attr("blink");
        var hid         = $(this).attr("hid") ? 0 : $(this).attr("hid");
        var hfilter     = $(this).attr("hfilter") ? 0 : $(this).attr("hfilter");

        if (window.geoCode) {
            if (getCookie("geocode")) {
                
                /*if ( ($(".VintageSpecialOfferListing").length == 1) || ($(".travel-experience-listing").length == 1) ) { //if we are on the listing page of Special Offer & listing page of EEs, 
                    $("#country_special_popup").hide();
                    $("#select-offer-prompt").show();
                    $(".geoQuestionsContainer").slideDown(); //show special offer prompt
                    $(".booking-overlay").fadeIn();
                } else {*/
                    redirectHandler($bookBtn);
                /*}*/

            } else {
                $(".geoQuestionsContainer").slideDown();
                $(".booking-overlay").fadeIn();
            }
        } else { // set for international - do not redirect to dedicated booking page if LAYA is in place
            
            if (hidValue != "51547" || hidValue != "51543" || hidValue != "51540") { // redirect to normal booking widget if not for these hotel - else load LAYA
                redirectHandler($bookBtn);
            }
        } 
    });
    
    // LAYA booking button click
    $layaBookBtn.click(function (evt) {
        var link        = $(this).attr("blink");
        var hid         = $(this).attr("hid") ? 0 : $(this).attr("hid");
        var hfilter     = $(this).attr("hfilter") ? 0 : $(this).attr("hfilter");

        if (!window.geoCode) {

            // set for international - do not redirect to dedicated booking page if LAYA is in place
            if (hidValue != "51547" || hidValue != "51543" || hidValue != "51540") { // redirect to normal booking widget if not for these hotel - else load LAYA
                layaBERedirectHandler($layaBookBtn);
            }
        } else {
            if (getCookie("geocode")) {
                layaBERedirectHandler($layaBookBtn);
            }
        }
    });
    
    // Hover conditions on main nav booking button - for LAYA
    $(".open-booking, .open-booking-laya").hover(
        function() {
            // Code to be executed when the mouse enters the button
            $(this).addClass('hovered');
            
            if (window.geoCode) {
                if (getCookie("geocode")) {
                    $(".dropdown-links").css("display", "block");
                } else {
                    
                    $(".dropdown-links").css("display", "none");
                }
            }
        },
        function() {
          // Code to be executed when the mouse leaves the button
          $(this).removeClass('hovered');
        }
    );
    
    if (!window.geoCode) {
        
        $("#booking-widget-hotelonly").show();
        $(".geodesc").show();
        
    } else {
        
        if (!geoCode) {

            $("#country_special_popup").show();
            $(".hotel-flight").css("display", "none"); // hide in main nav bar - LAYA
            
        } else {
            
            $("#booking-widget-hotelonly").show();
            $(".geodesc").show();
            
            $(".hotel-flight").css("display", "block"); // show in main nav bar - LAYA
        }
    }

    $("#confirmCountryYes").click(function () {
        setCookie("geocode", window.geoCode, 7);

        // Open packagepop if available
        if ($packagePop.length == 1) { //set to zero if not to display see offers window popout

            if ($(".VintageSpecialOfferListing").length == 0 && $(".SpecialOfferItem").length == 0) {
                $countryPop.hide();
                $packagePop.show();
            } else {
                var packagePage = $(".VintageSpecialOfferListing").length != 0 ? "listing" : $(".SpecialOfferItem").length != 0 ? "details" : "other";
                handlerPackagePages(packagePage, "yes");
                $(".geoQuestionsContainer").slideUp();
                $(".booking-overlay").fadeOut();
            }
        } else {
            $(".geoQuestionsContainer").slideUp();
            $(".booking-overlay").fadeOut();
            redirectHandler($bookBtn);
        }
    });

    $("#confirmCountryNo").click(function () {
        setCookie("geocode", "no", 7);
        
        location.reload(); // reload page for LAYA

        if ($(".VintageSpecialOfferListing").length == 0 && $(".SpecialOfferItem").length == 0) {
            // redirectHandler($bookBtn); // set for international - do not redirect to dedicated booking page if LAYA is in place
            $(".geoQuestionsContainer").slideUp(); // remove this line completely - if we are removing hotels + flight
            $(".booking-overlay").fadeOut(); // remove this line completely - if we are removing hotels + flight
            
        } else {
            if ($(".SpecialOfferItem").length == 0) {
                $(".geoQuestionsContainer").slideUp();
                $(".booking-overlay").fadeOut();
            } else {
                handlerPackagePages("details", "no");
                $(".geoQuestionsContainer").slideUp();
                $(".booking-overlay").fadeOut();
            }
        }
    });

    $(".packagePop_btn").click(function () {
        var btnVal = $(this).val();

        if (btnVal == "yes") {
            //linkHandler("", $packagePop.attr("plink"));
            redirectHandler($packagePop);
        } else {
            redirectHandler($bookBtn);
        }
    });

    //handle package listing page
    if ($(".VintageSpecialOfferListing").length != 0) {

        $("#select-offer-prompt").hide();

        if (window.geoCode) {
            if (geoCode) {
                //kozelux otelux offers displayed
            } else {
                $bookBtn.trigger("click");
                packageTrigger = true;
            }
        } else {
            //International offers displayed
        }
    }

    //handle package details page
    if ($(".SpecialOfferItem").length != 0) {
        if (window.geoCode) {
            if (geoCode) {
                //kozelux otelux offer displayed
                //international offer redirect to page listing
                handlerPackagePages("details", geoCode);
            } else {
                $bookBtn.trigger("click");
                packageTrigger = true;
            }
        } else {
            //International offer displayed
            //kozelux otelux offer redirect to page listing
            handlerPackagePages("details", "no");
        }
    }

    function handlerPackagePages(page, val) {
        switch (page) {

            case "listing":
                if (val == "yes") {
                    location.reload();
                }
            break;

            case "details":
                var offerType   = $(".SpecialOfferItem").attr("offer-type");
                var otObj       = offerType.split(",");
                var conType     = val == "no" ? "international" : getCookie("geocode") == "no" ? "international" : getCookie("geocode");

                if ($.inArray(conType, otObj) >= 0) {
                    //console.log(conType + " in list");
                } else {
                    //console.log(conType + " not in list" + getAbsolutePath());
                    //window.location = getAbsolutePath(); // !!! this line has been commented out since its causing infinite loading on dedicated international offer pages.
                }
                break;
            default:
                console.log("what's that?");
        }
    }

    function redirectHandler($element) {
        
        var hotId                   = !$element.attr("hid") ? 0 : $bookBtn.attr("hid");
        var hotfilter               = $bookBtn.attr("hfilter") == "" ? "" : $bookBtn.attr("hfilter");
        var destinationType         = "";
        var promoCode               = typeof ($(".open-booking").attr("data-promoCode")) !== "undefined" ? $(".open-booking").attr("data-promoCode") : "";

        if ($bookBtn.attr("hid") != "" && isNaN(parseInt(hotId)) && hotfilter == "") {
            hotfilter               = $bookBtn.attr("hid");
        }

        var bookLink                = $(".open-booking").length > 0 ? $element.attr("blink") : window.location.pathname;
        
        if ($(".open-booking").length > 0) {

            window.location = linkHandler(hotfilter, bookLink, promoCode);
            
        } else {
            var $bScope     = angular.element($('#booking-widget-hotelonly form')).scope();
            $(".geodesc").show();
            $bScope.model.showBookingWidget = true;
            $bScope.$apply();
        }
    }
    
    // LAYA customized function
    function layaBERedirectHandler($element) {
        var layaHotId                   = !$element.attr("hid") ? 0 : $layaBookBtn.attr("hid");
        var layaHotfilter               = $layaBookBtn.attr("hfilter") == "" ? "" : $layaBookBtn.attr("hfilter");
        var layaPromoCode               = typeof ($(".open-booking-laya").find(".dropdown-links .hotel-book").attr("data-promoCode")) !== "undefined" ? $(".open-booking-laya").find(".dropdown-links .hotel-book").attr("data-promoCode") : "";
    
        if ($layaBookBtn.attr("hid") != "" && isNaN(parseInt(layaHotId)) && layaHotfilter == "") {
            hotfilter                   = $layaBookBtn.find(".dropdown-links .hotel-book").attr("hid");
        }
    
        var bookLink                    = $(".open-booking-laya").length > 0 ? $element.attr("blink") : window.location.pathname;
            
        if ($(".open-booking-laya").length > 0) {
    
            window.location             = linkHandler(layaHotfilter, bookLink, layaPromoCode);
                
        } else {
            var $bScope                 = angular.element($('#booking-widget-hotelonly form')).scope();
            $(".geodesc").show();
            $bScope.model.showBookingWidget = true;
            $bScope.$apply();
        }
    }
    
    function getAbsolutePath() { //get listing page URL for our special offers
        var loc         = window.location;
        var pathName    = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
        return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
    }
});

function linkHandler($hid, $link, $promocode) {
    if ($hid && $hid != "") {
        if ($promocode != "") {

                return $link + "?hid=" + $hid + "&promoCode=" + $promocode;
            
        } else {

            if ($hid.indexOf(".") == 0) {
                return $link + "?hid=" + $hid;
            } else {
                return $link + "?did=" + $hid;
            }
        }
    } else {
        return $link;
    }
}

function getCookie(cname) {

    let name            = cname + "=";
    let decodedCookie   = decodeURIComponent(document.cookie);
    let ca              = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c           = ca[i];
        while (c.charAt(0) == ' ') {
            c           = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d         = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires     = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Laya Integration for Booking Hotels + Flight

(function () {
    var la      = document.createElement("script");
    la.async    = true;
    la.src      = "https://app.laya.ai/laya-loader.js?t=" + new Date().getTime();
    (document.head || document.body).appendChild(la);
})();

/*function loadLayaBookingFn(){ //Set laya class to booking buttons throughout the website
    if (!window.geoCode){ //Set for international
        $("#btnBookso, .open-booking .book_button").addClass("laya-search-link").attr("data-laya-config-id", "44bb2601-07d0-4f8a-a3bc-b4496535fc40").attr("onClick", "return false;");
    }
}*/