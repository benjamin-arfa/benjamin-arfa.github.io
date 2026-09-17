/* Slide-in menu panel: toggle, focus trap, Esc to close. */
(function () {
  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function init() {
    var panel = document.getElementById('menu-panel');
    var backdrop = document.getElementById('menu-backdrop');
    var openers = document.querySelectorAll('[data-menu-open]');
    var closers = document.querySelectorAll('[data-menu-close]');
    if (!panel || !backdrop || !openers.length) return;

    var lastFocused = null;

    function open() {
      lastFocused = document.activeElement;
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
      panel.removeAttribute('inert');
      openers.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
      document.body.style.overflow = 'hidden';
      var first = panel.querySelector(FOCUSABLE);
      if (first) first.focus();
    }

    function close() {
      panel.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      panel.setAttribute('inert', '');
      openers.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    openers.forEach(function (b) { b.addEventListener('click', open); });
    closers.forEach(function (b) { b.addEventListener('click', close); });
    backdrop.addEventListener('click', close);

    document.addEventListener('keydown', function (e) {
      if (!panel.classList.contains('is-open')) return;

      if (e.key === 'Escape') { close(); return; }

      if (e.key !== 'Tab') return;
      var nodes = Array.prototype.filter.call(
        panel.querySelectorAll(FOCUSABLE),
        function (el) { return el.offsetParent !== null; }
      );
      if (!nodes.length) return;
      var first = nodes[0];
      var last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    panel.setAttribute('inert', '');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
