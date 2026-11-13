// Renders every page in every locale into dist/.
// English goes to the root so already-indexed URLs keep working.
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import * as chrome from './chrome.mjs';
import * as pages from './pages.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
// GitHub Pages for this repo publishes the branch root via the legacy
// builder (the Actions workflow is disabled), so the rendered pages must
// live at the root and be committed. Sources are build/ content/ css/ js/.
const DIST = ROOT;
const { LOCALES, SITE, url } = chrome;

const warnings = [];

/** Keys every locale shares on purpose — company name, UID, email. Warning
 *  about these would bury the gaps that actually need a translator. */
const SHARED = new Set(['brand.name', 'brand.full', 'brand.uid', 'brand.email']);

/** Deep-merge a locale over English. Any key a translation omits falls back
 *  to English, and the gap is reported rather than silently shipped. */
function merge(en, loc, path = '') {
  if (loc === undefined || loc === null) {
    if (path && !SHARED.has(path)) warnings.push(path);
    return en;
  }
  if (Array.isArray(en)) {
    if (!Array.isArray(loc)) { warnings.push(path + ' (type)'); return en; }
    if (loc.length !== en.length) warnings.push(`${path} (length ${loc.length}/${en.length})`);
    return en.map((item, i) => merge(item, loc[i], `${path}[${i}]`));
  }
  if (en && typeof en === 'object') {
    const out = {};
    for (const k of Object.keys(en)) out[k] = merge(en[k], loc?.[k], path ? `${path}.${k}` : k);
    return out;
  }
  return loc;
}

/** Retired page URLs and the home-page section each one now points to.
 *  Every locale gets a stub, so old links and search results still land on
 *  the right content. '' means the top of the page. */
const STUBS = {
  'about.html': 'about', 'services.html': 'services', 'projects.html': 'work',
  'involvement.html': 'involvement', 'contact.html': 'contact', 'blog.html': '',
};

async function main() {
  const en = (await import('../content/site.en.js')).default;
  const raw = {};
  for (const l of LOCALES) {
    raw[l] = l === 'en' ? en
      : existsSync(`${ROOT}content/site.${l}.js`)
        ? (await import(`../content/site.${l}.js`)).default
        : null;
  }
  // Locales with real content get hreflang; a missing file does not.
  const translated = LOCALES.filter(l => raw[l]);

  // Remove only previously generated output — never the sources.
  for (const d of ['de', 'fr']) await rm(DIST + d, { recursive: true, force: true });
  for (const f of [...Object.values(en.pages).map(p => p.file), ...Object.keys(STUBS), 'sitemap.xml']) {
    await rm(DIST + f, { force: true });
  }

  const written = [];

  for (const l of translated) {
    warnings.length = 0;
    const t = l === 'en' ? en : merge(en, raw[l]);
    t.locale = l;
    t.htmlLang = raw[l].htmlLang || l;

    for (const [key, render] of Object.entries({ index: pages.index, impressum: pages.impressum })) {
      const page = t.pages[key];
      const html = chrome.head(t, page, l, translated)
        + chrome.header(t, page, l, translated)
        + `\n<main id="main">\n` + render(t, l) + `\n</main>\n`
        + chrome.footer(t, page, l)
        + chrome.scripts(key === 'index' ? FORMSPREE : '');
      await out(l, page.file, html);
      written.push(url(l, page.file));
    }

    for (const [file, id] of Object.entries(STUBS)) await out(l, file, stub(t, l, id));

    if (warnings.length) {
      const shown = [...new Set(warnings)].slice(0, 8);
      console.log(`  ${l}: ${warnings.length} key(s) fell back to English` +
        (shown.length ? ` — e.g. ${shown.join(', ')}` : ''));
    }
  }

  // 404 — English only; GitHub Pages serves /404.html for every path.
  {
    const page = en.pages.notfound;
    await out('en', page.file,
      chrome.head(en, page, 'en', ['en']) + chrome.header(en, page, 'en', ['en'], translated)
      + `\n<main id="main">\n` + pages.notfound(en, 'en') + `\n</main>\n`
      + chrome.footer(en, page, 'en') + chrome.scripts());
  }

  await writeFile(DIST + 'sitemap.xml', sitemap(en, translated));

  console.log(`built ${written.length} pages + ${Object.keys(STUBS).length} redirect stubs × locales [${translated.join(', ')}] → repo root`);
}

const FORMSPREE = `<script>
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#contact-form', formId: 'xdeonbpe' });
</script>
<script src="https://unpkg.com/@formspree/ajax@1" defer></script>
`;

/** A retired URL: an immediate meta refresh to its section on the home
 *  page, a canonical pointing there, and noindex so it drops out of search. */
function stub(t, locale, id) {
  const target = url(locale, 'index.html') + (id ? '#' + id : '');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="robots" content="noindex">
<title>${t.pages.index.title}</title>
<link rel="canonical" href="${SITE}${target}">
<meta http-equiv="refresh" content="0; url=${target}">
</head>
<body>
<p><a href="${target}">${t.pages.index.title}</a></p>
</body>
</html>
`;
}

async function out(locale, file, html) {
  const rel = (locale === 'en' ? '' : locale + '/') + file;
  const path = DIST + rel;
  await mkdir(path.slice(0, path.lastIndexOf('/')), { recursive: true });
  await writeFile(path, html);
}

// Only real pages: index and impressum per locale. Stubs and the 404 are left out.
function sitemap(en, translated) {
  const files = Object.values(en.pages).filter(p => p.file !== '404.html').map(p => p.file);
  const rows = [];
  for (const f of files) {
    for (const l of translated) {
      const alts = translated.map(a =>
        `    <xhtml:link rel="alternate" hreflang="${a}" href="${chrome.abs(a, f)}"/>`).join('\n');
      rows.push(`  <url>\n    <loc>${chrome.abs(l, f)}</loc>\n${alts}\n    <lastmod>2026-11-13</lastmod>\n  </url>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows.join('\n')}\n</urlset>\n`;
}

main().catch(e => { console.error(e); process.exit(1); });
