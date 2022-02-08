function setActiveShape(theme) {
  $('.m-shape-container').removeClass('active');
  $('.theme-selector[data-theme=' + theme + ']').closest('.m-shape-container').addClass('active');
}

function toggleExampleVisibility(theme) {
  if ('light' == theme) {
    $('#example-light').show();
    $('#example-dark').hide();
  } else {
    $('#example-light').hide();
    $('#example-dark').show();
  }
}

$(function () {
  if ('default' === $('html').data('theme')) {
    $('#theme-default').attr('checked', 'true');
  } else if ('light' === $('html').data('theme')) {
    $('#theme-light').attr('checked', 'true');
  } else {
    $('#theme-dark').attr('checked', 'true');
  }

  setActiveShape($('html').data('theme'));
  toggleExampleVisibility($('html').data('theme'));

  $('.theme-selector').click(function () {
    $('html').data('theme', $(this).data('theme')).attr('data-theme', $(this).data('theme'));
    localStorage.setItem('theme', $(this).data('theme'));
    setActiveShape($(this).data('theme'));
    toggleExampleVisibility($(this).data('theme'));
  });
});
