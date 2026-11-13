// =====================================================================
// ARFA DIGITAL CONSULTING — English content (source of truth)
//
// This file is the translation surface. content/site.de.js and
// content/site.fr.js mirror its shape; any key they omit falls back to
// the value here and the build prints a warning.
//
// The site is one page per locale (pages.index). Old page URLs are
// redirect stubs written by build/build.mjs, not content.
//
// DO NOT translate: form field `name` attributes, URLs, or anything
// under `formspree`. Translating a field name silently stops mail
// delivery. build/check.mjs fails the build if that happens.
// =====================================================================

export default {
  locale: 'en',
  localeName: 'English',
  htmlLang: 'en',

  brand: {
    name: 'Arfa Digital',
    sub: 'Consulting',
    full: 'Arfa Digital Consulting',
    uid: 'CHE-294.585.543',
    email: 'benjamin@arfa.digital',
    location: 'Basel, Switzerland',
  },

  nav: {
    menu: 'Menu',
    services: 'Services',
    work: 'Work',
    about: 'About',
    enquire: 'Enquire',
  },

  ui: {
    skip: 'Skip to content',
    closeMenu: 'Close menu',
    toggleTheme: 'Switch colour theme',
    language: 'Language',
    share: 'Share this page',
    shareEmail: 'Email',
    copyLink: 'Copy link',
    copied: 'Copied',
    startConversation: 'Start a conversation',
  },

  menu: {
    home: 'Home',
    practice: 'The practice',
    workGroup: 'Work',
    elsewhere: 'Elsewhere',
    projects: 'Projects',
    involvement: 'Involvement',
    note: 'Open-source tooling for regulatory reporting and Swiss legal data.',
    enquireNow: 'Enquire now',
    impressum: 'Impressum',
  },

  footer: {
    blurb: 'Data integration, governance and lifecycle management for regulated industries. Basel, Switzerland.',
    colPractice: 'Practice',
    colWork: 'Work',
    colContact: 'Contact',
    rights: 'All rights reserved',
  },

  pages: {
    index: {
      file: 'index.html',
      title: 'Arfa Digital Consulting | Data infrastructure for regulated industries',
      description: 'Software engineering, healthcare interoperability, metadata architecture and business analysis for regulated industries. Arfa Digital Consulting, Basel.',
      eyebrow: 'Consulting from Basel, Switzerland',
      display: 'Data infrastructure for regulated industries',
      lead: 'Data integration, governance and interoperability for regulatory technology and healthcare &mdash; from business need to production, where correctness is not optional.',
      facts: [
        { k: 'Based in', v: 'Basel, Switzerland' },
        { k: 'Languages', v: 'French &middot; German &middot; English &middot; Spanish' },
        { k: 'Status', v: 'Open to advisory', dot: true },
      ],

      // 01 — what the practice does, who is behind it; the rest is folded.
      about: {
        label: '01 &mdash; The practice',
        heading: 'Engineering that survives the audit',
        body: [
          'Arfa Digital Consulting turns data problems in regulated settings into working systems. It combines software development, data analysis and strategic consulting, tuned for Swiss and European rules.',
          'Behind it is <strong>Benjamin Arfa</strong>: nine years across regulatory technology, healthcare and Life Sciences manufacturing, including metadata modelling for the ECB and the Swiss FSO. Today he is Technical Manager at HL7 Switzerland and co-founder of <strong>BIRDBench Ltd</strong>.',
        ],
        careerLabel: 'Career journey',
        career: [
          { when: 'May 2026 &mdash;', role: 'Co-Founder', where: 'BIRDBench Ltd', desc: 'Bringing innovation into RegTech.' },
          { when: 'Apr 2026 &mdash;', role: 'Technical Manager', where: 'HL7 Switzerland', desc: 'Driving healthcare data standardisation for FHIR-CH &mdash; implementation guidance, interoperability working groups, and Swiss healthcare data exchange standards.' },
          { when: 'Oct 2025 &mdash;', role: 'Business Analyst', where: 'Bachem', desc: 'Requirements engineering for pharmaceutical and biotech data in Life Sciences manufacturing &mdash; system integration, lifecycle management, operational reporting across R&amp;D and production.' },
          { when: 'Feb 2025 &mdash;', role: 'Head of Development', where: 'BIRD Software Solutions', desc: 'Leading software development and technical strategy for regulatory technology &mdash; open-source data infrastructure aligned with the BIRD standard.' },
          { when: '2022 &ndash; 2024', role: 'Product Owner, Data &amp; Integration', where: 'Bluespace Ventures', desc: 'Semantic data integration, FHIR data modelling, MDM frameworks. Contributing to HL7 Switzerland and the SNOMED French Translation Group.' },
          { when: '2020 &ndash; 2022', role: 'Research Analyst, Metadata', where: 'ECB &amp; Swiss FSO', desc: 'Metadata modelling for banking supervision in the BIRD/SDD team, SDMX methodology, process automation, API integration for metadata repositories.' },
          { when: '2017 &ndash; 2020', role: 'Data Scientist &amp; ML Researcher', where: 'RWTH Aachen &middot; rheindata &middot; CWD &middot; Boralex', desc: 'Machine learning research, exploratory data analysis, and data-driven applications across wind energy and industrial sectors.' },
        ],
        glanceLabel: 'At a glance',
        glance: [
          { k: 'Standards', v: 'HL7 FHIR &middot; SDMX &middot; BIRD' },
          { k: 'Competencies', v: 'Data integration &middot; Governance &middot; Data modelling &middot; Machine learning' },
          { k: 'Open source', v: 'Eclipse Foundation contributor' },
        ],
        personalLabel: 'Off the clock',
        personalBody: [
          "It's <strong>Benni</strong> &mdash; a French-German-Arab soul, currently in Basel.",
          'Music is my jam, software my bread and butter, and writing a way of expression that has kept me company since my fifth year of high school. I started with drawing, painting and calligraphy, then moved on to poetry. Nowadays I write prosody and dial in once in a while.',
          'I like to comment on topics related to <strong>sovereignty, technology and solidarity</strong>.',
          'I am a member of <a class="link" href="https://cmda.world" target="_blank" rel="noopener">CMDA</a>, the World Council of the Algerian Diaspora.',
        ],
      },

      quote: 'Shared infrastructure instead of licensed silos. Transparent rules instead of black boxes.',
      quoteAttr: 'On building regulatory tooling in the open',

      // 02 — four non-overlapping offers; process and FAQ are folded.
      services: {
        label: '02 &mdash; Services',
        heading: 'Four pillars',
        pillars: [
          { label: 'Pillar 01', h: 'Software Engineering', p: 'Scalable data applications and system integration. New builds, or modernising the systems you already run.', tags: ['Custom applications', 'System integration', 'Legacy modernisation'] },
          { label: 'Pillar 02', h: 'Healthcare Interoperability', p: 'Healthcare data that systems can exchange. Semantic integration and master data management, built on HL7 FHIR.', tags: ['HL7 FHIR', 'Semantic integration', 'Master data management'] },
          { label: 'Pillar 03', h: 'Metadata Architecture', p: 'Metadata and data architecture for statistical and supervisory reporting. Governance that holds across the whole data lifecycle.', tags: ['SDMX', 'BIRD', 'Data governance'] },
          { label: 'Pillar 04', h: 'Business Analysis &amp; Architecture', p: 'Business needs translated into technical requirements, then carried through to production operations. One person between business and technical teams, so nothing is lost in translation.', tags: ['Requirements engineering', 'Stakeholder mapping', 'Production operations'] },
        ],
        processLabel: 'How I work',
        process: [
          { k: 'Discover', v: 'Discovery call, stakeholder mapping' },
          { k: 'Design', v: 'Data models, integration topology, governance' },
          { k: 'Develop', v: 'Robust, scalable implementation' },
          { k: 'Deliver', v: 'Handover, documentation, advisory retainer' },
        ],
        processNote: 'Project-based work with clear deliverables, or an ongoing advisory retainer.',
        extrasLabel: 'Also available',
        extras: [
          { k: 'IT consulting', v: 'Technology decisions, infrastructure optimisation, digital transformation' },
          { k: 'Data modelling', v: 'Conceptual, logical and physical models' },
          { k: 'ML consulting', v: 'Machine-learning strategy and AI solution architecture' },
        ],
        faq: [
          { q: 'Do you work with clients outside Switzerland?', a: 'Yes. I am based in Basel, work regularly with teams across Europe, and work remotely with international clients.' },
          { q: 'Can you help with existing systems, or only greenfield projects?', a: 'Both. Much of my work is modernising legacy data systems and bringing new standards into established infrastructure, from legacy HL7 v2 to existing reporting frameworks.' },
          { q: 'How do you handle data privacy and compliance?', a: 'Privacy is designed in from the start: Swiss and EU data protection, GDPR, healthcare confidentiality and secure handling of regulatory data.' },
        ],
      },

      // 03 — current projects only. No stack, no tags.
      work: {
        label: '03 &mdash; Work',
        heading: 'Current projects',
        comingSoon: 'Coming soon',
        visitDashboard: 'Visit the dashboard',
        viewGitHub: 'View on GitHub',
        entries: [
          {
            anchor: 'birdbench', n: '01', role: 'Co-founder &middot; RegTech',
            h: 'BIRDBench',
            kicker: 'Interoperable tools for regulatory reporting, in one workbench',
            body: 'BIRDBench brings together open and commercial extensions to the FreeBIRD application. Build a tool for the exact problem you have, and it works alongside the others.',
            href: '', cta: 'comingSoon',
          },
          {
            anchor: 'swiss-law', n: '02', role: 'Maintainer &middot; GovTech',
            h: 'Swiss Law Collection',
            kicker: 'Swiss federal and cantonal law as a queryable dataset',
            body: '34,443 acts from the Confederation and all 26 cantons, harmonised so they can be compared side by side. Published as open data, so software can test against the law and follow its changes.',
            href: 'https://swiss-law-as-source.github.io/', cta: 'visitDashboard',
          },
          {
            anchor: 'freebird', n: '03', role: 'Contributor &middot; RegTech',
            h: 'Eclipse FreeBIRD Tools',
            kicker: 'Tooling to democratise BIRD as an open standard',
            body: "An open-source toolkit for the Banks' Integrated Reporting Dictionary, the standard that defines the rules and templates European banks use to report to supervisors. It manages dictionaries and mappings, and validates and transforms BIRD models.",
            href: 'https://github.com/eclipse-efbt/efbt', cta: 'viewGitHub',
          },
        ],
      },

      // 04 — standards bodies and open governance.
      involvement: {
        label: '04 &mdash; Involvement',
        heading: 'Standards and community',
        cards: [
          { label: 'Technical Manager', h: 'HL7 Switzerland', p: 'Interoperability working groups and implementation guidance for FHIR-CH, the Swiss healthcare data exchange standards.', links: [{ t: 'hl7.ch', href: 'https://www.hl7.ch/de/' }, { t: 'fhir.ch', href: 'https://fhir.ch' }] },
          { label: 'Head of Development', h: 'BIRD Software Solutions', p: 'Open-source regulatory data infrastructure on the BIRD standard.', links: [{ t: 'GitHub', href: 'https://github.com/BIRD-Software-Solutions' }] },
          { label: 'Co-Founder', h: 'BIRDBench Ltd', p: 'Open, benchmark-driven approaches in the BIRD ecosystem.', links: [] },
          { label: 'Contributor', h: 'Eclipse Foundation', p: 'Contributing through Eclipse EFBT, the home of the FreeBIRD tools, under vendor-neutral governance.', links: [{ t: 'eclipse.org', href: 'https://www.eclipse.org' }] },
        ],
      },

      quote2: 'Every engagement starts with a discovery call &mdash; and an honest answer about whether I am the right person for it.',
      quote2Attr: 'How engagements begin',

      // 05 — the form lives here. Its markup and field names are fixed in
      // build/pages.mjs; only the labels below are translatable.
      contact: {
        label: '05 &mdash; Contact',
        heading: "Let's work together",
        intro: 'Looking for guidance on data initiatives, system integration or interoperability? Briefs, half-formed ideas and cold introductions are all welcome.',
        formLabel: 'Send a message &middot; reply within 48h',
        successMessage: "Message sent &mdash; thank you. I'll reply within 48h.",
        submit: 'Send message',
        fields: {
          // `name` attributes are fixed in the template and are NOT translatable.
          name: { label: 'Name', placeholder: 'Your name' },
          email: { label: 'Email', placeholder: 'you@example.com' },
          subject: { label: 'Subject' },
          message: { label: 'Message', placeholder: 'Tell me about your project, problem or idea.' },
        },
        subjectOptions: [
          'General inquiry', 'Project / consulting', 'HL7 / FHIR question',
          'BIRD / RegTech question', 'Speaking / interview', 'Other',
        ],
        channelsLabel: 'Direct channels',
        officeLabel: 'Office',
        office: [
          { k: 'Location', v: 'Basel, Switzerland' },
          { k: 'Company', v: 'Arfa Digital Consulting' },
          { k: 'UID', v: '<span class="mono">CHE-294.585.543</span>' },
        ],
        hoursLabel: 'Working hours',
        hours: [
          { k: 'Mon &ndash; Fri', v: '09:00 &ndash; 18:00 CET' },
          { k: 'Calls', v: 'by appointment' },
        ],
      },
    },

    impressum: {
      file: 'impressum.html',
      title: 'Impressum | Arfa Digital Consulting',
      description: 'Legal notice and company details for Arfa Digital Consulting — a sole proprietorship registered in Basel-Stadt, Switzerland.',
      eyebrow: 'Legal information',
      pageTitle: 'Impressum',
      sub: 'Legal notice and company details for Arfa Digital Consulting &mdash; a sole proprietorship registered in Basel-Stadt, Switzerland.',
      sectionLabel: '01 &mdash; Legal notice',
      sectionHeading: 'Company details',
      companyLabel: 'The company',
      company: [
        { k: 'Owner', v: 'Benjamin Arfa' },
        { k: 'Address', v: 'Grellingerstrasse 44<br>4052 Basel<br>Switzerland' },
        { k: 'Type', v: 'Sole proprietorship' },
        { k: 'Company ID', v: '<span class="mono">CHE-294.585.543</span>' },
        { k: 'Registration', v: 'Commercial Register Office of the Canton of Basel-Stadt' },
        { k: 'VAT', v: 'Exempt under Art. 10 MWSTG' },
      ],
      contactLabel: 'Contact',
      purposeLabel: 'Company purpose',
      purpose: '<strong>Arfa Digital Consulting</strong> aims to promote digital transformation by providing IT and AI solutions, optimisation of IT infrastructures, software and app development, cybersecurity, data protection and data analysis, IT consulting and support, and technical support.',
      repLabel: 'Authorised representative',
      rep: 'Benjamin Arfa, French citizen, with sole signing authority.',
      liabilityLabel: 'Liability disclaimer',
      liability: 'The content of this website has been created with the utmost care. However, we cannot guarantee the accuracy, completeness or timeliness of the information provided, and assume no liability for damages resulting from the use of this website.',
      copyrightLabel: 'Copyright',
      copyright: '&copy; 2026 Arfa Digital Consulting. All rights reserved. Content and design of this website are subject to copyright protection.',
    },

    notfound: {
      file: '404.html',
      title: '404 | Arfa Digital Consulting',
      description: 'This page could not be found.',
      eyebrow: 'Error 404',
      pageTitle: 'Page not found',
      sub: 'The page you are looking for does not exist, was moved, or perhaps never existed in the first place.',
      backHome: 'Back home',
      viewProjects: 'View projects',
      sectionLabel: '01 &mdash; Elsewhere',
      sectionHeading: 'Maybe try one of these',
      tag: 'Page',
      // `id` is a section anchor on the home page.
      cards: [
        { h: 'About', p: 'The founder, the track record and the career journey behind the consultancy.', id: 'about' },
        { h: 'Projects', p: 'BIRDBench, Swiss Law Collection and Eclipse FreeBIRD Tools.', id: 'work' },
        { h: 'Contact', p: 'Briefs, half-formed ideas and cold introductions are all welcome.', id: 'contact' },
      ],
    },
  },
};
