// Post-build assertions. Non-zero exit fails the deploy, so a bad
// translation or a stray refactor cannot reach production.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, dirname, resolve } from 'node:path';

const DIST = new URL('../', import.meta.url).pathname;
const SKIP = new Set(['content', 'build', 'docs', 'node_modules', '.git', '.github']);
const fails = [];
const fail = (m) => fails.push(m);

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name)) await walk(p, out); }
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

// The Formspree contract. Translating a field `name` attribute would leave
// the form looking fine while silently dropping every message — which is
// exactly the mistake a translator would make, so it is enforced here.
const REQUIRED_HOOKS = [
  'id="contact-form"', 'formId: \'xdeonbpe\'', 'https://unpkg.com/@formspree/ajax@1',
  'data-fs-success', 'data-fs-error', 'data-fs-field', 'data-fs-submit-btn',
];
const REQUIRED_NAMES = ['name="name"', 'name="email"', 'name="subject"', 'name="message"'];

const files = await walk(DIST);
console.log(`checking ${files.length} built pages`);

for (const f of files) {
  const rel = relative(DIST, f);
  const s = await readFile(f, 'utf8');

  // 1. Formspree contract on every contact page, in every locale.
  if (rel.endsWith('contact.html')) {
    for (const h of REQUIRED_HOOKS) if (!s.includes(h)) fail(`${rel}: missing Formspree hook ${h}`);
    for (const n of REQUIRED_NAMES) if (!s.includes(n)) fail(`${rel}: field ${n} was altered or translated`);
    const fieldCount = (s.match(/data-fs-field/g) || []).length;
    if (fieldCount !== 4) fail(`${rel}: expected 4 data-fs-field, found ${fieldCount}`);
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

  // 6. Internal links resolve within the built output.
  for (const href of s.match(/href="\/[^"#]*"/g) || []) {
    const p = href.slice(6, -1);
    if (!p || p.endsWith('/')) continue;
    const target = resolve(DIST, '.' + p);
    if (!existsSync(target)) fail(`${rel}: dead internal link ${p}`);
  }
}

// 7. Every locale directory has the full page set.
const expect = ['index.html', 'about.html', 'services.html', 'projects.html',
                'involvement.html', 'contact.html', 'blog.html', 'impressum.html'];
for (const loc of ['', 'de/', 'fr/']) {
  if (loc && !existsSync(DIST + loc)) continue;
  for (const p of expect) {
    if (!existsSync(DIST + loc + p)) fail(`missing ${loc || './'}${p}`);
  }
}
if (!existsSync(DIST + '404.html')) fail('missing 404.html');
if (!existsSync(DIST + 'CNAME')) fail('missing CNAME — the custom domain would break');
if (!existsSync(DIST + '.nojekyll')) fail('missing .nojekyll — the branch builder would run Jekyll over the output');

if (fails.length) {
  console.error(`\nFAILED (${fails.length}):`);
  for (const f of fails) console.error('  ' + f);
  process.exit(1);
}
console.log('all checks passed');
