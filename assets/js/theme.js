var setTheme = function (theme) {
  document.querySelectorAll('[data-theme-value]').forEach(function (el) {
    el.classList.remove('active')
  })

  var btnToActive = document.querySelector('[data-theme-value="' + theme + '"]')

  if ('light' == theme) {
    document.querySelector('#theme-dropdown').innerHTML = '<i class="bi bi-sun-fill"></i>'
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#fafafa');
  } else if ('dark' == theme) {
    document.querySelector('#theme-dropdown').innerHTML = '<i class="bi bi-moon-stars-fill"></i>'
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#121212');
  } else if ('default' == theme) {
    document.querySelector('#theme-dropdown').innerHTML = '<i class="bi bi-star-fill"></i>'
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  '#201b3b');
  }

  btnToActive.classList.add('active')
}

function toggleExampleVisibility(theme) {
  if ('dark' == theme || 'default' == theme) {
    $('#example-light').hide();
    $('#example-dark').show();
  } else {
    $('#example-light').show();
    $('#example-dark').hide();
  }
}

$(function () {
  toggleExampleVisibility($('html').data('theme'))

  if (activeTheme) {
    setTheme(activeTheme)
  }

  document.querySelectorAll('[data-theme-value]')
    .forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var theme = this.getAttribute('data-theme-value')

        setTheme(theme)
        toggleExampleVisibility(theme)

        if (theme === 'auto') {
          root.removeAttribute('data-theme')
          localStorage.removeItem('theme')
          checkSystemTheme()
          document.querySelector('#theme-dropdown').innerHTML = '<i class="bi bi-circle-half"></i>'
        } else {
          root.setAttribute('data-theme', theme)
          localStorage.setItem('theme', theme)
        }
      })
    })
});
