// Post-build assertions. Non-zero exit fails the deploy, so a bad
// translation or a stray refactor cannot reach production.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const DIST = new URL('../', import.meta.url).pathname;
const SITE = 'https://www.arfa.digital';
// Sources and tooling; dot-directories (.git, .github, scratch) are skipped too.
const SKIP = new Set(['content', 'build', 'docs', 'node_modules']);
const fails = [];
const fail = (m) => fails.push(m);

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name) && !e.name.startsWith('.')) await walk(p, out); }
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// The Formspree contract. Translating a field `name` attribute would leave
// the form looking fine while silently dropping every message — which is
// exactly the mistake a translator would make, so it is enforced here.
const REQUIRED_HOOKS = [
  'id="contact-form"', 'formId: \'xdeonbpe\'', 'https://unpkg.com/@formspree/ajax@1',
  'action="https://formspree.io/f/xdeonbpe"',
  'data-fs-success', 'data-fs-error', 'data-fs-field', 'data-fs-submit-btn',
];
const REQUIRED_NAMES = ['name="name"', 'name="email"', 'name="subject"', 'name="message"'];

const LOCALE_DIRS = ['', 'de/', 'fr/'];
const HOME = new Set(LOCALE_DIRS.map(d => d + 'index.html'));

// Retired URLs that must stay as redirect stubs in every locale.
const STUBS = ['about.html', 'services.html', 'projects.html', 'involvement.html', 'contact.html', 'blog.html'];

const idCache = new Map();
async function idsOf(file) {
  if (!idCache.has(file)) {
    const s = await readFile(file, 'utf8');
    idCache.set(file, [...s.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  }
  return idCache.get(file);
}

/** A root-relative link with a fragment (`/de/#work`) must reach a built
 *  page that carries that id. */
async function checkTarget(rel, href) {
  const [path, hash = ''] = href.split('#');
  const file = resolve(DIST, '.' + (path.endsWith('/') ? path + 'index.html' : path));
  if (!existsSync(file)) { fail(`${rel}: link ${href} points to a missing page`); return; }
  if (hash && !(await idsOf(file)).includes(hash)) fail(`${rel}: link ${href} has no #${hash} on its page`);
}

const files = await walk(DIST);
console.log(`checking ${files.length} built pages`);

for (const f of files) {
  const rel = relative(DIST, f);
  const s = await readFile(f, 'utf8');

  // 0. Redirect stubs carry no chrome. They must refresh to a section that
  //    exists, point their canonical there, and stay out of the index.
  const refresh = s.match(/<meta http-equiv="refresh" content="0; url=([^"]+)">/);
  if (refresh) {
    const target = refresh[1];
    if (!s.includes('<meta name="robots" content="noindex">')) fail(`${rel}: stub without noindex`);
    if (!s.includes(`<link rel="canonical" href="${SITE}${target}">`)) fail(`${rel}: stub canonical does not match ${target}`);
    await checkTarget(rel, target);
    continue;
  }

  // 1. Formspree contract on the home page, in every locale — exactly one form.
  if (HOME.has(rel)) {
    for (const h of REQUIRED_HOOKS) if (!s.includes(h)) fail(`${rel}: missing Formspree hook ${h}`);
    for (const n of REQUIRED_NAMES) if (!s.includes(n)) fail(`${rel}: field ${n} was altered or translated`);
    const fieldCount = (s.match(/data-fs-field/g) || []).length;
    if (fieldCount !== 4) fail(`${rel}: expected 4 data-fs-field, found ${fieldCount}`);
    const forms = (s.match(/id="contact-form"/g) || []).length;
    if (forms !== 1) fail(`${rel}: expected exactly 1 #contact-form, found ${forms}`);
  }

  // 2. The visible grid overlay must be gone.
  if (s.includes('grid-lines')) fail(`${rel}: still contains grid-lines`);

  // 3. Per-page metadata.
  if (!/<html lang="[a-zA-Z-]+">/.test(s)) fail(`${rel}: missing or malformed <html lang>`);
  if (!s.includes('rel="canonical"')) fail(`${rel}: missing canonical`);
  if (!s.includes('hreflang="x-default"')) fail(`${rel}: missing x-default hreflang`);

  // 4. Theme bootstrap must precede the stylesheets' effect, i.e. be in <head>.
  if (!s.includes("localStorage.getItem('ada-theme')")) fail(`${rel}: missing theme bootstrap`);

  // 5. Share row present.
  if (!s.includes('class="share-row"')) fail(`${rel}: missing share row`);

  // 6. The pointer ships as a pair. The stylesheet alone hides nothing —
  //    cursor.js is what adds `cursor-on` — but shipping the script
  //    without the stylesheet would leave two undrawn divs on the page.
  if (!s.includes('/css/cursor.css')) fail(`${rel}: missing cursor stylesheet`);
  if (!s.includes('/js/cursor.js')) fail(`${rel}: missing cursor script`);

  // 7. Internal links resolve within the built output.
  for (const href of s.match(/href="\/[^"#]*"/g) || []) {
    const p = href.slice(6, -1);
    if (!p || p.endsWith('/')) continue;
    const target = resolve(DIST, '.' + p);
    if (!existsSync(target)) fail(`${rel}: dead internal link ${p}`);
  }

  // 8. Ids are unique, and every in-page or cross-page anchor and every
  //    aria-controls lands on one. A one-page site lives on its anchors.
  const ids = await idsOf(f);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) fail(`${rel}: duplicate id="${id}"`);
    seen.add(id);
  }
  for (const m of s.matchAll(/href="#([^"]+)"/g)) if (!seen.has(m[1])) fail(`${rel}: href="#${m[1]}" has no matching id`);
  for (const m of s.matchAll(/aria-controls="([^"]+)"/g)) if (!seen.has(m[1])) fail(`${rel}: aria-controls="${m[1]}" has no matching id`);
  for (const m of s.matchAll(/href="(\/[^"#]*#[^"]+)"/g)) await checkTarget(rel, m[1]);
}

// 9. Every locale directory has the page set: the home page, the impressum
//    and a stub for each retired URL.
const expect = ['index.html', 'impressum.html', ...STUBS];
for (const loc of LOCALE_DIRS) {
  if (loc && !existsSync(DIST + loc)) continue;
  for (const p of expect) {
    if (!existsSync(DIST + loc + p)) fail(`missing ${loc || './'}${p}`);
  }
}
if (!existsSync(DIST + '404.html')) fail('missing 404.html');
if (!existsSync(DIST + 'CNAME')) fail('missing CNAME — the custom domain would break');
if (!existsSync(DIST + '.nojekyll')) fail('missing .nojekyll — the branch builder would run Jekyll over the output');

// 10. The journal is retired; nothing of it may be published.
for (const p of ['blog', 'feed.xml', 'content/articles']) {
  if (existsSync(DIST + p)) fail(`${p} should not exist — the journal is retired`);
}

if (fails.length) {
  console.error(`\nFAILED (${fails.length}):`);
  for (const f of fails) console.error('  ' + f);
  process.exit(1);
}
console.log('all checks passed');
