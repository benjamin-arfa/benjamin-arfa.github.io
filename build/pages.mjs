// One render function per page. Each takes the resolved locale content `t`
// and returns the <main> body; build.mjs wraps it in chrome.
//
// The site is one page: index() renders every section, and the secondary
// material sits in collapsed accordion rows. Only the impressum and the
// 404 are separate pages.
import { url, anchor, pageHead, invertBand, sec, tags, details } from './chrome.mjs';

const cards = (cls, items) => `      <div class="cards ${cls}">
${items.join('\n')}
      </div>`;

const card = ({ label, h, p, extra = '', href }) => {
  const inner = `
          ${label ? `<p class="label">${label}</p>` : ''}
          <h3>${h}</h3>
          ${p ? `<p>${p}</p>` : ''}
          ${extra ? `<div class="spacer"></div>${extra}` : ''}`;
  return href
    ? `        <a class="card" href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''} data-reveal>${inner}
        </a>`
    : `        <article class="card" data-reveal>${inner}
        </article>`;
};

// A project row: number and role on the left; name, kicker, one short
// paragraph and the link on the right. No tags, no detail rows.
const entry = (e, ctaLabel) => `        <article class="entry" data-reveal id="${e.anchor}">
          <div class="entry-aside">
            <p class="entry-num">${e.n}</p>
            <p class="label label--faint entry-role">${e.role}</p>
          </div>
          <div class="entry-body">
            <h3>${e.h}</h3>
            <p class="kicker">${e.kicker}</p>
            <p>${e.body}</p>
            <div class="entry-foot" style="justify-content:flex-end">
              ${e.href
                ? `<a class="link-arrow" href="${e.href}" target="_blank" rel="noopener">${ctaLabel}</a>`
                : `<span class="label label--faint entry-status">${ctaLabel}</span>`}
            </div>
          </div>
        </article>`;

// Every row starts collapsed. `prefix` keeps the panel ids unique when a
// page carries several accordions. Panel content uses no [data-reveal], so
// an opened row never shows half-revealed children.
const accordion = (prefix, items, style = '') => `      <div class="accordion"${style ? ` style="${style}"` : ''}>
${items.map((it, i) => `        <div class="accordion-item">
          <button class="accordion-trigger" aria-expanded="false" aria-controls="acc-${prefix}-${i + 1}">
            <span>${it.label}</span><span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-panel" id="acc-${prefix}-${i + 1}" role="region">
            <div class="inner">${it.panel}</div>
          </div>
        </div>`).join('\n')}
      </div>`;

const detailList = (rows, label) => `      ${label ? `<p class="label label--faint" data-reveal style="margin-bottom:var(--s-5)">${label}</p>` : ''}
      <div class="detail-list" data-reveal>
${rows.map(r => `        <div class="detail-row"><span class="k">${r.k}</span><span class="v">${r.v}</span></div>`).join('\n')}
      </div>`;

// ===================================================================== INDEX
export function index(t, locale) {
  const p = t.pages.index;
  const { about: a, services: s, work: w, involvement: v, contact: c } = p;
  const f = c.fields;
  return `
<section class="hero" id="top">
  <div class="wrap grid">
    <div class="col-1-7">
      <p class="eyebrow" data-reveal>${p.eyebrow}</p>
      <h1 class="display" data-reveal>${p.display}</h1>
    </div>
    <div class="col-4-7 hero-lead">
      <p class="lead" data-reveal>${p.lead}</p>
      <div class="actions" data-reveal>
        <a class="btn btn--solid" href="#contact">${t.ui.startConversation}</a>
        <a class="btn btn--ghost" href="#services">${t.nav.services}</a>
      </div>
    </div>
    <div class="col-1-7">
      <dl class="facts" data-reveal>
${p.facts.map(x => `        <div class="fact"><dt>${x.k}</dt><dd>${x.dot ? '<span class="dot"></span>' : ''}${x.v}</dd></div>`).join('\n')}
      </dl>
    </div>
  </div>
</section>

<hr class="rule">

<section class="section" id="about">
  <div class="wrap grid">
    <div class="col-1-3"><p class="label label--faint" data-reveal>${a.label}</p></div>
    <div class="col-3-7">
      <h2 data-reveal>${a.heading}</h2>
      <div class="prose stack-5" style="margin-top:var(--s-7)">
${a.body.map(x => `        <p data-reveal>${x}</p>`).join('\n')}
      </div>
      <p class="label label--faint" data-reveal style="margin:var(--s-8) 0 var(--s-5)">${a.careerLabel}</p>
${accordion('career', a.career.map(r => ({
  label: `${r.role} &mdash; ${r.where}`,
  panel: `<div class="stack-3"><p class="label label--faint">${r.when}</p><p>${r.desc}</p></div>`,
})))}
${accordion('more', [
  { label: a.glanceLabel, panel: details(a.glance) },
  { label: a.personalLabel, panel: `<div class="prose">${a.personalBody.map(x => `<p>${x}</p>`).join('')}</div>` },
], 'margin-top:var(--s-8)')}
    </div>
  </div>
</section>
${invertBand(p.quote, p.quoteAttr)}
${sec('', s.label, s.heading,
  cards('cards--2', s.pillars.map(x => card({ ...x, extra: `<div class="tags">${tags(x.tags)}</div>` })))
  + '\n' + accordion('svc', [
    { label: s.processLabel, panel: details(s.process) + `<p style="margin-top:var(--s-5)">${s.processNote}</p>` },
    { label: s.extrasLabel, panel: details(s.extras) },
    ...s.faq.map(x => ({ label: x.q, panel: `<p>${x.a}</p>` })),
  ], 'margin-top:var(--s-8)'), false, 'services')}
<hr class="rule">
${sec('', w.label, w.heading,
  `      <div class="entry-list">\n${w.entries.map(e => entry(e, w[e.cta])).join('\n\n')}\n      </div>`, false, 'work')}
${sec('', v.label, v.heading,
  cards('cards--2', v.cards.map(x => card({
    ...x,
    extra: x.links.length ? `<div class="tags">${x.links.map(l => `<a class="tag" href="${l.href}" target="_blank" rel="noopener">${l.t}</a>`).join('')}</div>` : '',
  }))), true, 'involvement')}
${invertBand(p.quote2, p.quote2Attr)}
${sec('', c.label, c.heading, `      <div class="grid" style="--cols:6;row-gap:var(--s-8)">
        <div class="col-1-4">
          <p data-reveal style="margin-bottom:var(--s-7)">${c.intro}</p>
          <p class="label label--faint" data-reveal style="margin-bottom:var(--s-5)">${c.formLabel}</p>
          <div data-reveal>
            <div data-fs-success class="fs-success">${c.successMessage}</div>
            <div data-fs-error class="fs-error"></div>
            <form class="form-grid" id="contact-form" action="https://formspree.io/f/xdeonbpe" method="POST">
              <div class="field">
                <label for="cf-name">${f.name.label}</label>
                <input type="text" id="cf-name" name="name" placeholder="${f.name.placeholder}" required data-fs-field>
                <span data-fs-error="name" class="fs-field-error"></span>
              </div>
              <div class="field">
                <label for="cf-email">${f.email.label}</label>
                <input type="email" id="cf-email" name="email" placeholder="${f.email.placeholder}" required data-fs-field>
                <span data-fs-error="email" class="fs-field-error"></span>
              </div>
              <div class="field full">
                <label for="cf-subject">${f.subject.label}</label>
                <select id="cf-subject" name="subject" data-fs-field>
${c.subjectOptions.map(o => `                  <option>${o}</option>`).join('\n')}
                </select>
              </div>
              <div class="field full">
                <label for="cf-message">${f.message.label}</label>
                <textarea id="cf-message" name="message" placeholder="${f.message.placeholder}" required data-fs-field></textarea>
                <span data-fs-error="message" class="fs-field-error"></span>
              </div>
              <div class="full">
                <button type="submit" class="btn btn--solid" data-fs-submit-btn>${c.submit}</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-4-7">
          <p class="label label--faint" data-reveal style="margin-bottom:var(--s-5)">${c.channelsLabel}</p>
          <div class="detail-list" data-reveal>
            <a class="detail-row" href="mailto:${t.brand.email}"><span class="k">Email</span><span class="v">${t.brand.email}</span></a>
            <a class="detail-row" href="https://github.com/benjamin-arfa" target="_blank" rel="noopener"><span class="k">GitHub</span><span class="v">@benjamin-arfa</span></a>
            <a class="detail-row" href="https://linkedin.com/in/moadhbenjaminarfa" target="_blank" rel="noopener"><span class="k">LinkedIn</span><span class="v">moadhbenjaminarfa</span></a>
          </div>
${accordion('office', [
  { label: c.officeLabel, panel: details(c.office) },
  { label: c.hoursLabel, panel: details(c.hours) },
], 'margin-top:var(--s-7)')}
        </div>
      </div>`, false, 'contact')}`;
}

// ================================================================ IMPRESSUM
export function impressum(t, locale) {
  const p = t.pages.impressum;
  const block = (label, html) => `          <p class="label label--faint" data-reveal style="margin:var(--s-7) 0 var(--s-5)">${label}</p>
          <div class="prose" data-reveal><p>${html}</p></div>`;
  return pageHead(p)
    + sec('', p.sectionLabel, p.sectionHeading, `      <div class="grid" style="--cols:6">
        <div class="col-1-4">
${detailList(p.company, p.companyLabel)}
          <p class="label label--faint" data-reveal style="margin:var(--s-7) 0 var(--s-5)">${p.contactLabel}</p>
          <div class="detail-list" data-reveal>
            <a class="detail-row" href="mailto:${t.brand.email}"><span class="k">Email</span><span class="v">${t.brand.email}</span></a>
            <a class="detail-row" href="tel:+41792697632"><span class="k">Phone</span><span class="v">+41 79 269 76 32</span></a>
            <a class="detail-row" href="https://www.arfa.digital"><span class="k">Website</span><span class="v">www.arfa.digital</span></a>
          </div>
        </div>
        <div class="col-4-7">
          <p class="label label--faint" data-reveal style="margin-bottom:var(--s-5)">${p.purposeLabel}</p>
          <div class="prose" data-reveal><p>${p.purpose}</p></div>
${block(p.repLabel, p.rep)}
${block(p.liabilityLabel, p.liability)}
${block(p.copyrightLabel, p.copyright)}
        </div>
      </div>`);
}

// ====================================================================== 404
export function notfound(t, locale) {
  const p = t.pages.notfound;
  const A = id => anchor(locale, p, id);
  return pageHead(p) + `
<section class="section section--tight">
  <div class="wrap grid">
    <div class="col-1-7">
      <div class="actions" style="margin-top:0" data-reveal>
        <a class="btn btn--solid" href="${url(locale, 'index.html')}">${p.backHome}</a>
        <a class="btn btn--ghost" href="${A('work')}">${p.viewProjects}</a>
      </div>
    </div>
  </div>
</section>
` + sec('', p.sectionLabel, p.sectionHeading,
      cards('cards--3', p.cards.map(c => card({ label: p.tag, h: c.h, p: c.p, href: A(c.id) }))), true);
}
