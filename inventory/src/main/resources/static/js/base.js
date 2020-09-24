$(function () {

    // Fixed Header
    if ($.cookie('fixed-header') === 'navbar-static-top') {
        $('#fixedheader').toggles();
    } else {
        $('#fixedheader').toggles({on: true});
    }

    $('.dropdown-menu').on('click', function (e) {
        if ($(this).hasClass('dropdown-menu-form')) {
            e.stopPropagation();
        }
    });


    $('#fixedheader').on('toggle', function (e, active) {
        $('header').toggleClass('navbar-fixed-top navbar-static-top');
        $('body').toggleClass('static-header');
        rightbarTopPos();
        if (active) {
            $.removeCookie('fixed-header');
        } else {
            $.cookie('fixed-header', 'navbar-static-top');
        }
    });

    // Demo Color Variation
    // Read the CSS files from data attributes

    $("#demo-color-variations a").click(function () {
        $("head link#styleswitcher").attr("href", GLOBAL_CONTEXT.resourcePath + '/css/variations/' + $(this).data("theme"));
        $.cookie('theme', $(this).data("theme"));
        return false;
    });

    $("#demo-header-variations a").click(function () {
        $("head link#headerswitcher").attr("href", GLOBAL_CONTEXT.resourcePath + '/css/variations/' + $(this).data("headertheme"));
        $.cookie('headertheme', $(this).data("headertheme"));
        return false;
    });

//Demo Background Pattern

    $(".demo-blocks").click(function () {
        $('.fixed-layout').css('background', $(this).css('background'));
        return false;
    });
});
