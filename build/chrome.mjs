// Shared page chrome: head, header, menu panel, footer, share row.
// Every URL is root-relative, which keeps /de/ and /blog/ depth-agnostic.

export const SITE = 'https://www.arfa.digital';
export const LOCALES = ['en', 'de', 'fr'];

export const FONTS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500'
  + '&family=JetBrains+Mono:wght@500'
  + '&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;1,6..72,300'
  + '&display=swap';

/** Root-relative URL for `file` in `locale`. English lives at the root so
 *  every already-indexed URL keeps working. */
export const url = (locale, file) =>
  (locale === 'en' ? '/' : `/${locale}/`) + (file === 'index.html' ? '' : file);

export const abs = (locale, file) => SITE + url(locale, file);

/** Theme bootstrap. Runs before first paint so a dark-mode phone never
 *  flashes white. Wrapped in try/catch: localStorage throws in some
 *  private-browsing modes and a theme preference is not worth a crash. */
const THEME_BOOT = `<script>(function(){try{var t=localStorage.getItem('ada-theme');`
  + `if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t);}`
  + `catch(e){}document.documentElement.classList.add('js');})();</script>`;

export function head(t, page, locale, translated) {
  const file = page.file;
  const canonical = abs(locale, file);
  const alts = translated
    .map(l => `<link rel="alternate" hreflang="${l}" href="${abs(l, file)}">`)
    .join('\n');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${page.description}">
<meta name="author" content="Benjamin Arfa">
<title>${page.title}</title>
<link rel="canonical" href="${canonical}">
${alts}
<link rel="alternate" hreflang="x-default" href="${abs('en', file)}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/site.css">
${THEME_BOOT}
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#E9E7E1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#151B2A" media="(prefers-color-scheme: dark)">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/og-image.svg">
<meta property="og:site_name" content="${t.brand.full}">
<meta property="og:locale" content="${locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${page.title}">
<meta name="twitter:description" content="${page.description}">
<meta name="twitter:image" content="${SITE}/og-image.svg">
</head>
<body>

<a class="skip-link" href="#main">${t.ui.skip}</a>
`;
}

export function header(t, page, locale, pageLocales, allLocales = pageLocales) {
  const L = f => url(locale, f);
  const langPills = allLocales.map(l => {
    const has = pageLocales.includes(l);
    const target = has ? url(l, page.file) : url(l, 'index.html');
    const cur = l === locale ? ' aria-current="true"' : '';
    return `<a class="pill pill--lang" href="${target}" lang="${l}"${cur}>${l.toUpperCase()}</a>`;
  }).join('');
  const langNav = `<nav class="lang-switch" aria-label="${t.ui.language}">${langPills}</nav>`;

  return `
<header class="site-header">
  <div class="wrap header-inner">
    <div class="pill-group pill-group--start">
      <button class="pill" data-menu-open aria-expanded="false" aria-controls="menu-panel">${t.nav.menu}</button>
      <a class="pill" href="${L('services.html')}">${t.nav.services}</a>
      <a class="pill" href="${L('projects.html')}">${t.nav.work}</a>
    </div>
    <a class="wordmark" href="${L('index.html')}">
      <span class="wordmark-name">${t.brand.name}</span>
      <span class="wordmark-sub">${t.brand.sub}</span>
    </a>
    <div class="pill-group pill-group--end">
      ${langNav}
      <button class="pill pill--icon" data-theme-toggle aria-label="${t.ui.toggleTheme}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <path class="icon-sun" d="M12 4V2M12 22v-2M4 12H2M22 12h-2M6 6 4.5 4.5M19.5 19.5 18 18M18 6l1.5-1.5M4.5 19.5 6 18"/>
          <circle class="icon-sun" cx="12" cy="12" r="4"/>
          <path class="icon-moon" d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/>
        </svg>
      </button>
      <a class="pill pill--solid" href="${L('contact.html')}">${t.nav.enquire}</a>
    </div>
  </div>
</header>

<div class="menu-backdrop" id="menu-backdrop"></div>
<aside class="menu-panel" id="menu-panel" aria-label="${t.nav.menu}">
  <div class="menu-head">
    <span class="label label--faint">${t.nav.menu}</span>
    <button class="menu-close" data-menu-close aria-label="${t.ui.closeMenu}">&times;</button>
  </div>
  <div class="menu-body">
    <div class="menu-links"><a href="${L('index.html')}">${t.menu.home}</a></div>
    <div>
      <p class="menu-group-label">${t.menu.practice}</p>
      <div class="menu-links">
        <a href="${L('about.html')}">${t.nav.about}</a>
        <a href="${L('services.html')}">${t.nav.services}</a>
        <a href="${L('involvement.html')}">${t.menu.involvement}</a>
      </div>
    </div>
    <div>
      <p class="menu-group-label">${t.menu.workGroup}</p>
      <div class="menu-links">
        <a href="${L('projects.html')}">${t.menu.projects}</a>
        <a href="${L('blog.html')}">${t.menu.journal}</a>
        <p class="note">${t.menu.note}</p>
      </div>
    </div>
    <div>
      <p class="menu-group-label">${t.menu.elsewhere}</p>
      <div class="menu-links">
        <a href="https://github.com/benjamin-arfa" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/in/moadhbenjaminarfa" target="_blank" rel="noopener">LinkedIn</a>
        <a href="${L('impressum.html')}">${t.menu.impressum}</a>
      </div>
    </div>
  </div>
  <div class="menu-foot">
    <div class="menu-lang">${langNav}</div>
    <a class="btn btn--solid" href="${L('contact.html')}">${t.menu.enquireNow}</a>
  </div>
</aside>
`;
}

/** Share row. URLs are baked at build time — the one thing client-side
 *  rendering would have had to compute at runtime. */
export function shareRow(t, page, locale) {
  const u = abs(locale, page.file);
  const enc = encodeURIComponent(u);
  const subject = encodeURIComponent(page.title);
  const body = encodeURIComponent(`${page.title}\n${u}`);
  return `
    <div class="share-row">
      <span class="label label--faint">${t.ui.share}</span>
      <a class="share-link" href="https://www.linkedin.com/sharing/share-offsite/?url=${enc}"
         target="_blank" rel="noopener">${t.ui.shareLinkedIn}</a>
      <a class="share-link" href="mailto:?subject=${subject}&amp;body=${body}">${t.ui.shareEmail}</a>
      <button class="share-link" data-copy-link data-copied="${t.ui.copied}">${t.ui.copyLink}</button>
    </div>`;
}

export function footer(t, page, locale) {
  const L = f => url(locale, f);
  return `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <h4>${t.brand.full}</h4>
        <p>${t.footer.blurb}</p>
      </div>
      <div>
        <h4>${t.footer.colPractice}</h4>
        <ul>
          <li><a href="${L('about.html')}">${t.nav.about}</a></li>
          <li><a href="${L('services.html')}">${t.nav.services}</a></li>
          <li><a href="${L('involvement.html')}">${t.menu.involvement}</a></li>
        </ul>
      </div>
      <div>
        <h4>${t.footer.colWork}</h4>
        <ul>
          <li><a href="${L('projects.html')}">${t.menu.projects}</a></li>
          <li><a href="${L('blog.html')}">${t.menu.journal}</a></li>
          <li><a href="https://github.com/benjamin-arfa" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </div>
      <div>
        <h4>${t.footer.colContact}</h4>
        <ul>
          <li><a href="mailto:${t.brand.email}">${t.brand.email}</a></li>
          <li><a href="https://linkedin.com/in/moadhbenjaminarfa" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="${L('impressum.html')}">${t.menu.impressum}</a></li>
        </ul>
      </div>
    </div>
${shareRow(t, page, locale)}
    <div class="footer-base">
      <span>&copy; 2026 ${t.brand.full} &middot; ${t.footer.rights} &middot; <span class="mono">${t.brand.uid}</span></span>
      <span>${t.brand.location}</span>
    </div>
  </div>
</footer>
`;
}

export const scripts = (extra = '') => `
<script src="/js/theme.js"></script>
<script src="/js/reveal.js"></script>
<script src="/js/menu.js"></script>
<script src="/js/accordion.js"></script>
<script src="/js/main.js"></script>
${extra}</body>
</html>
`;

// ---- small shared partials -----------------------------------------

export const pageHead = (page) => `
<section class="section section--tight">
  <div class="wrap grid">
    <div class="col-1-7">
      <p class="eyebrow" data-reveal>${page.eyebrow}</p>
      <h1 class="title" data-reveal>${page.pageTitle}</h1>
    </div>
    <div class="col-4-7" style="margin-top:var(--s-6)">
      <p class="lead" data-reveal>${page.sub}</p>
    </div>
  </div>
</section>
<hr class="rule">
`;

export const invertBand = (quote, attr) => `
<section class="section section--invert">
  <div class="wrap grid">
    <div class="col-3-7">
      <p class="pullquote" data-reveal>${quote}</p>
      <p class="pullquote-attr label label--faint" data-reveal>${attr}</p>
    </div>
  </div>
</section>
`;

export const cta = (t, locale, heading, body) => `
<section class="section">
  <div class="wrap grid">
    <div class="col-1-4">
      <p class="label label--faint" data-reveal>${t.ui.getInTouch}</p>
      <h2 data-reveal style="margin-top:var(--s-4)">${heading}</h2>
    </div>
    <div class="col-4-7">
      <p data-reveal>${body}</p>
      <div class="actions" data-reveal>
        <a class="btn btn--solid" href="${url(locale, 'contact.html')}">${t.ui.startConversation}</a>
        <a class="btn btn--ghost" href="mailto:${t.brand.email}">${t.brand.email}</a>
      </div>
    </div>
  </div>
</section>
`;

export const sec = (num, label, heading, inner, band = false) => `
<section class="section${band ? ' section--band' : ''}">
  <div class="wrap grid">
    <div class="col-1-3"><p class="label label--faint" data-reveal>${num ? num + ' &mdash; ' : ''}${label}</p></div>
    <div class="col-3-7"><h2 data-reveal>${heading}</h2></div>
    <div class="col-1-7" style="margin-top:var(--s-8)">
${inner}
    </div>
  </div>
</section>
`;

export const tags = (list) => list.map(x => `<span class="tag">${x}</span>`).join('');
export const details = (rows) => rows.length ? `<div class="detail-list" style="margin-top:var(--s-5)">${
  rows.map(r => `<div class="detail-row"><span class="k">${r.k}</span><span class="v">${r.v}</span></div>`).join('')
}</div>` : '';
