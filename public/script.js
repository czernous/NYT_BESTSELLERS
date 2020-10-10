// fake authentication
$(document).ready(function () {
  $('#submit').click(function (e) {
    const ValidEmail = $('#username').val() === '123';
    const ValidPassword = $('#password').val() === '123';
    e.preventDefault();
    if (ValidEmail === true && ValidPassword === true) {
      (() => {
        $('.error').css('display', 'none');
        $('.valid').css('display', 'block');
      })();
      //   simulate delay
      window.location = '/books';
    } else {
      $('.error').css('display', 'block'); // show error msg
    }
  });
});

// remove duplicate books
(function ($) {
  $.fn.removeDuplicates = function () {
    let $original = $([]);

    this.each(function (i, el) {
      const $el = $(el);
      let isDuplicate;

      $original.each(function (i, orig) {
        if (el.isEqualNode(orig)) {
          isDuplicate = true;
          $el.remove();
        }
      });

      if (!isDuplicate) {
        $original = $original.add($el);
      }
    });

    return $original;
  };
})(jQuery);

$('.books').ready($('.book').removeDuplicates());

// footer date
const $date = new Date();
const $currentYear = $date.getFullYear();
$('.current-year').text($currentYear);
