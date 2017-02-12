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
    animation: 'fade',
    // скорость анимации смены вкладок
    speed: 400,
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
      if ((window.location.hash !== '' && settings.hash === true) && ($this.find('.tab__link[href=' + hashLink + ']').length == 1)) {
        $this.find('.tab__link[href=' + hashLink + ']').closest('.tab__item').addClass('active');
        $this.closest('.tab').find('#' + hashLinkSlice + '').addClass('block');
      } else {
        $this.find('.tab__item').eq(settings.defaultTab).addClass('active');
        $this.find('.tab__content').eq(settings.defaultTab).addClass('block');
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
            if (settings.animation === 'fade') {
              $(this).closest('.tab').find('.tab__content').siblings().stop().fadeOut(0);
              $(this).closest('.tab').find('.tab__content[id=' + tabLinkSlice + ']').stop().fadeIn(settings.speed);
            } else if (settings.animation === 'show') {
              $(this).closest('.tab').find('.tab__content').siblings().stop().hide();
              $(this).closest('.tab').find('.tab__content[id=' + tabLinkSlice + ']').stop().show();
            }
            setTimeout(function() {
              cb = settings.afterChange
              if (cb && typeof cb === 'function') {
                cb()
              }
            }, settings.speed);
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
