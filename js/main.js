(function ($) {
    "use strict";


    /*Мобильное меню*/
    var navMain = document.querySelector(".main-nav");
    var navToggle = document.querySelector(".main-nav-toggle");
    var pageHeaderWrapper = document.querySelector(".page-header__wrapper");

    // navMain.classList.remove('main-nav--nojs');

    navToggle.addEventListener("click", function () {
        if (navMain.classList.contains("main-nav--closed")) {
            navToggle.classList.remove("main-nav-toggle--closed");
            navToggle.classList.add("main-nav-toggle--open");
            navMain.classList.remove("main-nav--closed");
            navMain.classList.add("main-nav--opened");
            pageHeaderWrapper.classList.add("page-header__wrapper--menu-open");
        } else {
            navToggle.classList.remove("main-nav-toggle--open");
            navToggle.classList.add("main-nav-toggle--closed");
            navMain.classList.add("main-nav--closed");
            navMain.classList.remove("main-nav--opened");
            pageHeaderWrapper.classList.remove("page-header__wrapper--menu-open");
        }
    });

    function getPageScroll() {
        return window.pageYOffset;
    }

    $(window).on('scroll', function (e) {
        var $header = $(".page-header__top-wrapper");
        if (getPageScroll() > 141) {
            $header.addClass("fixed").fadeIn();

        } else {
            $header.removeClass("fixed");
        }
    })


//////////////отправка формы


    function formHandler(selector) {

        // debugger;
        $(selector).on('submit', function (e) {

            e.preventDefault();

            var _this = $(this),
                $nameField = _this.find('input[name=name]'),
                $emailField = _this.find('input[name=email]'),
                $phoneField = _this.find('input[name=phone]'),
                $cityField = _this.find('input[name=city]'),
                $hiddenInput = _this.find('input[type=hidden]');

            if ($emailField.val() === '') {
                $emailField.addClass('has-error');
            }
            if ($phoneField.val() === '') {
                $phoneField.addClass('has-error');
            }
            else if ($emailField.val() !== '' && $phoneField.val() !== '') {

                var ajaxdata = 'name=' + $nameField.val() + '&email=' + $emailField.val() + '&phone=' + $phoneField.val() + '&city=' + $cityField.val() + '&block=' + $hiddenInput.val();

                console.log(ajaxdata);

                $.ajax({
                    type: "POST",
                    url: "form_handler.php",
                    data: ajaxdata,
                    success: function ($output) {
                        $('#form-messages').html($output);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        });
    }


    formHandler('#contactForm');

})(jQuery);

var menu_selector = ".main-nav"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню.

function onScroll() {
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " li.main-nav__item").each(function () {
        var hash = $(this).find('a').attr("href");
        var target = $(hash);
        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
};

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        // $(this).addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function () {
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });

    });

});

$(document).ready(function () {
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>Сеть салонов красоты «Рай»</small>';
            }
        }
    });

    $('.popup-gallery-2').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>Сеть салонов красоты «Рай»</small>';
            }
        }
    });

    $('.popup-gallery-3').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>Сеть салонов красоты «Рай»</small>';
            }
        }
    });

    $('.popup-gallery-4').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>Сеть салонов красоты «Рай»</small>';
            }
        }
    });

    $('.popup-gallery-mobile').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>Сеть салонов красоты «Рай»</small>';
            }
        }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

});


/////////////////////////paralax


$(window).resize(function () {
    if (document.documentElement.clientWidth > 1200) {
        (function () {
            var offset = 0;
            $(window).scroll(function () {
                var str = $(this).scrollTop();

                if ($(window).scrollTop() > $(".receive").offset().top - $(window).height()
                    &&
                    $(window).scrollTop() < $(".receive").offset().top + $(".receive").outerHeight()) {
                    $(".receive").css({
                        "background-position-y": offset + "px"
                    });
                    offset = ($(window).scrollTop() - $(".receive").offset().top) / 5;
                } else {
                    offset = 0;
                }
            });
        }());

        (function () {
            var offset = 0;
            $(window).scroll(function () {
                var str = $(this).scrollTop();

                if ($(window).scrollTop() > $(".receive-second").offset().top - $(window).height()
                    &&
                    $(window).scrollTop() < $(".receive-second").offset().top + $(".receive-second").outerHeight()) {
                    $(".receive-second").css({
                        "background-position-y": offset + "px"
                    });
                    offset = ($(window).scrollTop() - $(".receive-second").offset().top) / 5;
                } else {
                    offset = 0;
                }
            });
        }());
    }
});


////////////////////////modal

var modal = document.querySelector(".modal"),
    btnCollection = document.querySelectorAll(".btn"),
    modaLink = document.querySelector(".reed-more__link"),
    modalClose = document.querySelector(".btn--modal"),
    nodelistToArray = Array.apply(null, btnCollection),
    hiddenInput = document.getElementById('hiddenInput');


nodelistToArray.forEach(function (button) {

    button.addEventListener("click", function (e) {
        e.preventDefault();


        hiddenInput.value = this.getAttribute('data-title');

        modal.classList.add("modal--opened");
        modal.classList.remove("modal--closed");
        // popupOverlay.classList.remove("modal--closed");
    });
});


modaLink.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("modal--opened");
    modal.classList.remove("modal--closed");
    // popupOverlay.classList.remove("modal--closed");
});

///закрытие modal по крестику

modalClose.addEventListener("click", function () {
    if (modal.classList.contains("modal--opened")) {
        modal.classList.remove("modal--opened");
        modal.classList.add("modal--closed");
    }
});

//закрытие modal по esc

window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
        if (modal.classList.contains("modal--opened")) {
            modal.classList.remove("modal--opened");
            modal.classList.add("modal--closed");
            // modalOverlay.classList.add("modal--closed");
        }
    }
});

//закрытие по клику за формой

jQuery(function ($) {
    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $(".modal__wrapper"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
            $(".modal--opened").removeClass("modal--opened"); // скрываем его
        }
    });
})

