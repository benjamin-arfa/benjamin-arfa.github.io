# arfa.digital — editorial redesign

> The redesign shipped (PR #2). This file now tracks the follow-on work:
> grid removal, dark mode, i18n and sharing. See TRANSLATION-REVIEW.md.

Status as of 2026-09-17. Branch `claude/arfa-website-redesign-plan-bljh62`.
Never pushed to `main` — promoting to production is the owner's call.

## Done

- [x] A1–A5 foundation: tokens, base, components, reveal / menu / accordion JS
- [x] B1–B2 chrome: column-grid overlay, centred-wordmark header, slide-in panel, footer
- [x] C1–C8 all 12 pages rebuilt on the new system
- [x] D1 swiss-law-as-source · D2 consultaition · D3 BIRD Software Solutions,
      fhir.ch, hl7.ch · D4 homepage features
- [x] E1 legacy `style.css` + theme toggle deleted · E2 favicon/OG redrawn ·
      E3 manifest, sitemap, metadata
- [x] F1 accessibility: axe-core reports **0 serious/critical** across all 12 pages

## Verified locally

| Check | Result |
|---|---|
| Formspree contract vs `main` | form structure, field names, all `data-fs-*` hooks, bootstrap and script tag **identical** |
| Horizontal scroll @ 390 / 768 / 1440 | none on any page |
| `prefers-reduced-motion: reduce` | all content immediately visible |
| JavaScript disabled | all content visible; accordion panels open |
| Menu panel | opens, traps focus, closes on Esc |
| Internal links | 0 broken |
| Contrast (computed) | ink 11.53:1 · ink-soft 6.15:1 · ink-faint 4.91:1 worst-case |
| Legacy references | 0 hits for `style.css`, `ada-theme`, `theme-btn`, `data-theme` |

## Blocked — needs Benjamin

1. **BIRD Software Solutions website URL.** The request was for a link to the
   website; I could not determine it, so the entry currently links the GitHub
   org `github.com/BIRD-Software-Solutions`. Supply the real URL to swap in.
   Also confirm the legal name — the old timeline said `BirdSoftwareSolutions`,
   I normalised it to `BIRD Software Solutions`.
2. **Live Formspree submission untested.** `unpkg.com` and `formspree.io` are
   both blocked by this environment's egress proxy, so the AJAX library cannot
   load here and no real message could be sent. Submit a test from a normal
   browser and confirm the mail arrives before promoting to `main`.
3. **`action`/`method` fallback is untested** for the same reason. It should be
   inert whenever the AJAX script loads. If the live test misbehaves, removing
   those two attributes restores the exact previous behaviour.
4. **External links unverified** — egress is blocked, so `fhir.ch`,
   `consultaition.ch`, `cmda.world`, `eseha.ch` and the GitHub URLs were not
   fetched. `fhir.ch` in particular is asserted to be the Swiss FHIR IG home.
5. **`consultaition` copy** was written from the previous site's own text, not
   from its source. If it is similarly under-described, it is worth the same
   pass the Swiss Law Collection entry just had.

## Verified from source

**Swiss Law Collection** (`swiss-law-as-source.github.io`). The rendered URL is
egress-blocked, but it is a GitHub Pages repo, so the content was read from an
anonymous clone of `swiss-law-as-source/swiss-law-as-source.github.io`.

The first draft of this entry was guesswork and was wrong: it used the host name
as the project name, described it as "version-controlled source data", and
credited a law-as-code approach "developed through the Open Legal Lab" — an
attribution that was invented and has been removed. Corrected to the facts in
the repo:

| | |
|---|---|
| Name | Swiss Law Collection |
| Scale | 34,443 acts, 824,663 articles, Confederation + 26 cantons |
| Formats | JSON, CSV, SDMX — static read-only API off GitHub Pages |
| Sources | Fedlex (federal), LexFind (cantonal) |
| Provenance | published verification report reconciling against BADAC and chstat |
| Pipeline | `github.com/benjamin-arfa/swiss-law` |

The site repo carries `© 2024-2026 Arfa Digital Consulting`.

## Second pass — grid, dark mode, i18n, sharing

- [x] Visible column-grid overlay removed (`.grid-lines`); the invisible
      6-track layout grid stays
- [x] Dark mode: follows `prefers-color-scheme`, toggle overrides and
      persists, applied pre-paint so there is no white flash
- [x] Inverted bands flip per theme — navy-on-bone in light, bone-on-navy
      in dark — so the light/dark rhythm survives both
- [x] English / German / French, rendered **at build time** to `/`, `/de/`,
      `/fr/` so shared links preview correctly (crawlers do not run JS)
- [x] Share row (LinkedIn · Email · Copy link) in the footer of every page,
      with per-page per-locale URLs baked in at build time
- [x] Content moved to `content/site.{en,de,fr}.js`
- [x] `build/check.mjs` gates the deploy on the Formspree contract, locale
      completeness, internal links and metadata

## Optional polish

- [ ] Replace the SVG `og-image` with a PNG — several platforms will not render
      SVG social cards
- [ ] Per-article dates and reading times on the journal
- [ ] German / French versions

## Formspree contract (do not break)

- `#contact-form`, form id `xdeonbpe`
- `https://unpkg.com/@formspree/ajax@1` + `formspree('initForm', …)` bootstrap
- fields: `name`, `email`, `subject`, `message`
- hooks: `data-fs-field`, `data-fs-error="<field>"`, `data-fs-success`,
  `data-fs-error`, `data-fs-submit-btn`

## Design notes

Palette `#E9E7E1` bone / `#1F2A44` navy, single fixed theme, no toggle.
`--accent` `#8A6A3B` is non-text only (4.04:1): link underline on hover, the
availability dot, active nav mark. Type is Newsreader (uppercase display,
italic eyebrows) + Inter (labels, body); JetBrains Mono survives only for the
UID and the `pip install` string. The visible column grid is a fixed hairline
overlay whose track count matches the content grid — six columns, four below
820px, three below 520px.
