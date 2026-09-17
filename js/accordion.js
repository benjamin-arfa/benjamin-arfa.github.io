/* Accordion rows. Panels are open in the no-JS case and collapsed here,
   so the content is always reachable without JavaScript. */
(function () {
  function init() {
    var items = document.querySelectorAll('.accordion-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion-trigger');
      var panel = item.querySelector('.accordion-panel');
      if (!trigger || !panel) return;

      var expanded = trigger.getAttribute('aria-expanded') === 'true';
      panel.style.height = expanded ? 'auto' : '0px';

      trigger.addEventListener('click', function () {
        var isOpen = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!isOpen));

        if (isOpen) {
          panel.style.height = panel.scrollHeight + 'px';
          requestAnimationFrame(function () { panel.style.height = '0px'; });
        } else {
          panel.style.height = panel.scrollHeight + 'px';
          panel.addEventListener('transitionend', function once(e) {
            if (e.propertyName !== 'height') return;
            panel.style.height = 'auto';
            panel.removeEventListener('transitionend', once);
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
