/* ARFA DIGITAL — theme toggle + interactions (no pixel art) */

const THEME_KEY = 'ada-theme';

function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  const btn = document.querySelector('.theme-btn');
  if(btn) btn.textContent = t === 'light' ? '◑' : '◐';
}

function initTheme(){
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
  const btn = document.querySelector('.theme-btn');
  if(btn) btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      if(!id) return;
      const el = document.getElementById(id);
      if(!el) return;
      e.preventDefault();
      window.scrollTo({top: el.offsetTop - 70, behavior:'smooth'});
    });
  });
}

function initBlogFilters(){
  const buttons = document.querySelectorAll('.blog-filter button');
  if(!buttons.length) return;
  buttons.forEach(b => b.addEventListener('click', () => {
    const filter = b.dataset.filter;
    buttons.forEach(x => x.classList.toggle('active', x === b));
    document.querySelectorAll('.post[data-categories]').forEach(post => {
      const cats = (post.dataset.categories || '').split(' ');
      post.style.display = (filter === 'all' || cats.includes(filter)) ? '' : 'none';
    });
  }));
}

function initBlogSearch(){
  const input = document.getElementById('blog-search');
  if(!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('.post').forEach(post => {
      post.style.display = (q === '' || post.innerText.toLowerCase().includes(q)) ? '' : 'none';
    });
  });
}

function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if(q) q.addEventListener('click', () => item.classList.toggle('open'));
  });
}

function initSkillsFilter(){
  const buttons = document.querySelectorAll('.skills-filter button');
  if(!buttons.length) return;
  buttons.forEach(b => b.addEventListener('click', () => {
    const filter = b.dataset.filter;
    buttons.forEach(x => x.classList.toggle('active', x === b));
    document.querySelectorAll('.skill-col').forEach(col => {
      col.style.display = (filter === 'all' || col.dataset.category === filter) ? '' : 'none';
    });
  }));
}

function initCopyLink(){
  document.querySelectorAll('[data-copy-link]').forEach(el => {
    const label = el.textContent;
    el.addEventListener('click', e => {
      e.preventDefault();
      if(!navigator.clipboard) return;
      navigator.clipboard.writeText(location.href).then(() => {
        el.textContent = 'Copied \u2713';
        setTimeout(() => { el.textContent = label; }, 1600);
      }, () => {});
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSmoothScroll();
  initBlogFilters();
  initBlogSearch();
  initFAQ();
  initSkillsFilter();
  initCopyLink();
});
