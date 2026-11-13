/* ARFA DIGITAL — page interactions */

function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const el = document.getElementById(id);
      if(!el) return;
      e.preventDefault();
      // Page coordinates, not offsetTop: sections are positioned, so a
      // nested target's offsetTop would be relative to its section.
      window.scrollTo({top: el.getBoundingClientRect().top + window.scrollY - 70, behavior:'smooth'});
    });
  });
}

function initCopyLink(){
  document.querySelectorAll('[data-copy-link]').forEach(el => {
    const label = el.textContent;
    // The confirmation string is localised by the build via data-copied.
    const done = el.dataset.copied || 'Copied';
    el.addEventListener('click', e => {
      e.preventDefault();
      if(!navigator.clipboard) return;
      navigator.clipboard.writeText(location.href).then(() => {
        el.textContent = done + ' \u2713';
        setTimeout(() => { el.textContent = label; }, 1600);
      }, () => {});
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initCopyLink();
});
