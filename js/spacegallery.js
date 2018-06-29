(function ($) {
    var EYE = window.EYE = function () {
        var _registered = {
            init: []
        };
        return {
            init: function () {
                $.each(_registered.init, function (nr, fn) {
                    fn.call();
                });
            },
            extend: function (prop) {
                for (var i in prop) {
                    if (prop[i] != undefined) {
                        this[i] = prop[i];
                    }
                }
            },
            register: function (fn, type) {
                if (!_registered[type]) {
                    _registered[type] = [];
                }
                _registered[type].push(fn);
            }
        };
    }();
    $(EYE.init);




    EYE.extend({
        getPosition: function (e, forceIt) {
            var x = 0;
            var y = 0;
            var es = e.style;
            var restoreStyles = false;
            if (forceIt && jQuery.curCSS(e, 'display') == 'none') {
                var oldVisibility = es.visibility;
                var oldPosition = es.position;
                restoreStyles = true;
                es.visibility = 'hidden';
                es.display = 'block';
                es.position = 'absolute';
            }
            var el = e;
            if (el.getBoundingClientRect) { // IE
                var box = el.getBoundingClientRect();
                x = box.left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - 2;
                y = box.top + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - 2;
            } else {
                x = el.offsetLeft;
                y = el.offsetTop;
                el = el.offsetParent;
                if (e != el) {
                    while (el) {
                        x += el.offsetLeft;
                        y += el.offsetTop;
                        el = el.offsetParent;
                    }
                }
                if (jQuery.browser.safari && jQuery.curCSS(e, 'position') == 'absolute') {
                    x -= document.body.offsetLeft;
                    y -= document.body.offsetTop;
                }
                el = e.parentNode;
                while (el && el.tagName.toUpperCase() != 'BODY' && el.tagName.toUpperCase() != 'HTML') {
                    if (jQuery.curCSS(el, 'display') != 'inline') {
                        x -= el.scrollLeft;
                        y -= el.scrollTop;
                    }
                    el = el.parentNode;
                }
            }
            if (restoreStyles == true) {
                es.display = 'none';
                es.position = oldPosition;
                es.visibility = oldVisibility;
            }
            return {x: x, y: y};
        },
        getSize: function (e) {
            var w = parseInt(jQuery.curCSS(e, 'width'), 10);
            var h = parseInt(jQuery.curCSS(e, 'height'), 10);
            var wb = 0;
            var hb = 0;
            if (jQuery.curCSS(e, 'display') != 'none') {
                wb = e.offsetWidth;
                hb = e.offsetHeight;
            } else {
                var es = e.style;
                var oldVisibility = es.visibility;
                var oldPosition = es.position;
                es.visibility = 'hidden';
                es.display = 'block';
                es.position = 'absolute';
                wb = e.offsetWidth;
                hb = e.offsetHeight;
                es.display = 'none';
                es.position = oldPosition;
                es.visibility = oldVisibility;
            }
            return {w: w, h: h, wb: wb, hb: hb};
        },
        getClient: function (e) {
            var h, w;
            if (e) {
                w = e.clientWidth;
                h = e.clientHeight;
            } else {
                var de = document.documentElement;
                w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
                h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
            }
            return {w: w, h: h};
        },
        getScroll: function (e) {
            var t = 0, l = 0, w = 0, h = 0, iw = 0, ih = 0;
            if (e && e.nodeName.toLowerCase() != 'body') {
                t = e.scrollTop;
                l = e.scrollLeft;
                w = e.scrollWidth;
                h = e.scrollHeight;
            } else {
                if (document.documentElement) {
                    t = document.documentElement.scrollTop;
                    l = document.documentElement.scrollLeft;
                    w = document.documentElement.scrollWidth;
                    h = document.documentElement.scrollHeight;
                } else if (document.body) {
                    t = document.body.scrollTop;
                    l = document.body.scrollLeft;
                    w = document.body.scrollWidth;
                    h = document.body.scrollHeight;
                }
                if (typeof pageYOffset != 'undefined') {
                    t = pageYOffset;
                    l = pageXOffset;
                }
                iw = self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
                ih = self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
            }
            return {t: t, l: l, w: w, h: h, iw: iw, ih: ih};
        },
        getMargins: function (e, toInteger) {
            var t = jQuery.curCSS(e, 'marginTop') || '';
            var r = jQuery.curCSS(e, 'marginRight') || '';
            var b = jQuery.curCSS(e, 'marginBottom') || '';
            var l = jQuery.curCSS(e, 'marginLeft') || '';
            if (toInteger)
                return {
                    t: parseInt(t, 10) || 0,
                    r: parseInt(r, 10) || 0,
                    b: parseInt(b, 10) || 0,
                    l: parseInt(l, 10)
                };
            else
                return {t: t, r: r, b: b, l: l};
        },
        getPadding: function (e, toInteger) {
            var t = jQuery.curCSS(e, 'paddingTop') || '';
            var r = jQuery.curCSS(e, 'paddingRight') || '';
            var b = jQuery.curCSS(e, 'paddingBottom') || '';
            var l = jQuery.curCSS(e, 'paddingLeft') || '';
            if (toInteger)
                return {
                    t: parseInt(t, 10) || 0,
                    r: parseInt(r, 10) || 0,
                    b: parseInt(b, 10) || 0,
                    l: parseInt(l, 10)
                };
            else
                return {t: t, r: r, b: b, l: l};
        },
        getBorder: function (e, toInteger) {
            var t = jQuery.curCSS(e, 'borderTopWidth') || '';
            var r = jQuery.curCSS(e, 'borderRightWidth') || '';
            var b = jQuery.curCSS(e, 'borderBottomWidth') || '';
            var l = jQuery.curCSS(e, 'borderLeftWidth') || '';
            if (toInteger)
                return {
                    t: parseInt(t, 10) || 0,
                    r: parseInt(r, 10) || 0,
                    b: parseInt(b, 10) || 0,
                    l: parseInt(l, 10) || 0
                };
            else
                return {t: t, r: r, b: b, l: l};
        },
        traverseDOM: function (nodeEl, func) {
            func(nodeEl);
            nodeEl = nodeEl.firstChild;
            while (nodeEl) {
                EYE.traverseDOM(nodeEl, func);
                nodeEl = nodeEl.nextSibling;
            }
        },
        getInnerWidth: function (el, scroll) {
            var offsetW = el.offsetWidth;
            return scroll ? Math.max(el.scrollWidth, offsetW) - offsetW + el.clientWidth : el.clientWidth;
        },
        getInnerHeight: function (el, scroll) {
            var offsetH = el.offsetHeight;
            return scroll ? Math.max(el.scrollHeight, offsetH) - offsetH + el.clientHeight : el.clientHeight;
        },
        getExtraWidth: function (el) {
            if ($.boxModel)
                return (parseInt($.curCSS(el, 'paddingLeft')) || 0)
                    + (parseInt($.curCSS(el, 'paddingRight')) || 0)
                    + (parseInt($.curCSS(el, 'borderLeftWidth')) || 0)
                    + (parseInt($.curCSS(el, 'borderRightWidth')) || 0);
            return 0;
        },
        getExtraHeight: function (el) {
            if ($.boxModel)
                return (parseInt($.curCSS(el, 'paddingTop')) || 0)
                    + (parseInt($.curCSS(el, 'paddingBottom')) || 0)
                    + (parseInt($.curCSS(el, 'borderTopWidth')) || 0)
                    + (parseInt($.curCSS(el, 'borderBottomWidth')) || 0);
            return 0;
        },
        isChildOf: function (parentEl, el, container) {
            if (parentEl == el) {
                return true;
            }
            if (!el || !el.nodeType || el.nodeType != 1) {
                return false;
            }
            if (parentEl.contains && !$.browser.safari) {
                return parentEl.contains(el);
            }
            if (parentEl.compareDocumentPosition) {
                return !!(parentEl.compareDocumentPosition(el) & 16);
            }
            var prEl = el.parentNode;
            while (prEl && prEl != container) {
                if (prEl == parentEl)
                    return true;
                prEl = prEl.parentNode;
            }
            return false;
        },
        centerEl: function (el, axis) {
            var clientScroll = EYE.getScroll();
            var size = EYE.getSize(el);
            if (!axis || axis == 'vertically')
                $(el).css(
                    {
                        top: clientScroll.t + ((Math.min(clientScroll.h, clientScroll.ih) - size.hb) / 2) + 'px'
                    }
                );
            if (!axis || axis == 'horizontally')
                $(el).css(
                    {
                        left: clientScroll.l + ((Math.min(clientScroll.w, clientScroll.iw) - size.wb) / 2) + 'px'
                    }
                );
        }
    });
    if (!$.easing.easeout) {
        $.easing.easeout = function (p, n, firstNum, delta, duration) {
            return -delta * ((n = n / duration - 1) * n * n * n - 1) + firstNum;
        };
    }





    EYE.extend({

        spacegallery: {

            //default options (many options are controled via CSS)
            defaults: {
                border: 0, // border arround the image
                perspective: 200, // perpective height
                minScale: 0.5, // minimum scale for the image in the back
                duration: 150, // aimation duration
                loadingClass: null, // CSS class applied to the element while looading images
                before: function () {
                    return false
                },
                after: function () {
                    return false
                }
            },

            animated: false,

            //position images
            positionImages: function (el) {
                var left = 0;
                EYE.spacegallery.animated = false;
                $(el)
                    .find('a')
                    .removeClass(el.spacegalleryCfg.loadingClass)
                    .end()
                    .find('img')
                    .removeAttr('height')
                    .each(function (nr) {
                        var newHeight = this.spacegallery.origHeight - (this.spacegallery.origHeight - this.spacegallery.origHeight * el.spacegalleryCfg.minScale) * el.spacegalleryCfg.asins[nr];
                        newHeight = newHeight / 2;
                        $(this)
                            .css({
                                left: el.spacegalleryCfg.lefts[nr] + 'px',
                                marginTop: 200 - parseInt((newHeight + el.spacegalleryCfg.border) / 2, 10) + 'px',
                                opacity: 1 - el.spacegalleryCfg.asins[nr] + 0.2,
                                height : parseInt(newHeight)
                            })
                            // .attr('Height', parseInt(newHeight));
                        this.spacegallery.next = el.spacegalleryCfg.asins[nr + 1];
                        this.spacegallery.nextTop = el.spacegalleryCfg.lefts[nr + 1] - el.spacegalleryCfg.lefts[nr];
                        this.spacegallery.origTop = el.spacegalleryCfg.lefts[nr];
                        this.spacegallery.opacity = 1 - el.spacegalleryCfg.asins[nr];
                        this.spacegallery.increment = el.spacegalleryCfg.asins[nr] - this.spacegallery.next;
                        this.spacegallery.current = el.spacegalleryCfg.asins[nr];
                        this.spacegallery.Height = newHeight;
                    })
            },

            //animate to nex image
            next: function (e) {
                if (EYE.spacegallery.animated === false) {
                    EYE.spacegallery.animated = true;
                    var el = this.parentNode;
                    el.spacegalleryCfg.before.apply(el);
                    $(el)
                        .css('spacegallery', 0)
                        .animate({
                            spacegallery: 100
                        }, {
                            easing: 'easeOut',
                            duration: el.spacegalleryCfg.duration,
                            complete: function () {
                                $(el)
                                    .find('img:last')
                                    .prependTo(el);
                                EYE.spacegallery.positionImages(el);
                                el.spacegalleryCfg.after.apply(el);
                            },
                            step: function (now) {
                                $('img', this)
                                    .each(function (nr) {
                                        var newHeight, left, next;
                                        if (nr + 1 == el.spacegalleryCfg.images) {
                                            left = this.spacegallery.origTop + this.spacegallery.nextTop * 4 * now / 100;
                                            newHeight = this.spacegallery.Height * left / this.spacegallery.origTop;
                                            newHeight = newHeight / 2;
                                            $(this)
                                                .css({
                                                    left: left + 'px',
                                                    opacity: 0.2 - now / 100,
                                                    marginTop: 200 - parseInt((newHeight + el.spacegalleryCfg.border) / 2, 10) + 'px',
                                                    height: newHeight
                                                })
                                                // .attr('Height', newHeight);
                                        } else {
                                            next = this.spacegallery.current - this.spacegallery.increment * now / 100;
                                            newHeight = this.spacegallery.origHeight - (this.spacegallery.origHeight - this.spacegallery.origHeight * el.spacegalleryCfg.minScale) * next;
                                            newHeight = newHeight / 2;
                                            $(this).css({
                                                left: this.spacegallery.origTop + this.spacegallery.nextTop * now / 100 + 'px',
                                                opacity: 1 - next + 0.2,
                                                marginTop: 200 - parseInt((newHeight + el.spacegalleryCfg.border) / 2, 10) + 'px',
                                                height: newHeight
                                            })
                                                // .attr('Height', newHeight);
                                        }
                                    });
                            }
                        });
                }

                this.blur();
                return false;
            },

            //constructor
            init: function (opt) {
                opt = $.extend({}, EYE.spacegallery.defaults, opt || {});
                return this.each(function () {
                    var el = this;
                    if ($(el).is('.spacegallery')) {
                        $('<a href="#"></a>')
                            .appendTo(this)
                            .addClass(opt.loadingClass)
                            .bind('click', EYE.spacegallery.next);
                        el.spacegalleryCfg = opt;
                        el.spacegalleryCfg.images = el.getElementsByTagName('img').length;
                        el.spacegalleryCfg.loaded = 0;
                        el.spacegalleryCfg.asin = Math.asin(1);
                        el.spacegalleryCfg.asins = {};
                        el.spacegalleryCfg.lefts = {};
                        el.spacegalleryCfg.increment = parseInt(el.spacegalleryCfg.perspective / el.spacegalleryCfg.images, 10);
                        var left = 0;
                        $('img', el)
                            .each(function (nr) {
                                var imgEl = new Image();
                                var elImg = this;
                                el.spacegalleryCfg.asins[nr] = 1 - Math.asin((nr + 1) / el.spacegalleryCfg.images) / el.spacegalleryCfg.asin;
                                left += el.spacegalleryCfg.increment - el.spacegalleryCfg.increment * el.spacegalleryCfg.asins[nr];
                                el.spacegalleryCfg.lefts[nr] = left;
                                elImg.spacegallery = {};
                                imgEl.src = this.src;
                                if (imgEl.complete) {
                                    el.spacegalleryCfg.loaded++;
                                    elImg.spacegallery.origHeight = imgEl.Height;
                                    elImg.spacegallery.origHeight = imgEl.height
                                } else {
                                    imgEl.onload = function () {
                                        el.spacegalleryCfg.loaded++;
                                        elImg.spacegallery.origHeight = imgEl.Height;
                                        elImg.spacegallery.origHeight = imgEl.height
                                        if (el.spacegalleryCfg.loaded == el.spacegalleryCfg.images) {

                                            EYE.spacegallery.positionImages(el);
                                        }
                                    };
                                }
                            });
                        el.spacegalleryCfg.asins[el.spacegalleryCfg.images] = el.spacegalleryCfg.asins[el.spacegalleryCfg.images - 1] * 1.3;
                        el.spacegalleryCfg.lefts[el.spacegalleryCfg.images] = el.spacegalleryCfg.lefts[el.spacegalleryCfg.images - 1] * 1.3;
                        if (el.spacegalleryCfg.loaded == el.spacegalleryCfg.images) {
                            EYE.spacegallery.positionImages(el);
                        }
                    }
                });
            }
        }
    });

    $.fn.extend({

        /**
         * Create a space gallery
         * @name spacegallery
         * @description create a space gallery
         * @option    int            border            Images' border. Default: 6
         * @option    int            perspective        Perpective height. Default: 140
         * @option    float        minScale        Minimum scale for the image in the back. Default: 0.2
         * @option    int            duration        Animation duration. Default: 800
         * @option    string        loadingClass    CSS class applied to the element while looading images. Default: null
         * @option    function    before            Callback function triggered before going to the next image
         * @option    function    after            Callback function triggered after going to the next image
         */
        spacegallery: EYE.spacegallery.init
    });
    $.extend($.easing, {
        easeOut: function (x, t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        }
    });


    var initLayout = function () {
        $('#myGallery').spacegallery({loadingClass: 'loading'});
    };


    EYE.register(initLayout, 'init');


})(jQuery);
