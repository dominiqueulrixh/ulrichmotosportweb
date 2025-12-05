import type { Core } from '@strapi/strapi';

const defaultNavigationData = {
  phone: '+41552201570',
  email: 'info@ulrich-motosport.ch',
  tagline: '20+ Jahre Erfahrung'
};

const defaultHeroData = {
  eyebrow: 'Ulrich Motosport',
  title: 'Dein Motorrad\nin besten',
  highlight: 'Händen',
  primaryCtaLabel: 'Termin vereinbaren',
  primaryCtaTarget: 'contact',
  secondaryCtaLabel: 'Unsere Services',
  secondaryCtaTarget: 'services',
  stats: [
    { value: '20+', label: 'Jahre Erfahrung', description: 'Jahre Erfahrung' },
    { value: '3', label: 'Markenvertretungen', description: 'Markenvertretungen' },
    { value: '100%', label: 'Leidenschaft', description: 'Leidenschaft' }
  ]
};

const defaultServicesData = {
  eyebrow: 'Leistungen',
  heading: 'Was wir für dich tun',
  subheading: 'Von Service über Reparaturen bis zu Umbauten – wir kümmern uns um dein Bike.',
  items: [
    { title: 'Motorrad Service', description: 'Professionelle Wartung und Inspektion für alle Marken', iconName: 'Wrench' },
    { title: 'Reparaturen', description: 'Von Ölwechsel bis Motorrevision', iconName: 'Settings' },
    { title: 'Individualisierung', description: 'Gestalte dein Bike nach deinen Wünschen', iconName: 'Sparkles' },
    { title: 'Oldtimer / Veteranen', description: 'Restauration klassischer Motorräder', iconName: 'History' },
    { title: 'MFK Bereitstellung', description: 'Vorbereitung für die Kontrolle', iconName: 'FileCheck' },
    { title: 'Occasionen', description: 'Geprüfte Gebrauchtmotorräder', iconName: 'Bike' },
    { title: 'Motorradvermietung', description: 'Miete dein Traumbike', iconName: 'Key' },
    { title: 'Motorrad Zubehör', description: 'Teile und Zubehör für dein Bike', iconName: 'Package' }
  ],
  detailsHeading: 'Wir halten Dein Bike im Schuss',
  detailsSubheading:
    'Wir helfen Dir bei der Individualisierung und technischen Änderungen an Deinem Bike und kümmern uns selbstverständlich auch um deinen Oldtimer oder Veteran.',
  categories: [
    {
      title: 'Service / Reparaturen',
      description:
        'Vom Ölwechsel über Reifenwechsel bis zur Revision Deines Motors sorgen wir dafür, dass Du pannensicher durch die Saison kommst.',
      items: [
        { text: 'Ölwechsel & Filterwechsel' },
        { text: 'Reifenwechsel & Auswuchten' },
        { text: 'Bremswartung & Bremsflüssigkeit' },
        { text: 'Kettenservice & Ritzelwechsel' },
        { text: 'Motorrevision' },
        { text: 'Elektrik & Elektronik' }
      ]
    },
    {
      title: 'Individualisierung',
      description:
        'Du möchtest Deinem Bike noch den letzten Schliff geben? Wir von Ulrich Motosport helfen Dir, Dein Bike nach Deinen Wünschen zu gestalten.',
      items: [
        { text: 'Auspuffanlagen & Sound-Tuning' },
        { text: 'Heck-Umbauten' },
        { text: 'Lenker & Fussrasten' },
        { text: 'Navigation & Elektronik' },
        { text: 'Lackierung & Folierung' },
        { text: 'Performance-Upgrades' }
      ]
    },
    {
      title: 'Oldtimer / Veteranen',
      description:
        'Gerne kümmern wir uns auch um Deinen Oldtimer oder Veteran. Viel Erfahrung und Liebe zum Detail garantieren Dir Zuverlässigkeit.',
      items: [
        { text: 'Restauration & Aufbereitung' },
        { text: 'Originalteile-Beschaffung' },
        { text: 'Motor-Überholung' },
        { text: 'Vergaser-Service' },
        { text: 'Lackrestaurierung' },
        { text: 'Historische Prüfungen' }
      ]
    }
  ]
};

const defaultBrandsData = {
  eyebrow: 'Marken',
  heading: 'Offizielle Vertretungen',
  subheading: 'Wir sind stolze Partner führender Motorradmarken.',
  items: [
    { name: 'SUZUKI', description: 'Offizielle Vertretung für Motorräder und Ersatzteile' },
    { name: 'NIU', description: 'Elektrische Motorroller der neuesten Generation' },
    { name: 'BETA', description: 'Racing Motorräder für höchste Ansprüche' }
  ]
};

const defaultTeamData = {
  eyebrow: 'Über uns',
  heading: 'Unser Team',
  subheading: 'Drei Profis mit einer gemeinsamen Leidenschaft: Motorräder',
  members: [
    {
      name: 'Richi',
      role: 'Geschäftsführer & Motorradmechaniker',
      experience: '20+ Jahre Erfahrung',
      specialization: 'Spezialist für Oldtimer & Restaurationen'
    },
    {
      name: 'Tarik',
      role: 'Motorradmechaniker',
      experience: '15 Jahre Erfahrung',
      specialization: 'Spezialist für Elektronik & Tuning'
    },
    {
      name: 'Claudia',
      role: 'Motorradmechaniker',
      experience: '8 Jahre Erfahrung',
      specialization: 'Spezialist für Sportmotorräder'
    }
  ],
  story:
    '<p>Was 2001 als kleine Werkstatt begann, ist heute eine etablierte Adresse für Motorradbegeisterte in der Region Rüti. Mit über 20 Jahren Erfahrung bieten wir professionellen Service für alle Motorradmarken.</p><p>Als offizielle Vertretung von Suzuki, NIU und Beta Racing kombinieren wir fundiertes Fachwissen mit modernster Technik. Gleichzeitig pflegen wir die Kunst der traditionellen Motorradmechanik – besonders bei Oldtimern und Veteranen.</p><p>Unser 3-köpfiges Team vereint unterschiedliche Spezialisierungen, sodass wir für jedes Anliegen den richtigen Experten haben.</p>'
};

const defaultContactData = {
  eyebrow: 'Kontakt',
  heading: 'Besuche uns in Rüti',
  subheading: 'Wir freuen uns auf deinen Besuch oder deine Nachricht',
  cards: [
    {
      type: 'phone' as const,
      title: 'Telefon',
      description: '055 220 15 70',
      lines: [] as { text: string }[],
      actionValue: '+41552201570'
    },
    {
      type: 'email' as const,
      title: 'E-Mail',
      description: 'info@ulrich-motosport.ch',
      lines: [] as { text: string }[],
      actionValue: 'info@ulrich-motosport.ch'
    },
    {
      type: 'address' as const,
      title: 'Adresse',
      lines: [
        { text: 'Werkstattstrasse XX' },
        { text: '8630 Rüti ZH' },
        { text: 'Schweiz' }
      ]
    },
    {
      type: 'hours' as const,
      title: 'Öffnungszeiten',
      lines: [
        { text: 'Mo - Fr: 08:00 - 12:00 / 13:30 - 18:00' },
        { text: 'Sa: 08:00 - 12:00' },
        { text: 'So: Geschlossen' }
      ]
    }
  ],
  mapEmbedUrl: 'https://www.google.com/maps?q=Ulrich+Motosport+R%C3%BCti+ZH&output=embed&z=15',
  mapLabel: 'Google Maps Integration',
  mapDescription: '8630 Rüti ZH'
};

const defaultFooterData = {
  description:
    'Ihr Motorrad-Spezialist in Rüti seit über 30 Jahren. Service, Reparatur und Occasionen für alle Marken.',
  services: [
    { text: 'Motorrad Service' },
    { text: 'Reparaturen' },
    { text: 'MFK Bereitstellung' },
    { text: 'Individualisierung' },
    { text: 'Oldtimer Service' },
    { text: 'Vermietung' }
  ],
  socials: [
    { platform: 'facebook', url: '#' },
    { platform: 'instagram', url: '#' },
    { platform: 'youtube', url: '#' }
  ],
  legalText: '© 2024 Ulrich Motosport. Alle Rechte vorbehalten.'
};

async function ensureSingleType(
  strapi: Core.Strapi,
  uid: `${string}.${string}`,
  data: Record<string, unknown>
) {
  const existing = await strapi.entityService.findMany(uid as any);
  if (!existing || (Array.isArray(existing) && existing.length === 0)) {
    await strapi.entityService.create(uid as any, {
      data: {
        ...data,
        publishedAt: new Date().toISOString()
      }
    });
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureSingleType(strapi, 'api::navigation.navigation', defaultNavigationData);
    await ensureSingleType(strapi, 'api::hero.hero', defaultHeroData);
    await ensureSingleType(strapi, 'api::service-section.service-section', defaultServicesData);
    await ensureSingleType(strapi, 'api::brand-section.brand-section', defaultBrandsData);
    await ensureSingleType(strapi, 'api::team.team', defaultTeamData);
    await ensureSingleType(strapi, 'api::contact.contact', defaultContactData);
    await ensureSingleType(strapi, 'api::footer.footer', defaultFooterData);
  }
};
