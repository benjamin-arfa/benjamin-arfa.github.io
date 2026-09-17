# arfa.digital — editorial redesign

Durable checklist. Source of truth for progress; lives in the repo so it
survives container recycling. Tick a box only after the work is committed.

Branch: `claude/arfa-website-redesign-plan-bljh62` · never pushes to `main`.

## Phase A — foundation
- [ ] A1 tokens: palette, caps/italic type scale, grid vars
- [ ] A2 base: reset, typography, 6-col layout, reveal primitives
- [ ] A3 site: components (header, panel, accordion, pill-nav, cards, form)
- [ ] A4 js/reveal.js — IntersectionObserver, reduced-motion safe
- [ ] A5 js/menu.js + js/accordion.js — focus trap, Esc, aria-expanded

## Phase B — chrome (all pages at once)
- [ ] B1 grid overlay + centred-wordmark header + slide-in panel
- [ ] B2 footer

## Phase C — pages (one commit each)
- [ ] C1 index
- [ ] C2 about
- [ ] C3 services (accordion)
- [ ] C4 projects (pill-nav)
- [ ] C5 involvement
- [ ] C6 contact — FORMSPREE CONTRACT MUST NOT CHANGE
- [ ] C7 blog + blog/*
- [ ] C8 impressum + 404

## Phase D — new content
- [ ] D1 swiss-law-as-source
- [ ] D2 consultaition expanded
- [ ] D3 BIRD Software Solutions + fhir.ch + hl7.ch
- [ ] D4 homepage features

## Phase E — removal
- [ ] E1 delete style.css + theme bootstrap
- [ ] E2 favicon + og-image redraw
- [ ] E3 meta, manifest, sitemap

## Phase F — verification
- [ ] F1 a11y / contrast fixes
- [ ] F2 docs notes

## Formspree contract (do not break)
- `#contact-form`, form id `xdeonbpe`
- `https://unpkg.com/@formspree/ajax@1` + `formspree('initForm', …)` bootstrap
- fields: `name`, `email`, `subject`, `message`
- hooks: `data-fs-field`, `data-fs-error="<field>"`, `data-fs-success`,
  `data-fs-error`, `data-fs-submit-btn`

## Blocked / needs input
_(nothing yet)_

## Flagged for factual review
_(Phase D copy lands here before it is considered done)_
