// One render function per page. Each takes the resolved locale content `t`
// and returns the <main> body; build.mjs wraps it in chrome.
import { url, pageHead, invertBand, cta, sec, tags, details } from './chrome.mjs';

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

const entry = (e, ctaLabel) => `        <article class="entry" data-reveal id="${e.anchor}">
          <div class="entry-aside">
            <p class="entry-num">${e.n}</p>
            <p class="label label--faint entry-role">${e.role}</p>
          </div>
          <div class="entry-body">
            <h3>${e.h}</h3>
            <p class="kicker">${e.kicker}</p>
            ${e.body.map(p => `<p>${p}</p>`).join('\n            ')}
            ${details(e.details)}
            <div class="entry-foot">
              <div class="tags">${tags(e.tags)}</div>
              ${e.href
                ? `<a class="link-arrow" href="${e.href}" target="_blank" rel="noopener">${ctaLabel}</a>`
                : `<span class="label label--faint entry-status">${ctaLabel}</span>`}
            </div>
          </div>
        </article>`;

const accordion = (items, openFirst = false) => `      <div class="accordion">
${items.map((it, i) => `        <div class="accordion-item">
          <button class="accordion-trigger" aria-expanded="${openFirst && i === 0}" aria-controls="acc-${i}">
            <span>${it.label}</span><span class="icon" aria-hidden="true"></span>
          </button>
          <div class="accordion-panel" id="acc-${i}" role="region">
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
  const L = f => url(locale, f);
  return `
<section class="hero">
  <div class="wrap grid">
    <div class="col-1-7">
      <p class="eyebrow" data-reveal>${p.eyebrow}</p>
      <h1 class="display" data-reveal>${p.display}</h1>
    </div>
    <div class="col-4-7 hero-lead">
      <p class="lead" data-reveal>${p.lead}</p>
      <div class="actions" data-reveal>
        <a class="btn btn--solid" href="${L('contact.html')}">${t.ui.startConversation}</a>
        <a class="btn btn--ghost" href="${L('services.html')}">${t.nav.services}</a>
      </div>
    </div>
    <div class="col-1-7">
      <dl class="facts" data-reveal>
${p.facts.map(f => `        <div class="fact"><dt>${f.k}</dt><dd>${f.dot ? '<span class="dot"></span>' : ''}${f.v}</dd></div>`).join('\n')}
      </dl>
    </div>
  </div>
</section>

<hr class="rule">

<section class="section">
  <div class="wrap grid">
    <div class="col-1-3"><p class="label label--faint" data-reveal>${p.practiceLabel}</p></div>
    <div class="col-3-7">
      <h2 data-reveal>${p.practiceHeading}</h2>
      <div class="prose stack-5" style="margin-top:var(--s-7)">
${p.practiceBody.map(x => `        <p data-reveal>${x}</p>`).join('\n')}
        <p data-reveal><a class="link-arrow" href="${L('about.html')}">${t.ui.aboutFounder}</a></p>
      </div>
    </div>
  </div>
</section>
${invertBand(p.quote, p.quoteAttr)}
${sec('', p.servicesLabel, p.servicesHeading,
  cards('cards--3', t.shared.pillars.map(c => card({ ...c, extra: `<div class="tags">${tags(c.tags)}</div>` })))
  + `\n      <div style="margin-top:var(--s-7)" data-reveal><a class="link-arrow" href="${L('services.html')}">${t.ui.allServices}</a></div>`)}
<hr class="rule">
${sec('', p.workLabel, p.workHeading,
  `      <div class="entry-list">\n${[...t.pages.projects.commercial, ...t.pages.projects.openSource].map(e => entry(e, t.pages.projects[e.cta] || e.cta)).join('\n\n')}\n      </div>`
  + `\n      <div style="margin-top:var(--s-7)" data-reveal><a class="link-arrow" href="${L('projects.html')}">${t.ui.allProjects}</a></div>`)}
${sec('', p.involvementLabel, p.involvementHeading,
  cards('cards--2', t.shared.involvementCards.map(c => card({
    ...c,
    extra: c.links.length ? `<div class="tags">${c.links.map(l => `<a class="tag" href="${l.href}" target="_blank" rel="noopener">${l.t}</a>`).join('')}</div>` : '',
  })))
  + `\n      <div style="margin-top:var(--s-7)" data-reveal><a class="link-arrow" href="${L('involvement.html')}">${t.ui.allInvolvement}</a></div>`, true)}
<hr class="rule">
${cta(t, locale, p.ctaHeading, p.ctaBody)}`;
}

// ===================================================================== ABOUT
export function about(t, locale) {
  const p = t.pages.about;
  return pageHead(p)
    + sec('', p.bgLabel, p.bgHeading, `      <div class="grid" style="--cols:6">
        <div class="col-1-4 prose stack-5">
${p.bgBody.map(x => `          <p data-reveal>${x}</p>`).join('\n')}
        </div>
        <div class="col-4-7">
${detailList(p.glance, p.glanceLabel)}
        </div>
      </div>`)
    + invertBand(p.quote, p.quoteAttr)
    + sec('', p.careerLabel, p.careerHeading, `      <div class="entry-list">
${p.career.map((c, i) => `        <article class="entry" data-reveal>
          <div class="entry-aside">
            <p class="label label--faint">${c.when}</p>
            <p class="entry-num">${String(i + 1).padStart(2, '0')}</p>
          </div>
          <div class="entry-body">
            <h3>${c.role}</h3>
            <p class="kicker">${c.where}</p>
            <p>${c.desc}</p>
          </div>
        </article>`).join('\n')}
      </div>`)
    + sec('', p.skillsLabel, p.skillsHeading,
        cards('cards--3', p.skills.map(s => card({ label: s.label, h: s.h, p: '', extra: `<div class="tags">${tags(s.tags)}</div>` }))), true)
    + sec('', p.personalLabel, p.personalHeading, `      <div class="grid" style="--cols:6">
        <div class="col-1-4 prose stack-5">
${p.personalBody.map(x => `          <p data-reveal>${x}</p>`).join('\n')}
        </div>
        <div class="col-4-7">
${detailList(p.personal)}
        </div>
      </div>`)
    + cta(t, locale, p.ctaHeading, p.ctaBody);
}

// ================================================================== SERVICES
export function services(t, locale) {
  const p = t.pages.services;
  return pageHead(p)
    + sec('', p.pillarsLabel, p.pillarsHeading,
        accordion(p.pillars.map(x => ({
          label: x.label,
          panel: `<p>${x.body}</p>\n        <div class="tags">${tags(x.tags)}</div>`,
        })), true))
    + sec('', p.processLabel, p.processHeading,
        cards('cards--2', p.process.map(s => card({ label: s.label, h: s.h, p: s.p }))), true)
    + sec('', p.extrasLabel, p.extrasHeading,
        cards('cards--2', p.extras.map(s => card({ label: p.extrasTag, h: s.h, p: s.p }))))
    + invertBand(p.quote, p.quoteAttr)
    + sec('', p.faqLabel, p.faqHeading,
        accordion(p.faq.map(f => ({ label: f.q, panel: `<p>${f.a}</p>` }))))
    + cta(t, locale, p.ctaHeading, p.ctaBody);
}

// ================================================================== PROJECTS
export function projects(t, locale) {
  const p = t.pages.projects;
  // Two working groups — what is sold and what is given away — then the
  // past-work cards. The jump nav spans both groups plus the archive.
  const pillNav = `      <nav class="pill-nav" aria-label="${p.pageTitle}">
${[...p.commercial, ...p.openSource].map(e => `        <a class="pill" href="#${e.anchor}">${e.h}</a>`).join('\n')}
        <a class="pill" href="#archive">${p.archiveTag}</a>
      </nav>`;
  const list = items =>
    `      <div class="entry-list">\n${items.map(e => entry(e, p[e.cta] || e.cta)).join('\n\n')}\n      </div>`;
  return pageHead(p)
    + sec('', p.commercialLabel, p.commercialHeading, list(p.commercial))
    + sec('', p.openLabel, p.openHeading, list(p.openSource) + '\n' + pillNav, true)
    + invertBand(p.quote, p.quoteAttr)
    + sec('', p.archiveLabel, p.archiveHeading,
        `      <div class="cards cards--2" id="archive">
${p.archive.map(a => card({ label: p.archiveTag, h: a.h, p: a.p, href: a.href })).join('\n')}
      </div>`)
    + cta(t, locale, p.ctaHeading, p.ctaBody);
}

// =============================================================== INVOLVEMENT
export function involvement(t, locale) {
  const p = t.pages.involvement;
  const pillNav = `      <nav class="pill-nav" aria-label="${p.orgsHeading}">
${p.entries.map(e => `        <a class="pill" href="#${e.anchor}">${e.h}</a>`).join('\n')}
      </nav>`;
  return pageHead(p)
    + sec('', p.orgsLabel, p.orgsHeading,
        `      <div class="entry-list">\n${p.entries.map(e => entry(e, e.cta)).join('\n\n')}\n      </div>\n` + pillNav)
    + invertBand(p.quote, p.quoteAttr)
    + sec('', p.whyLabel, p.whyHeading,
        cards('cards--3', p.why.map(w => card({ label: p.whyTag, h: w.h, p: w.p }))), true)
    + cta(t, locale, p.ctaHeading, p.ctaBody);
}

// ================================================================== CONTACT
// The form element is fixed: #contact-form, formId xdeonbpe, the field
// `name` attributes and every data-fs-* hook. Only labels are localised.
// build/check.mjs fails the build if any of that drifts.
export function contact(t, locale) {
  const p = t.pages.contact;
  const f = p.fields;
  return pageHead(p)
    + sec('', p.sectionLabel, p.sectionHeading, `      <div class="grid" style="--cols:6">
        <div class="col-1-4">
          <p class="label label--faint" data-reveal style="margin-bottom:var(--s-5)">${p.formLabel}</p>
          <div data-reveal>
            <div data-fs-success class="fs-success">${p.successMessage}</div>
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
${p.subjectOptions.map(o => `                  <option>${o}</option>`).join('\n')}
                </select>
              </div>
              <div class="field full">
                <label for="cf-message">${f.message.label}</label>
                <textarea id="cf-message" name="message" placeholder="${f.message.placeholder}" required data-fs-field></textarea>
                <span data-fs-error="message" class="fs-field-error"></span>
              </div>
              <div class="full">
                <button type="submit" class="btn btn--solid" data-fs-submit-btn>${p.submit}</button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-4-7">
          <p class="label label--faint" data-reveal style="margin-bottom:var(--s-5)">${p.channelsLabel}</p>
          <div class="detail-list" data-reveal>
            <a class="detail-row" href="mailto:${t.brand.email}"><span class="k">Email</span><span class="v">${t.brand.email}</span></a>
            <a class="detail-row" href="https://github.com/benjamin-arfa" target="_blank" rel="noopener"><span class="k">GitHub</span><span class="v">@benjamin-arfa</span></a>
            <a class="detail-row" href="https://linkedin.com/in/moadhbenjaminarfa" target="_blank" rel="noopener"><span class="k">LinkedIn</span><span class="v">moadhbenjaminarfa</span></a>
          </div>
          <div style="margin-top:var(--s-7)">${detailList(p.office, p.officeLabel)}</div>
          <div style="margin-top:var(--s-7)">${detailList(p.hours, p.hoursLabel)}</div>
        </div>
      </div>`)
    + invertBand(p.quote, p.quoteAttr);
}

// ===================================================================== BLOG
export function blog(t, locale) {
  const p = t.pages.blog;
  const note = locale === 'en' ? '' :
    `      <p class="small label--faint" data-reveal style="margin-bottom:var(--s-6)">${p.englishOnlyNote}</p>\n`;
  const filters = `      <div class="blog-controls">
        <div class="pill-nav blog-filter" style="margin:0;justify-content:flex-start">
${p.filters.map((f, i) => `          <button class="pill${i === 0 ? ' is-active' : ''}" data-filter="${f.key}">${f.label}</button>`).join('\n')}
        </div>
        <div class="field">
          <label for="blog-search" class="visually-hidden">${t.ui.searchArticles}</label>
          <input type="search" id="blog-search" placeholder="${t.ui.searchArticles}" autocomplete="off">
        </div>
      </div>`;
  const posts = `      <div class="cards cards--3">
${p.posts.map(x => `        <article class="card post" data-categories="${x.cats}" data-reveal>
          <p class="label">${p.tag}</p>
          <h3><a href="/${x.file}">${x.h}</a></h3>
          <p>${x.p}</p>
          <div class="spacer"></div>
          <a class="link-arrow" href="/${x.file}">${t.ui.read}</a>
        </article>`).join('\n')}
      </div>`;
  return pageHead(p)
    + sec('', p.sectionLabel, p.sectionHeading, note + filters + '\n' + posts)
    + cta(t, locale, p.ctaHeading, p.ctaBody);
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
  const L = f => url(locale, f);
  return pageHead(p) + `
<section class="section section--tight">
  <div class="wrap grid">
    <div class="col-1-7">
      <div class="actions" style="margin-top:0" data-reveal>
        <a class="btn btn--solid" href="${L('index.html')}">${p.backHome}</a>
        <a class="btn btn--ghost" href="${L('projects.html')}">${p.viewProjects}</a>
      </div>
    </div>
  </div>
</section>
` + sec('', p.sectionLabel, p.sectionHeading,
      cards('cards--3', p.cards.map(c => card({ label: p.tag, h: c.h, p: c.p, href: L(c.file) }))), true);
}

// ================================================================== ARTICLE
export function article(t, locale, meta, bodyHtml) {
  return `
<section class="section section--tight">
  <div class="wrap">
    <div class="article">
      <p class="eyebrow" data-reveal>${meta.kicker}</p>
      <h1 class="h2" data-reveal>${meta.h}</h1>
    </div>
  </div>
</section>
<hr class="rule">
<section class="section">
  <div class="wrap">
    <div class="article article-body" data-reveal>
${bodyHtml}
    </div>
    <div class="article" style="margin-top:var(--s-9)">
      <a class="link-arrow" href="${url(locale, 'blog.html')}">${t.ui.allArticles}</a>
    </div>
  </div>
</section>
`;
}
