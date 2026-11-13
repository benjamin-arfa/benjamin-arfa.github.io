// =====================================================================
// Français (Suisse romande).
//
// Les clés absentes reprennent l'anglais ; le build les signale.
// NE PAS traduire : `file`, les URL, les attributs `name` du formulaire.
// =====================================================================

export default {
  locale: 'fr',
  localeName: 'Français',
  htmlLang: 'fr-CH',

  brand: { sub: 'Conseil', location: 'Bâle, Suisse' },

  nav: { menu: 'Menu', services: 'Prestations', work: 'Travaux', about: 'À propos', enquire: 'Contact' },

  ui: {
    skip: 'Aller au contenu',
    closeMenu: 'Fermer le menu',
    toggleTheme: 'Changer de thème',
    language: 'Langue',
    share: 'Partager cette page',
    shareEmail: 'E-mail',
    copyLink: 'Copier le lien',
    copied: 'Copié',
    startConversation: 'Entamer la discussion',
  },

  menu: {
    home: 'Accueil', practice: 'Le cabinet', workGroup: 'Travaux', elsewhere: 'Ailleurs',
    projects: 'Projets', involvement: 'Engagement',
    note: 'Outils open source pour le reporting réglementaire et les données juridiques suisses.',
    enquireNow: 'Me contacter', impressum: 'Mentions légales',
  },

  footer: {
    blurb: 'Intégration de données, gouvernance et gestion du cycle de vie pour les secteurs réglementés. Bâle, Suisse.',
    colPractice: 'Cabinet', colWork: 'Travaux', colContact: 'Contact',
    rights: 'Tous droits réservés',
  },

  pages: {
    index: {
      file: 'index.html',
      title: 'Arfa Digital Consulting | Infrastructure de données pour secteurs réglementés',
      description: 'Génie logiciel, interopérabilité en santé, architecture de métadonnées et analyse métier pour les secteurs réglementés. Arfa Digital Consulting, Bâle.',
      eyebrow: 'Conseil depuis Bâle, Suisse',
      display: 'Infrastructure de données pour secteurs réglementés',
      lead: 'Intégration de données, gouvernance et interopérabilité pour la technologie réglementaire et la santé &mdash; du besoin métier à la production, là où l’exactitude n’est pas optionnelle.',
      facts: [
        { k: 'Basé à', v: 'Bâle, Suisse' },
        { k: 'Langues', v: 'Français &middot; Allemand &middot; Anglais &middot; Espagnol' },
        { k: 'Statut', v: 'Disponible pour des mandats', dot: true },
      ],

      about: {
        label: '01 &mdash; Le cabinet',
        heading: 'Une ingénierie qui résiste à l’audit',
        body: [
          'Arfa Digital Consulting transforme les problèmes de données en contexte réglementé en systèmes qui fonctionnent. Le cabinet associe développement logiciel, analyse de données et conseil stratégique, adaptés aux règles suisses et européennes.',
          'Derrière le cabinet : <strong>Benjamin Arfa</strong>, neuf ans en technologie réglementaire, en santé et en production dans les sciences de la vie, dont la modélisation de métadonnées pour la BCE et l’OFS. Il est aujourd’hui Technical Manager chez HL7 Suisse et cofondateur de <strong>BIRDBench Ltd</strong>.',
        ],
        careerLabel: 'Parcours',
        career: [
          { when: 'Mai 2026 &mdash;', role: 'Cofondateur', where: 'BIRDBench Ltd', desc: 'Apporter de l’innovation à la RegTech.' },
          { when: 'Avr. 2026 &mdash;', role: 'Technical Manager', where: 'HL7 Suisse', desc: 'Normalisation des données de santé pour FHIR-CH &mdash; guides de mise en œuvre, groupes de travail sur l’interopérabilité et normes suisses d’échange de données de santé.' },
          { when: 'Oct. 2025 &mdash;', role: 'Analyste métier', where: 'Bachem', desc: 'Ingénierie des exigences pour les données pharmaceutiques et biotechnologiques en production &mdash; intégration de systèmes, gestion du cycle de vie et reporting opérationnel en R&amp;D et production.' },
          { when: 'Févr. 2025 &mdash;', role: 'Head of Development', where: 'BIRD Software Solutions', desc: 'Direction du développement logiciel et de la stratégie technique en technologie réglementaire &mdash; infrastructure de données open source alignée sur la norme BIRD.' },
          { when: '2022 &ndash; 2024', role: 'Product Owner, données &amp; intégration', where: 'Bluespace Ventures', desc: 'Intégration sémantique, modélisation FHIR, cadres MDM. Contributions à HL7 Suisse et au SNOMED French Translation Group.' },
          { when: '2020 &ndash; 2022', role: 'Analyste de recherche, métadonnées', where: 'BCE &amp; OFS', desc: 'Modélisation de métadonnées pour la supervision bancaire au sein de l’équipe BIRD/SDD, méthodologie SDMX, automatisation et intégration d’API pour les référentiels de métadonnées.' },
          { when: '2017 &ndash; 2020', role: 'Data scientist &amp; chercheur ML', where: 'RWTH Aachen &middot; rheindata &middot; CWD &middot; Boralex', desc: 'Recherche en apprentissage automatique, analyse exploratoire et applications pilotées par les données dans l’éolien et l’industrie.' },
        ],
        glanceLabel: 'En bref',
        glance: [
          { k: 'Normes', v: 'HL7 FHIR &middot; SDMX &middot; BIRD' },
          { k: 'Compétences', v: 'Intégration de données &middot; Gouvernance &middot; Modélisation &middot; Apprentissage automatique' },
          { k: 'Open source', v: 'Contributeur de l’Eclipse Foundation' },
        ],
        personalLabel: 'Hors du bureau',
        personalBody: [
          'C’est <strong>Benni</strong> &mdash; une âme franco-germano-arabe, actuellement à Bâle.',
          'La musique est ma passion, le logiciel mon métier, et l’écriture m’accompagne depuis la cinquième année de gymnase. J’ai commencé par le dessin, la peinture et la calligraphie, puis est venue la poésie. Aujourd’hui j’écris de la prosodie et je prends la parole de temps à autre.',
          'J’aime commenter les sujets liés à la <strong>souveraineté, la technologie et la solidarité</strong>.',
          'Je suis membre du <a class="link" href="https://cmda.world" target="_blank" rel="noopener">CMDA</a>, le Conseil Mondial de la Diaspora Algérienne.',
        ],
      },

      quote: 'Une infrastructure partagée plutôt que des silos sous licence. Des règles transparentes plutôt que des boîtes noires.',
      quoteAttr: 'Sur la construction d’outils réglementaires ouverts',

      services: {
        label: '02 &mdash; Prestations',
        heading: 'Quatre piliers',
        pillars: [
          { label: 'Pilier 01', h: 'Génie logiciel', p: 'Applications de données évolutives et intégration de systèmes. Nouveaux développements, ou modernisation des systèmes que vous exploitez déjà.', tags: ['Applications sur mesure', 'Intégration de systèmes', 'Modernisation de l’existant'] },
          { label: 'Pilier 02', h: 'Interopérabilité en santé', p: 'Des données de santé que les systèmes peuvent échanger. Intégration sémantique et gestion des données de référence, fondées sur HL7 FHIR.', tags: ['HL7 FHIR', 'Intégration sémantique', 'Données de référence (MDM)'] },
          { label: 'Pilier 03', h: 'Architecture de métadonnées', p: 'Architecture de métadonnées et de données pour le reporting statistique et prudentiel. Une gouvernance qui tient sur tout le cycle de vie des données.', tags: ['SDMX', 'BIRD', 'Gouvernance des données'] },
          { label: 'Pilier 04', h: 'Analyse métier &amp; architecture', p: 'Les besoins métier traduits en exigences techniques, puis menés jusqu’à l’exploitation en production. Une seule personne entre équipes métier et techniques, pour que rien ne se perde dans la traduction.', tags: ['Ingénierie des exigences', 'Cartographie des parties prenantes', 'Exploitation en production'] },
        ],
        processLabel: 'Ma façon de travailler',
        process: [
          { k: 'Comprendre', v: 'Entretien exploratoire, cartographie des parties prenantes' },
          { k: 'Concevoir', v: 'Modèles de données, topologie d’intégration, gouvernance' },
          { k: 'Développer', v: 'Implémentation robuste et évolutive' },
          { k: 'Livrer', v: 'Transfert, documentation, mandat de conseil' },
        ],
        processNote: 'Un travail au projet avec des livrables clairs, ou un mandat de conseil continu.',
        extrasLabel: 'Également disponible',
        extras: [
          { k: 'Conseil informatique', v: 'Décisions technologiques, optimisation d’infrastructure, transformation numérique' },
          { k: 'Modélisation de données', v: 'Modèles conceptuels, logiques et physiques' },
          { k: 'Conseil en ML', v: 'Stratégie d’apprentissage automatique et architecture de solutions d’IA' },
        ],
        faq: [
          { q: 'Travaillez-vous avec des clients hors de Suisse ?', a: 'Oui. Je suis basé à Bâle, je collabore régulièrement avec des équipes dans toute l’Europe et je travaille à distance avec des clients internationaux.' },
          { q: 'Intervenez-vous sur des systèmes existants ou uniquement sur du neuf ?', a: 'Les deux. Une grande part de mon travail consiste à moderniser des systèmes de données existants et à intégrer de nouvelles normes dans une infrastructure établie, de HL7 v2 aux cadres de reporting en place.' },
          { q: 'Comment traitez-vous la protection des données et la conformité ?', a: 'La protection des données est intégrée dès la conception : protection des données suisse et européenne, RGPD, confidentialité des données de santé et traitement sécurisé des données réglementaires.' },
        ],
      },

      work: {
        label: '03 &mdash; Travaux',
        heading: 'Projets en cours',
        comingSoon: 'Bientôt disponible',
        visitDashboard: 'Voir le tableau de bord',
        viewGitHub: 'Voir sur GitHub',
        entries: [
          {
            anchor: 'birdbench', n: '01', role: 'Cofondateur &middot; RegTech',
            h: 'BIRDBench',
            kicker: 'Des outils interopérables pour le reporting réglementaire, dans un seul atelier',
            body: 'BIRDBench réunit des extensions ouvertes et commerciales de l’application FreeBIRD. Vous construisez un outil pour votre problème précis, et il fonctionne avec les autres.',
            href: '', cta: 'comingSoon',
          },
          {
            anchor: 'swiss-law', n: '02', role: 'Mainteneur &middot; GovTech',
            h: 'Swiss Law Collection',
            kicker: 'Le droit fédéral et cantonal suisse comme jeu de données interrogeable',
            body: '34&#8239;443 actes de la Confédération et des 26 cantons, harmonisés pour être comparés côte à côte. Publiés en données ouvertes, pour que les logiciels puissent être testés au regard du droit et suivre ses modifications.',
            href: 'https://swiss-law-as-source.github.io/', cta: 'visitDashboard',
          },
          {
            anchor: 'freebird', n: '03', role: 'Contributeur &middot; RegTech',
            h: 'Eclipse FreeBIRD Tools',
            kicker: 'Des outils pour rendre BIRD accessible comme norme ouverte',
            body: 'Une boîte à outils open source pour le Banks’ Integrated Reporting Dictionary, la norme qui définit les règles et modèles utilisés par les banques européennes pour leur reporting aux autorités de surveillance. Elle gère dictionnaires et correspondances, et valide et transforme les modèles BIRD.',
            href: 'https://github.com/eclipse-efbt/efbt', cta: 'viewGitHub',
          },
        ],
      },

      involvement: {
        label: '04 &mdash; Engagement',
        heading: 'Normes et communauté',
        cards: [
          { label: 'Technical Manager', h: 'HL7 Suisse', p: 'Groupes de travail sur l’interopérabilité et guides de mise en œuvre pour FHIR-CH, les normes suisses d’échange de données de santé.', links: [{ t: 'hl7.ch', href: 'https://www.hl7.ch/de/' }, { t: 'fhir.ch', href: 'https://fhir.ch' }] },
          { label: 'Head of Development', h: 'BIRD Software Solutions', p: 'Infrastructure de données réglementaires open source fondée sur la norme BIRD.', links: [{ t: 'GitHub', href: 'https://github.com/BIRD-Software-Solutions' }] },
          { label: 'Cofondateur', h: 'BIRDBench Ltd', p: 'Approches ouvertes et pilotées par le benchmarking au sein de l’écosystème BIRD.', links: [] },
          { label: 'Contributeur', h: 'Eclipse Foundation', p: 'Contributions via Eclipse EFBT, foyer des outils FreeBIRD, sous une gouvernance indépendante.', links: [{ t: 'eclipse.org', href: 'https://www.eclipse.org' }] },
        ],
      },

      quote2: 'Chaque mandat commence par un entretien exploratoire &mdash; et une réponse honnête sur le fait que je sois, ou non, la bonne personne.',
      quote2Attr: 'Comment débutent les mandats',

      contact: {
        label: '05 &mdash; Contact',
        heading: 'Travaillons ensemble',
        intro: 'Vous cherchez un accompagnement sur vos initiatives de données, l’intégration de systèmes ou l’interopérabilité ? Cahiers des charges, idées encore floues et premiers contacts sont tous bienvenus.',
        formLabel: 'Envoyer un message &middot; réponse sous 48 h',
        successMessage: 'Message envoyé &mdash; merci. Je réponds sous 48 heures.',
        submit: 'Envoyer le message',
        fields: {
          name: { label: 'Nom', placeholder: 'Votre nom' },
          email: { label: 'E-mail', placeholder: 'vous@exemple.ch' },
          subject: { label: 'Objet' },
          message: { label: 'Message', placeholder: 'Parlez-moi de votre projet, de votre problème ou de votre idée.' },
        },
        subjectOptions: [
          'Demande générale', 'Projet / conseil', 'Question HL7 / FHIR',
          'Question BIRD / RegTech', 'Conférence / interview', 'Autre',
        ],
        channelsLabel: 'Canaux directs',
        officeLabel: 'Bureau',
        office: [
          { k: 'Lieu', v: 'Bâle, Suisse' },
          { k: 'Société', v: 'Arfa Digital Consulting' },
          { k: 'IDE', v: '<span class="mono">CHE-294.585.543</span>' },
        ],
        hoursLabel: 'Horaires',
        hours: [
          { k: 'Lun &ndash; ven', v: '09:00 &ndash; 18:00 HEC' },
          { k: 'Appels', v: 'sur rendez-vous' },
        ],
      },
    },

    impressum: {
      file: 'impressum.html',
      title: 'Mentions légales | Arfa Digital Consulting',
      description: 'Mentions légales et informations sur Arfa Digital Consulting — entreprise individuelle inscrite à Bâle-Ville, Suisse.',
      eyebrow: 'Informations légales',
      pageTitle: 'Mentions légales',
      sub: 'Mentions légales et informations sur Arfa Digital Consulting &mdash; une entreprise individuelle inscrite à Bâle-Ville, Suisse.',
      sectionLabel: '01 &mdash; Mentions légales',
      sectionHeading: 'Informations sur la société',
      companyLabel: 'La société',
      company: [
        { k: 'Titulaire', v: 'Benjamin Arfa' },
        { k: 'Adresse', v: 'Grellingerstrasse 44<br>4052 Bâle<br>Suisse' },
        { k: 'Forme juridique', v: 'Entreprise individuelle' },
        { k: 'IDE', v: '<span class="mono">CHE-294.585.543</span>' },
        { k: 'Inscription', v: 'Registre du commerce du canton de Bâle-Ville' },
        { k: 'TVA', v: 'Exonérée selon l’art. 10 LTVA' },
      ],
      contactLabel: 'Contact',
      purposeLabel: 'But de la société',
      purpose: '<strong>Arfa Digital Consulting</strong> a pour but de promouvoir la transformation numérique par des solutions informatiques et d’IA, l’optimisation d’infrastructures informatiques, le développement de logiciels et d’applications, la cybersécurité, la protection et l’analyse de données, le conseil et le support informatiques, ainsi que le support technique.',
      repLabel: 'Signature autorisée',
      rep: 'Benjamin Arfa, ressortissant français, avec signature individuelle.',
      liabilityLabel: 'Clause de non-responsabilité',
      liability: 'Le contenu de ce site a été élaboré avec le plus grand soin. Aucune garantie n’est toutefois donnée quant à l’exactitude, l’exhaustivité ou l’actualité des informations fournies, et aucune responsabilité n’est assumée pour les dommages résultant de l’utilisation de ce site.',
      copyrightLabel: 'Droit d’auteur',
      copyright: '&copy; 2026 Arfa Digital Consulting. Tous droits réservés. Le contenu et la conception de ce site sont protégés par le droit d’auteur.',
    },

    notfound: {
      file: '404.html',
      title: '404 | Arfa Digital Consulting',
      description: 'Cette page est introuvable.',
      eyebrow: 'Erreur 404',
      pageTitle: 'Page introuvable',
      sub: 'La page recherchée n’existe pas, a été déplacée, ou n’a peut-être jamais existé.',
      backHome: 'Retour à l’accueil',
      viewProjects: 'Voir les projets',
      sectionLabel: '01 &mdash; Ailleurs',
      sectionHeading: 'Peut-être l’une de celles-ci',
      tag: 'Page',
      cards: [
        { h: 'À propos', p: 'Le fondateur, le parcours et l’expérience derrière le cabinet.', id: 'about' },
        { h: 'Projets', p: 'BIRDBench, Swiss Law Collection et Eclipse FreeBIRD Tools.', id: 'work' },
        { h: 'Contact', p: 'Cahiers des charges, idées encore floues et premiers contacts sont tous bienvenus.', id: 'contact' },
      ],
    },
  },
};
