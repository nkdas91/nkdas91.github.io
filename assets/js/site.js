(() => {
  'use strict'

  const url = window.location.href;
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('#site-home-top-nav .nav-link'));

  navLinks.forEach(nl => {
    if (url.indexOf(nl.href) > -1) {
      nl.classList.add('active');
    }
  })

})()
