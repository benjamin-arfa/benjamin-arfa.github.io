# arfa.digital — editorial redesign

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
2. **swiss-law-as-source copy.** Written from the repo name and the Open Legal
   Lab context, **not** verified against its README (that research was stopped
   at your request). Confirm the description is accurate, and whether it has a
   public site URL rather than the GitHub link now used.
3. **Live Formspree submission untested.** `unpkg.com` and `formspree.io` are
   both blocked by this environment's egress proxy, so the AJAX library cannot
   load here and no real message could be sent. Submit a test from a normal
   browser and confirm the mail arrives before promoting to `main`.
4. **`action`/`method` fallback is untested** for the same reason. It should be
   inert whenever the AJAX script loads. If the live test misbehaves, removing
   those two attributes restores the exact previous behaviour.
5. **External links unverified** — egress is blocked, so `fhir.ch`,
   `consultaition.ch`, `cmda.world`, `eseha.ch` and the GitHub URLs were not
   fetched. `fhir.ch` in particular is asserted to be the Swiss FHIR IG home.

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
