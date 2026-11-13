// =====================================================================
// Deutsch. Schweizer Konvention: «ss» statt «ß».
//
// Fehlende Schlüssel fallen auf Englisch zurück; der Build meldet sie.
// NICHT übersetzen: `file`, URLs, Feldnamen des Formulars.
//
// Lange Komposita in Grossüberschriften brauchen ein weiches Trennzeichen
// (&shy;). Die Anzeige-Schrift ist versal und sehr gross; ohne Trennung
// ist «Dateninfrastruktur» auf einem 390-px-Display breiter als die
// Spalte. &shy; ist im Gegensatz zu hyphens:auto nicht davon abhängig,
// ob der Browser ein deutsches Trennwörterbuch mitbringt.
// =====================================================================

export default {
  locale: 'de',
  localeName: 'Deutsch',
  htmlLang: 'de-CH',

  brand: { sub: 'Beratung', location: 'Basel, Schweiz' },

  nav: { menu: 'Menü', services: 'Leistungen', work: 'Referenzen', about: 'Über mich', enquire: 'Anfragen' },

  ui: {
    skip: 'Zum Inhalt springen',
    closeMenu: 'Menü schliessen',
    toggleTheme: 'Farbschema wechseln',
    language: 'Sprache',
    share: 'Diese Seite teilen',
    shareEmail: 'E-Mail',
    copyLink: 'Link kopieren',
    copied: 'Kopiert',
    startConversation: 'Gespräch beginnen',
  },

  menu: {
    home: 'Startseite', practice: 'Die Praxis', workGroup: 'Referenzen', elsewhere: 'Anderswo',
    projects: 'Projekte', involvement: 'Engagement',
    note: 'Open-Source-Werkzeuge für regulatorisches Reporting und Schweizer Rechtsdaten.',
    enquireNow: 'Jetzt anfragen', impressum: 'Impressum',
  },

  footer: {
    blurb: 'Datenintegration, Governance und Lifecycle-Management für regulierte Branchen. Basel, Schweiz.',
    colPractice: 'Praxis', colWork: 'Referenzen', colContact: 'Kontakt',
    rights: 'Alle Rechte vorbehalten',
  },

  pages: {
    index: {
      file: 'index.html',
      title: 'Arfa Digital Consulting | Dateninfrastruktur für regulierte Branchen',
      description: 'Software Engineering, Interoperabilität im Gesundheitswesen, Metadatenarchitektur und Business-Analyse für regulierte Branchen. Arfa Digital Consulting, Basel.',
      eyebrow: 'Beratung aus Basel, Schweiz',
      display: 'Daten&shy;infrastruktur für regulierte Branchen',
      lead: 'Datenintegration, Governance und Interoperabilität für Regulatory Technology und das Gesundheitswesen &mdash; vom Geschäftsbedarf bis in den Produktivbetrieb, wo Korrektheit nicht verhandelbar ist.',
      facts: [
        { k: 'Standort', v: 'Basel, Schweiz' },
        { k: 'Sprachen', v: 'Französisch &middot; Deutsch &middot; Englisch &middot; Spanisch' },
        { k: 'Status', v: 'Offen für Mandate', dot: true },
      ],

      about: {
        label: '01 &mdash; Die Praxis',
        heading: 'Technik, die dem Audit standhält',
        body: [
          'Arfa Digital Consulting macht aus Datenproblemen in regulierten Umgebungen funktionierende Systeme. Die Praxis verbindet Softwareentwicklung, Datenanalyse und strategische Beratung, abgestimmt auf Schweizer und europäische Vorgaben.',
          'Dahinter steht <strong>Benjamin Arfa</strong>: neun Jahre in Regulatory Technology, Gesundheitswesen und Life-Sciences-Fertigung, darunter Metadatenmodellierung für EZB und BFS. Heute ist er Technical Manager bei HL7 Schweiz und Mitgründer von <strong>BIRDBench Ltd</strong>.',
        ],
        careerLabel: 'Beruflicher Werdegang',
        career: [
          { when: 'Mai 2026 &mdash;', role: 'Mitgründer', where: 'BIRDBench Ltd', desc: 'Innovation in die RegTech bringen.' },
          { when: 'Apr. 2026 &mdash;', role: 'Technical Manager', where: 'HL7 Schweiz', desc: 'Standardisierung von Gesundheitsdaten für FHIR-CH &mdash; Umsetzungsleitfäden, Arbeitsgruppen zur Interoperabilität und Schweizer Standards für den Gesundheitsdatenaustausch.' },
          { when: 'Okt. 2025 &mdash;', role: 'Business Analyst', where: 'Bachem', desc: 'Requirements Engineering für pharmazeutische und biotechnologische Daten in der Life-Sciences-Fertigung &mdash; Systemintegration, Lifecycle-Management und operatives Reporting in Forschung und Produktion.' },
          { when: 'Feb. 2025 &mdash;', role: 'Head of Development', where: 'BIRD Software Solutions', desc: 'Leitung von Softwareentwicklung und technischer Strategie für Regulatory Technology &mdash; quelloffene Dateninfrastruktur nach dem BIRD-Standard.' },
          { when: '2022 &ndash; 2024', role: 'Product Owner, Daten &amp; Integration', where: 'Bluespace Ventures', desc: 'Semantische Datenintegration, FHIR-Datenmodellierung, MDM-Frameworks. Mitarbeit bei HL7 Schweiz und in der SNOMED French Translation Group.' },
          { when: '2020 &ndash; 2022', role: 'Research Analyst, Metadaten', where: 'EZB &amp; BFS', desc: 'Metadatenmodellierung für die Bankenaufsicht im BIRD/SDD-Team, SDMX-Methodik, Prozessautomatisierung und API-Integration für Metadaten-Repositorien.' },
          { when: '2017 &ndash; 2020', role: 'Data Scientist &amp; ML-Forscher', where: 'RWTH Aachen &middot; rheindata &middot; CWD &middot; Boralex', desc: 'Machine-Learning-Forschung, explorative Datenanalyse und datengetriebene Anwendungen in Windenergie und Industrie.' },
        ],
        glanceLabel: 'Auf einen Blick',
        glance: [
          { k: 'Standards', v: 'HL7 FHIR &middot; SDMX &middot; BIRD' },
          { k: 'Kompetenzen', v: 'Datenintegration &middot; Governance &middot; Datenmodellierung &middot; Machine Learning' },
          { k: 'Open Source', v: 'Contributor der Eclipse Foundation' },
        ],
        personalLabel: 'Abseits der Arbeit',
        personalBody: [
          'Ich bin <strong>Benni</strong> &mdash; eine französisch-deutsch-arabische Seele, derzeit in Basel.',
          'Musik ist meine Leidenschaft, Software mein Handwerk, und das Schreiben begleitet mich seit dem fünften Gymnasialjahr. Angefangen habe ich mit Zeichnen, Malerei und Kalligrafie, später kam die Poesie dazu. Heute schreibe ich Prosodie und melde mich hin und wieder zu Wort.',
          'Ich äussere mich gerne zu <strong>Souveränität, Technologie und Solidarität</strong>.',
          'Ich bin Mitglied von <a class="link" href="https://cmda.world" target="_blank" rel="noopener">CMDA</a>, dem Weltrat der algerischen Diaspora.',
        ],
      },

      quote: 'Gemeinsame Infrastruktur statt lizenzierter Silos. Transparente Regeln statt Blackboxes.',
      quoteAttr: 'Über den Aufbau offener Regulierungswerkzeuge',

      services: {
        label: '02 &mdash; Leistungen',
        heading: 'Vier Säulen',
        pillars: [
          { label: 'Säule 01', h: 'Software Engineering', p: 'Skalierbare Datenanwendungen und Systemintegration. Neuentwicklungen oder die Modernisierung der Systeme, die Sie bereits betreiben.', tags: ['Individuelle Anwendungen', 'Systemintegration', 'Modernisierung von Altsystemen'] },
          { label: 'Säule 02', h: 'Interoperabilität im Gesundheitswesen', p: 'Gesundheitsdaten, die Systeme untereinander austauschen können. Semantische Integration und Stammdatenmanagement auf Basis von HL7 FHIR.', tags: ['HL7 FHIR', 'Semantische Integration', 'Stammdatenmanagement'] },
          { label: 'Säule 03', h: 'Metadatenarchitektur', p: 'Metadaten- und Datenarchitektur für das statistische und aufsichtsrechtliche Reporting. Governance, die über den gesamten Datenlebenszyklus trägt.', tags: ['SDMX', 'BIRD', 'Data Governance'] },
          { label: 'Säule 04', h: 'Business-Analyse &amp; Architektur', p: 'Geschäftsanforderungen, übersetzt in technische Anforderungen und bis in den Produktivbetrieb begleitet. Eine Person zwischen Fach- und Technikteams, damit bei der Übersetzung nichts verloren geht.', tags: ['Requirements Engineering', 'Stakeholder-Mapping', 'Produktivbetrieb'] },
        ],
        processLabel: 'So arbeite ich',
        process: [
          { k: 'Verstehen', v: 'Erstgespräch, Stakeholder-Mapping' },
          { k: 'Entwerfen', v: 'Datenmodelle, Integrationstopologie, Governance' },
          { k: 'Entwickeln', v: 'Robuste, skalierbare Umsetzung' },
          { k: 'Liefern', v: 'Übergabe, Dokumentation, beratendes Mandat' },
        ],
        processNote: 'Projektbasierte Arbeit mit klaren Ergebnissen oder ein laufendes beratendes Mandat.',
        extrasLabel: 'Ebenfalls verfügbar',
        extras: [
          { k: 'IT-Beratung', v: 'Technologieentscheide, Infrastrukturoptimierung, digitale Transformation' },
          { k: 'Datenmodellierung', v: 'Konzeptionelle, logische und physische Modelle' },
          { k: 'ML-Beratung', v: 'Machine-Learning-Strategie und KI-Lösungsarchitektur' },
        ],
        faq: [
          { q: 'Arbeiten Sie auch mit Kundinnen und Kunden ausserhalb der Schweiz?', a: 'Ja. Ich bin in Basel ansässig, arbeite regelmässig mit Teams in ganz Europa und remote mit internationalen Kundinnen und Kunden.' },
          { q: 'Unterstützen Sie auch bestehende Systeme oder nur Neuentwicklungen?', a: 'Beides. Ein grosser Teil meiner Arbeit besteht darin, bestehende Datensysteme zu modernisieren und neue Standards in gewachsene Infrastruktur zu bringen, von HL7 v2 bis zu bestehenden Reporting-Rahmenwerken.' },
          { q: 'Wie gehen Sie mit Datenschutz und Compliance um?', a: 'Datenschutz ist von Anfang an eingeplant: Schweizer und EU-Datenschutz, DSGVO, Vertraulichkeit von Gesundheitsdaten und sichere Verarbeitung regulatorischer Daten.' },
        ],
      },

      work: {
        label: '03 &mdash; Referenzen',
        heading: 'Aktuelle Projekte',
        comingSoon: 'Demnächst',
        visitDashboard: 'Zum Dashboard',
        viewGitHub: 'Auf GitHub ansehen',
        entries: [
          {
            anchor: 'birdbench', n: '01', role: 'Mitgründer &middot; RegTech',
            h: 'BIRDBench',
            kicker: 'Interoperable Werkzeuge für das regulatorische Reporting, in einer Werkbank',
            body: 'BIRDBench führt offene und kommerzielle Erweiterungen der FreeBIRD-Anwendung zusammen. Sie bauen ein Werkzeug für genau Ihr Problem, und es läuft Seite an Seite mit den anderen.',
            href: '', cta: 'comingSoon',
          },
          {
            anchor: 'swiss-law', n: '02', role: 'Maintainer &middot; GovTech',
            h: 'Swiss Law Collection',
            kicker: 'Schweizer Bundes- und Kantonsrecht als abfragbarer Datensatz',
            body: '34’443 Erlasse des Bundes und aller 26 Kantone, harmonisiert und damit direkt vergleichbar. Als offene Daten veröffentlicht, damit Software am geltenden Recht geprüft werden und dessen Änderungen folgen kann.',
            href: 'https://swiss-law-as-source.github.io/', cta: 'visitDashboard',
          },
          {
            anchor: 'freebird', n: '03', role: 'Contributor &middot; RegTech',
            h: 'Eclipse FreeBIRD Tools',
            kicker: 'Werkzeuge, die BIRD als offenen Standard zugänglich machen',
            body: 'Ein quelloffenes Toolkit für das Banks’ Integrated Reporting Dictionary, den Standard, der die Regeln und Vorlagen festlegt, mit denen europäische Banken an die Aufsicht melden. Es verwaltet Dictionaries und Mappings und validiert und transformiert BIRD-Modelle.',
            href: 'https://github.com/eclipse-efbt/efbt', cta: 'viewGitHub',
          },
        ],
      },

      involvement: {
        label: '04 &mdash; Engagement',
        heading: 'Standards und Community',
        cards: [
          { label: 'Technical Manager', h: 'HL7 Schweiz', p: 'Arbeitsgruppen zur Interoperabilität und Umsetzungsleitfäden für FHIR-CH, die Schweizer Standards für den Gesundheitsdatenaustausch.', links: [{ t: 'hl7.ch', href: 'https://www.hl7.ch/de/' }, { t: 'fhir.ch', href: 'https://fhir.ch' }] },
          { label: 'Head of Development', h: 'BIRD Software Solutions', p: 'Quelloffene regulatorische Dateninfrastruktur nach dem BIRD-Standard.', links: [{ t: 'GitHub', href: 'https://github.com/BIRD-Software-Solutions' }] },
          { label: 'Mitgründer', h: 'BIRDBench Ltd', p: 'Offene, benchmarkgetriebene Ansätze im BIRD-Ökosystem.', links: [] },
          { label: 'Contributor', h: 'Eclipse Foundation', p: 'Beiträge über Eclipse EFBT, die Heimat der FreeBIRD-Werkzeuge, unter herstellerneutraler Governance.', links: [{ t: 'eclipse.org', href: 'https://www.eclipse.org' }] },
        ],
      },

      quote2: 'Jedes Mandat beginnt mit einem Erstgespräch &mdash; und einer ehrlichen Antwort darauf, ob ich die richtige Person dafür bin.',
      quote2Attr: 'Wie Mandate beginnen',

      contact: {
        label: '05 &mdash; Kontakt',
        heading: 'Arbeiten wir zusammen',
        intro: 'Sie suchen Orientierung bei Dateninitiativen, Systemintegration oder Interoperabilität? Briefings, halbfertige Ideen und Erstkontakte sind gleichermassen willkommen.',
        formLabel: 'Nachricht senden &middot; Antwort innert 48 h',
        successMessage: 'Nachricht gesendet &mdash; vielen Dank. Ich antworte innert 48 Stunden.',
        submit: 'Nachricht senden',
        fields: {
          name: { label: 'Name', placeholder: 'Ihr Name' },
          email: { label: 'E-Mail', placeholder: 'sie@beispiel.ch' },
          subject: { label: 'Betreff' },
          message: { label: 'Nachricht', placeholder: 'Erzählen Sie mir von Ihrem Projekt, Problem oder Ihrer Idee.' },
        },
        subjectOptions: [
          'Allgemeine Anfrage', 'Projekt / Beratung', 'HL7- / FHIR-Frage',
          'BIRD- / RegTech-Frage', 'Vortrag / Interview', 'Anderes',
        ],
        channelsLabel: 'Direkte Kanäle',
        officeLabel: 'Büro',
        office: [
          { k: 'Standort', v: 'Basel, Schweiz' },
          { k: 'Firma', v: 'Arfa Digital Consulting' },
          { k: 'UID', v: '<span class="mono">CHE-294.585.543</span>' },
        ],
        hoursLabel: 'Bürozeiten',
        hours: [
          { k: 'Mo &ndash; Fr', v: '09:00 &ndash; 18:00 MEZ' },
          { k: 'Telefonate', v: 'nach Vereinbarung' },
        ],
      },
    },

    impressum: {
      file: 'impressum.html',
      title: 'Impressum | Arfa Digital Consulting',
      description: 'Impressum und Firmenangaben der Arfa Digital Consulting — Einzelunternehmen mit Sitz in Basel-Stadt, Schweiz.',
      eyebrow: 'Rechtliche Angaben',
      pageTitle: 'Impressum',
      sub: 'Impressum und Firmenangaben der Arfa Digital Consulting &mdash; ein Einzelunternehmen mit Sitz in Basel-Stadt, Schweiz.',
      sectionLabel: '01 &mdash; Rechtliche Angaben',
      sectionHeading: 'Firmenangaben',
      companyLabel: 'Das Unternehmen',
      company: [
        { k: 'Inhaber', v: 'Benjamin Arfa' },
        { k: 'Adresse', v: 'Grellingerstrasse 44<br>4052 Basel<br>Schweiz' },
        { k: 'Rechtsform', v: 'Einzelunternehmen' },
        { k: 'UID', v: '<span class="mono">CHE-294.585.543</span>' },
        { k: 'Registereintrag', v: 'Handelsregisteramt des Kantons Basel-Stadt' },
        { k: 'MWST', v: 'Befreit nach Art. 10 MWSTG' },
      ],
      contactLabel: 'Kontakt',
      purposeLabel: 'Zweck des Unternehmens',
      purpose: '<strong>Arfa Digital Consulting</strong> bezweckt die Förderung der digitalen Transformation durch IT- und KI-Lösungen, die Optimierung von IT-Infrastrukturen, Software- und App-Entwicklung, Cybersicherheit, Datenschutz und Datenanalyse, IT-Beratung und -Support sowie technischen Support.',
      repLabel: 'Zeichnungsberechtigung',
      rep: 'Benjamin Arfa, französischer Staatsangehöriger, mit Einzelunterschrift.',
      liabilityLabel: 'Haftungsausschluss',
      liability: 'Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Angaben kann jedoch keine Gewähr übernommen werden. Für Schäden aus der Nutzung dieser Website wird keine Haftung übernommen.',
      copyrightLabel: 'Urheberrecht',
      copyright: '&copy; 2026 Arfa Digital Consulting. Alle Rechte vorbehalten. Inhalt und Gestaltung dieser Website sind urheberrechtlich geschützt.',
    },

    notfound: {
      file: '404.html',
      title: '404 | Arfa Digital Consulting',
      description: 'Diese Seite konnte nicht gefunden werden.',
      eyebrow: 'Fehler 404',
      pageTitle: 'Seite nicht gefunden',
      sub: 'Die gesuchte Seite existiert nicht, wurde verschoben oder hat vielleicht nie existiert.',
      backHome: 'Zur Startseite',
      viewProjects: 'Projekte ansehen',
      sectionLabel: '01 &mdash; Anderswo',
      sectionHeading: 'Vielleicht eine davon',
      tag: 'Seite',
      cards: [
        { h: 'Über mich', p: 'Der Gründer, der Leistungsausweis und der Werdegang hinter der Beratung.', id: 'about' },
        { h: 'Projekte', p: 'BIRDBench, Swiss Law Collection und Eclipse FreeBIRD Tools.', id: 'work' },
        { h: 'Kontakt', p: 'Briefings, halbfertige Ideen und Erstkontakte sind gleichermassen willkommen.', id: 'contact' },
      ],
    },
  },
};
