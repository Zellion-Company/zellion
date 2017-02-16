;
(function($) {

  'use strict';

  var defaults = {
    // Вкладка по-умолчанию
    defaultTab: 0,
    // автосмена вкладок
    autoplay: false,
    // интервал смены вкладок
    interval: 5000,
    // анимация смены вкладок
    animation: 'show',
    // Направление анимации slide
    direction: 'left',
    // Размах анимации slide
    scope: '200px',
    // скорость анимации смены вкладок
    speed: 300,
    // возможность записывать location.hash
    hash: false,

    beforeChange: function() {},

    afterChange: function() {}
  };

  $.fn.zellionTabs = function(options) {

    var settings = $.extend({}, defaults, options);

    return this.each(function() {
      settings.beforeChange();
      var i = 0;
      var $this = $(this);
      var hashLink = window.location.hash;
      var hashLinkSlice = hashLink.slice(1);
      if (settings.afterChange && typeof settings.afterChange === 'function') {
          var callback = settings.afterChange
      }
      if ((window.location.hash !== '' && settings.hash === true) && ($this.find('.tab__link[href="' + hashLink + '"]').length == 1)) {
        $this.find('.tab__link[href="' + hashLink + '"]').closest('.tab__item').addClass('active');
        $this.find('#' + hashLinkSlice + '').addClass('block');
      } else {
        $this.find('.tab__item').eq(settings.defaultTab).addClass('active');
        $this.find('.tab__content').eq(settings.defaultTab).addClass('block');
      }
      if (settings.animation === 'slide') {
        if (settings.direction === 'top') {
          $this.find('.tab__content:not(.block)').css({
            opacity: 0,
            top: settings.scope
          });
        } else if (settings.direction === 'right') {
          $this.find('.tab__content:not(.block)').css({
            opacity: 0,
            right: settings.scope
          });
        } else if (settings.direction === 'bottom') {
          $this.find('.tab__content:not(.block)').css({
            opacity: 0,
            bottom: settings.scope
          });
        } else if (settings.direction === 'left') {
          $this.find('.tab__content:not(.block)').css({
            opacity: 0,
            left: settings.scope
          });
        }
      }


      function tabInit() {
        $this.on('click', '.tab__link', function(event, cb) {
          event.preventDefault();
          var tabLink = $(this).attr('href');
          var tabLinkSlice = tabLink.slice(1);
          if (settings.hash === true) {
            window.location.hash = tabLink
          }
          if (!($(this).closest('.tab__item').hasClass('active'))) {
            settings.beforeChange()
            $(this).closest('.tab__item').addClass('active').siblings().removeClass('active');
            if (settings.animation === 'show') {
              $(this).closest('.tab').find('.tab__content').siblings().stop().hide();
              $(this).closest('.tab').find('.tab__content[id=' + tabLinkSlice + ']').stop().show().animate({
                opacity: 1
              }, 100, callback);
            } else if (settings.animation === 'fade') {
              function slideNew() {
                $this.find('.tab__content').css({
                  opacity: 0,
                  display: 'none'
                });
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().addClass('block').css('display', 'block');
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().animate({
                  opacity: 1
                }, settings.speed, callback)
              }
              function slideOld() {
                $this.find('.tab__content.block').stop().animate({
                  opacity: 0
                }, settings.speed, function() {
                  $this.find('.tab__content.block').stop().removeClass('block').css({
                    display: 'none',
                  });
                  slideNew();
                });
              }
              slideOld()
            } else if (settings.direction === 'top') {
              function slideNew() {
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().addClass('block').css('display', 'block');
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().animate({
                  top: '0',
                  opacity: 1
                }, settings.speed, callback)
              }
              function slideOld() {
                $this.find('.tab__content.block').stop().animate({
                  top: '-'+settings.scope+'',
                  opacity: 0
                }, settings.speed, function() {
                  $this.find('.tab__content.block').stop().removeClass('block').css({
                    display: 'none',
                    top: settings.scope
                  });
                  slideNew();
                });
              }
              slideOld()
            } else if (settings.direction === 'right') {
              function slideNew() {
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().addClass('block').css('display', 'block');
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().animate({
                  right: '0',
                  opacity: 1
                }, settings.speed, callback)
              }
              function slideOld() {
                $this.find('.tab__content.block').stop().animate({
                  right: '-'+settings.scope+'',
                  opacity: 0
                }, settings.speed, function() {
                  $this.find('.tab__content.block').stop().removeClass('block').css({
                    display: 'none',
                    right: settings.scope
                  });
                  slideNew();
                });
              }
              slideOld()
            } else if (settings.direction === 'bottom') {
              function slideNew() {
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().addClass('block').css('display', 'block');
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().animate({
                  bottom: '0',
                  opacity: 1
                }, settings.speed, callback)
              }
              function slideOld() {
                $this.find('.tab__content.block').stop().animate({
                  bottom: '-'+settings.scope+'',
                  opacity: 0
                }, settings.speed, function() {
                  $this.find('.tab__content.block').stop().removeClass('block').css({
                    display: 'none',
                    bottom: settings.scope
                  });
                  slideNew();
                });
              }
              slideOld()
            } else if (settings.direction === 'left') {
              function slideNew() {
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().addClass('block').css('display', 'block');
                $this.find('.tab__content[id=' + tabLinkSlice + ']').stop().animate({
                  left: '0',
                  opacity: 1
                }, settings.speed, callback)
              }
              function slideOld() {
                $this.find('.tab__content.block').stop().animate({
                  left: '-'+settings.scope+'',
                  opacity: 0
                }, settings.speed, function() {
                  $this.find('.tab__content.block').stop().removeClass('block').css({
                    display: 'none',
                    left: settings.scope
                  });
                  slideNew();
                });
              }
              slideOld()
            }
          }
        });
      }


      if (settings.autoplay === true) {
        function tabAutoplay() {
          if ($this.find('.tab__item.active').hasClass('lastTab')) {
            $this.find('.tab__item:first').find('.tab__link').trigger('click');
          } else {
            $this.find('.tab__item.active').next('.tab__item').find('.tab__link').trigger('click');
          }
        }
        $this.find('.tab__item:last').addClass('lastTab');
        var int = setInterval(tabAutoplay, settings.interval);
      }


      $(window).on('load', function() {
        tabInit();
      });
      $('*').on('resize', function() {
        tabInit();
      });
    });
  };

})(jQuery);
