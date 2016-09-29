window.app = window.app || {};

app.toc = (function($, undefined) {
  var $document = $(document),
      $window = $(window),
      $html = $('html'),
      $body = $('body'),
      $toc = $('.text--toc');

  var _initialize = function() {
    // console.log('init');
    if ($toc.length) {
      $toc.html('<ul>' + $.map($('.page-main .toc'), function (title) {
        return (title.tagName == 'H2') ? '<li><a href="#' + $(title).closest('[id^="widget-"]').attr('id') + '" class="nav__link">' + $(title).text() + '</a></li>' : '';
      }).join('\n') + '</ul>');
    }
    $toc.find('.nav__link').on('click', _scroll);
  };

  var _scroll = function (e) {
    var target = $(this.hash);
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 400);
      return false;
    }
  };

  return {
    init: _initialize
  };

})(jQuery);
