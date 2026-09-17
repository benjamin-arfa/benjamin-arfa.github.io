/* Reveal on scroll.
   Elements are visible in CSS and hidden here on init, so visitors
   without JavaScript get the full page rather than a blank one. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  function init() {
    // Normally already set by the inline snippet in <head>; harmless here.
    document.documentElement.classList.add('js');

    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (reduce.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    // Stagger siblings that share a parent.
    var seen = new Map();
    items.forEach(function (el) {
      var p = el.parentNode;
      var n = seen.get(p) || 0;
      el.style.setProperty('--i', String(Math.min(n, 6)));
      seen.set(p, n + 1);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    items.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
