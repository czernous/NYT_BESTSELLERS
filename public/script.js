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
const seen = {};
$('.book').each(function () {
  const txt = $(this).attr('data-title');
  if (seen[txt]) $(this).remove();
  else seen[txt] = true;
});

// footer date
const $date = new Date();
const $currentYear = $date.getFullYear();
$('.current-year').text($currentYear);
