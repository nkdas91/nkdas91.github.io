var setTheme = function (theme) {
  document.querySelectorAll('[data-theme-value]').forEach(function (el) {
    el.classList.remove('active')
  })

  var btnToActive = document.querySelector('[data-theme-value="' + theme + '"]')

  if ('light' == theme) {
    document.querySelector('#theme-dropdown').innerHTML = '<i class="bi bi-sun-fill"></i>'
  } else if ('dark' == theme) {
    document.querySelector('#theme-dropdown').innerHTML = '<i class="bi bi-moon-stars-fill"></i>'
  } else if ('default' == theme) {
    document.querySelector('#theme-dropdown').innerHTML = '<i class="bi bi-star-fill"></i>'
  }

  btnToActive.classList.add('active')
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
  if (activeTheme) {
    setTheme(activeTheme)
  }

  document.querySelectorAll('[data-theme-value]')
    .forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        var theme = this.getAttribute('data-theme-value')

        setTheme(theme)
        toggleExampleVisibility($('html').data('theme'))

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
