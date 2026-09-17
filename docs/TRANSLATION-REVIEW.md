# Translation review

The German and French copy on this site was produced by Claude and **has not
been read by a native speaker**. It is live-quality in structure and
terminology, but a consultancy's public site is exactly where an awkward
register costs credibility. This file lists what to check, in priority order.

## Read these first

| Priority | What | Why |
|---|---|---|
| **1** | `content/site.de.js` → `pages.impressum` | Legal text. A mistranslated liability or VAT clause is worse than an English-only page. Consider a professional translation, or keeping the Impressum German-only as the legally authoritative version. |
| **1** | `content/site.fr.js` → `pages.impressum` | Same. `Art. 10 LTVA` is the French counterpart of `Art. 10 MWSTG` — confirm. |
| **2** | `pages.index.display` / `lead` / `practiceBody` | The first screen. Register matters most here. |
| **2** | `pages.services.pillars` and `faq` | Sales copy; the FAQ answers are the longest prose in either language. |
| **3** | `pages.about.bgBody`, `career[].desc` | Job titles were left in English where they are used in English in Switzerland (`Head of Development`, `Technical Manager`, `Business Analyst`). Change if you prefer German/French equivalents. |
| **4** | Everything else | Labels, nav, buttons — short and low-risk. |

## Conventions applied

- **German uses Swiss orthography**: `ss`, never `ß` (`grösster`, `Ausserhalb`).
- `htmlLang` is `de-CH` / `fr-CH`, so browsers apply Swiss conventions.
- Currency, UID and address formats left as-is.
- Product and org names untranslated: BIRD, FHIR, SDMX, Eclipse EFBT,
  BIRDBench, consultaition, Swiss Law Collection.
- French uses typographic apostrophes (’) and non-breaking spaces are *not*
  used before `?`/`:` — add them if you want strict French typography.

## Journal articles are English-only

The three articles (~4,500 words) are deliberately **not** translated. The
journal page carries a one-line note in DE/FR (`pages.blog.englishOnlyNote`),
and `hreflang` is emitted only for locales that genuinely have the page — so
the site never claims coverage it lacks. Translating them is a separate
decision; if you want it, the articles live in `content/articles/*.html`.

## How the fallback works

`build/build.mjs` deep-merges each locale over English. Any key a translation
omits falls back to English **and the build prints a warning naming the key**.
Both DE and FR currently build with zero warnings, so nothing is silently
falling back. Company name, UID and email are shared on purpose and exempt.

## Soft hyphens

Long German compounds in the uppercase display type need an explicit `&shy;`
— `Daten&shy;infrastruktur`. `hyphens:auto` is set, but it depends on the
browser shipping a German hyphenation dictionary and many do not, so the soft
hyphen is the reliable mechanism. If you add German copy with a compound
longer than ~13 characters to a `display` or `title` field, insert `&shy;` at
the natural break.

## Editing

```bash
node build/build.mjs   # renders dist/
node build/check.mjs   # fails on a broken contract, link or locale
node build/contrast.mjs
cd dist && python3 -m http.server 8080
```

**Never translate**: `file` values, URLs, or the form field `name` attributes
(`name`, `email`, `subject`, `message`). Translating a field name leaves the
contact form looking perfect while silently dropping every message.
`build/check.mjs` fails the build if that happens.
