/* Colour theme. The <head> snippet has already applied any stored choice
   before first paint; this only wires the toggle. */
(function () {
  var KEY = 'ada-theme';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function current() {
    var s = stored();
    if (s === 'dark' || s === 'light') return s;
    return systemDark() ? 'dark' : 'light';
  }

  function init() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;

    btn.setAttribute('aria-pressed', String(current() === 'dark'));

    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      btn.setAttribute('aria-pressed', String(next === 'dark'));
      try { localStorage.setItem(KEY, next); } catch (e) {}
    });

    // Follow the OS while the visitor has expressed no preference.
    if (!stored() && window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () {
        if (stored()) return;
        document.documentElement.removeAttribute('data-theme');
        btn.setAttribute('aria-pressed', String(systemDark()));
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
