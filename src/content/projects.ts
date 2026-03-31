export type Project = {
  id: string
  title: string
  summary: string
  tags: string[]
  year?: string
  /** Static thumbnail for project cards when not using `coverVideo`. */
  coverImage?: string
  /** Optional override: cards use this video instead of the first `gallery` video or `coverImage`. */
  coverVideo?: string
  gallery: (
    | { kind?: 'image'; src: string; alt: string }
    | {
        kind: 'pair'
        label: string
        front: { src: string; alt: string }
        back: { src: string; alt: string }
      }
    | { kind: 'video'; src: string; alt: string; poster?: string }
    | {
        kind: 'group'
        id: string
        title: string
        summary?: string
        cover?: { src: string; alt: string }
        items: { src: string; alt: string }[]
      }
    | {
        kind: 'book'
        id: string
        title?: string
        pages: { src: string; alt: string; label: string }[]
      }
    | {
        kind: 'brochure'
        cover: { src: string; alt: string }
        inside: { src: string; alt: string }
        caption?: string
      }
  )[]
  downloads?: { label: string; href: string }[]
}

/** Display order for /projects filter chips — keep `Project.tags` aligned with this vocabulary. */
export const PROJECT_FILTER_TAG_ORDER = [
  'Branding',
  'Logo Design',
  'Event',
  'Flyer',
  'Social',
  'Print',
  'Motion',
  'Video',
  'Mockups',
  'Templates',
  'Wedding',
  'Stationery',
  'Apparel',
  'Layout',
] as const

export function getProjectFilterTags(): string[] {
  const used = new Set(projects.flatMap((p) => p.tags))
  const primary = PROJECT_FILTER_TAG_ORDER.filter((t) => used.has(t))
  const secondary = [...used]
    .filter((t) => !PROJECT_FILTER_TAG_ORDER.includes(t as (typeof PROJECT_FILTER_TAG_ORDER)[number]))
    .sort()
  return [...primary, ...secondary]
}

export const projects: Project[] = [
  {
    id: 'unity-hospice',
    title: 'Unity Hospice',
    summary:
      'Brand identity system exploring compassionate, modern healthcare visuals across print + digital.',
    tags: ['Branding', 'Print', 'Social'],
    year: '2026',
    coverImage: '/assets/hospice/Cover.png',
    gallery: [
      {
        kind: 'book',
        id: 'hospice-guidelines',
        title: 'Unity Hospice — brand guidelines',
        pages: [
          { src: '/assets/hospice/Cover.png', alt: 'Unity Hospice cover', label: 'Cover' },
          {
            src: '/assets/hospice/Logo System.png',
            alt: 'Unity Hospice logo system',
            label: 'Page 1 — Logo system',
          },
          {
            src: '/assets/hospice/Color Palette.png',
            alt: 'Unity Hospice color system',
            label: 'Page 2 — Color system',
          },
          {
            src: '/assets/hospice/Typography.png',
            alt: 'Unity Hospice typography',
            label: 'Page 3 — Typography',
          },
          {
            src: '/assets/hospice/Layout System.png',
            alt: 'Unity Hospice layout system',
            label: 'Page 4 — Layout system',
          },
        ],
      },
      {
        kind: 'brochure',
        cover: {
          src: '/assets/hospice/Tri-Fold Brochure.png',
          alt: 'Tri-fold brochure cover',
        },
        inside: {
          src: '/assets/hospice/tri-fold-inside.png',
          alt: 'Tri-fold inside spread — What Is Hospice Care?',
        },
        caption: 'Tri-fold brochure — cover & inside (click mockup to flip)',
      },
      {
        kind: 'group',
        id: 'hospice-social',
        title: 'Social media campaign',
        summary: 'Overview plus individual post layouts.',
        cover: {
          src: '/assets/hospice/Social Media Campaign.png',
          alt: 'Social media campaign overview',
        },
        items: [
          {
            src: '/assets/hospice/Social Media Campaign.png',
            alt: 'Social media campaign — overview',
          },
          {
            src: '/assets/hospice/Social-Media-Campaign-2.png',
            alt: 'Social media campaign — layout 2',
          },
          {
            src: '/assets/hospice/Social-Media-Campaign-3.png',
            alt: 'Social media campaign — layout 3',
          },
          {
            src: '/assets/hospice/Social-Media-Campaign-4.png',
            alt: 'Social media campaign — layout 4',
          },
          {
            src: '/assets/hospice/Social-Media-Campaign-5.png',
            alt: 'Social media campaign — layout 5',
          },
        ],
      },
    ],
    downloads: [
      {
        label: 'Brand guidelines (PDF)',
        href: '/assets/hospice/Unity-Hospice-Brand-Guidelines.pdf',
      },
    ],
  },
  {
    id: 'papine-worship-events',
    title: 'Papine Church — worship events',
    summary:
      'Event motion, flyers, and social graphics for Papine New Testament Church of God — Tehillah Vol. 2, Battle Praise, Night of Worship, and Youth Movie Night (Overcomer).',
    tags: ['Event', 'Flyer', 'Social', 'Motion'],
    year: '2022',
    coverVideo: '/assets/papine-events/tehilla-vol-2.mp4',
    coverImage: '/assets/papine-events/tehilla-vol-2-official.png',
    gallery: [
      {
        kind: 'video',
        src: '/assets/papine-events/tehilla-vol-2.mp4',
        alt: 'Tehillah Vol. 2 — event motion / promo (Papine New Testament Church of God)',
        poster: '/assets/papine-events/tehilla-vol-2-official.png',
      },
      {
        kind: 'video',
        src: '/assets/papine-events/movie-night-promo.mp4',
        alt: 'Youth Department Movie Night — Overcomer promo (NTCOG Papine)',
        poster: '/assets/papine-events/movie-night-poster.png',
      },
      {
        src: '/assets/papine-events/movie-night-poster.png',
        alt: 'Youth Department Movie Night — Overcomer flyer (NTCOG Papine)',
      },
      {
        src: '/assets/papine-events/tehilla-vol-2-official.png',
        alt: 'Tehillah Vol. 2 — Battle Praise event flyer (Papine New Testament Church of God)',
      },
      {
        src: '/assets/papine-events/battle-praise.png',
        alt: 'Battle Praise — landscape title graphic',
      },
      {
        src: '/assets/papine-events/night-of-worship.png',
        alt: 'Tehillah — Night of Worship promotional graphic',
      },
    ],
  },
  {
    id: 'youth-ministry-flyers',
    title: 'Youth ministry flyer',
    summary:
      'High-contrast event layout for a youth department promotion — tuned for quick reads on social and small-format print.',
    tags: ['Event', 'Flyer', 'Social'],
    year: '2022',
    coverImage: '/assets/youth-ministry/youth-department-lyme.png',
    gallery: [
      {
        src: '/assets/youth-ministry/youth-department-lyme.png',
        alt: 'Youth Department — Lyme event flyer',
      },
    ],
  },
  {
    id: 'ntcg-womens-week-2022',
    title: "NTCG Faith Tabernacle — Women's Week 2022",
    summary:
      'Event graphics for NTCG Faith Tabernacle and Women’s Discipleship Ministries — week overview, daily online sessions, health day, and worship service promotions.',
    tags: ['Event', 'Flyer', 'Social'],
    year: '2022',
    coverImage: '/assets/ntcg-womens-week/womens-week-overview.png',
    gallery: [
      {
        src: '/assets/ntcg-womens-week/womens-week-overview.png',
        alt: 'Women’s Week 2022 — Building Women of Purpose & Power, full schedule (March 7–13)',
      },
      {
        src: '/assets/ntcg-womens-week/womens-week-monday-bible-study.png',
        alt: 'Women’s Week — Monday online bible study (Book of Esther)',
      },
      {
        src: '/assets/ntcg-womens-week/womens-week-tuesday-panel.png',
        alt: 'Women’s Week — Tuesday panel discussion, Our Stories of Purpose & Power',
      },
      {
        src: '/assets/ntcg-womens-week/womens-week-thursday-forum.png',
        alt: 'Women’s Week — Thursday online discussion forum',
      },
      {
        src: '/assets/ntcg-womens-week/womens-week-saturday-health-day.png',
        alt: 'Women’s Week — Saturday health day flyer',
      },
      {
        src: '/assets/ntcg-womens-week/womens-week-sunday-worship.png',
        alt: 'Women’s Week — Sunday worship service promotion',
      },
      {
        src: '/assets/ntcg-womens-week/womens-week-sunday-worship-alt.png',
        alt: 'Women’s Week — Sunday worship service (alternate layout)',
      },
    ],
  },
  {
    id: 'ignite-conference',
    title: 'Ignite Conference',
    summary:
      'Conference promotion across 2022–2023 — hero flyers, presentation mockups, multi-page schedule, save-the-date, and Prayer Breakfast print and ticket collateral.',
    tags: ['Event', 'Flyer', 'Mockups', 'Print'],
    year: '2022',
    coverImage: '/assets/ignite-conference/ignite-main-flyer.png',
    gallery: [
      { src: '/assets/ignite-conference/ignite-main-flyer.png', alt: 'Ignite Conference — main flyer' },
      { src: '/assets/ignite-conference/ignite-a4-flyer-mockup.png', alt: 'Ignite Conference — A4 flyer mockup' },
      { src: '/assets/ignite-conference/ignite-landscape-mockup.png', alt: 'Ignite Conference — landscape mockup' },
      { src: '/assets/ignite-conference/prayer-breakfast-flyer.png', alt: 'Prayer Breakfast — official flyer' },
      { src: '/assets/ignite-conference/prayer-breakfast-floating-tickets.png', alt: 'Prayer Breakfast — floating ticket mockup' },
      {
        kind: 'group',
        id: 'ignite-2023',
        title: 'Ignite 2023 campaign',
        summary: 'Updated main flyer, save-the-date, and three-page conference schedule.',
        cover: {
          src: '/assets/ignite-conference/ignite-2023-main-flyer.png',
          alt: 'Ignite Conference 2023 — main flyer',
        },
        items: [
          {
            src: '/assets/ignite-conference/ignite-2023-main-flyer.png',
            alt: 'Ignite Conference 2023 — main flyer (updated)',
          },
          {
            src: '/assets/ignite-conference/ignite-2023-save-the-date.png',
            alt: 'Ignite Conference — save the date 2023',
          },
          {
            src: '/assets/ignite-conference/ignite-2023-schedule-p1.png',
            alt: 'Ignite Conference 2023 — schedule page 1',
          },
          {
            src: '/assets/ignite-conference/ignite-2023-schedule-p2.png',
            alt: 'Ignite Conference 2023 — schedule page 2',
          },
          {
            src: '/assets/ignite-conference/ignite-2023-schedule-p3.png',
            alt: 'Ignite Conference 2023 — schedule page 3',
          },
        ],
      },
      {
        src: '/assets/ignite-conference/prayer-breakfast-landscape.png',
        alt: 'Prayer Breakfast — landscape promotional graphic',
      },
      {
        src: '/assets/ignite-conference/prayer-breakfast-tickets-sheet.png',
        alt: 'Prayer Breakfast — ticket sheet layout',
      },
    ],
  },
  {
    id: 'vbs-logos',
    title: 'VBS Logos (2022–2023)',
    summary:
      'Vacation Bible School identity assets — official logo exports and a featured flyer for event promotion.',
    tags: ['Logo Design', 'Event', 'Print'],
    year: '2023',
    coverImage: '/assets/vbs/vbs-2023-logo.png',
    gallery: [
      {
        src: '/assets/vbs/vbs-2023-logo.png',
        alt: 'VBS 2023 — Lighthouse: Children of Light Reflecting Christ (official logo)',
      },
      { src: '/assets/vbs/vbs-lighthouse-logo.png', alt: 'VBS — lighthouse logo' },
      { src: '/assets/vbs/vbs-2022-logo.png', alt: 'VBS 2022 — official logo' },
      { src: '/assets/vbs/vbs-2022-flyer.png', alt: 'VBS 2022 — official flyer' },
    ],
  },
  {
    id: 'event-templates-mockups',
    title: 'Event & social templates',
    summary:
      'Reusable flyers and social templates — parties, milestones, seasonal posts, and online forum / meeting promos.',
    tags: ['Templates', 'Flyer', 'Social'],
    year: '2022',
    coverImage: '/assets/templates/karaoke-night-flyer.png',
    gallery: [
      { src: '/assets/templates/karaoke-night-flyer.png', alt: 'Karaoke night flyer template' },
      { src: '/assets/templates/moving-forward-flyer.png', alt: 'Moving forward flyer template' },
      { src: '/assets/templates/baby-christening-template.png', alt: 'Baby christening template' },
      { src: '/assets/templates/wdm-christmas-social.png', alt: 'WDM Christmas social graphic' },
      {
        src: '/assets/templates/discussion-forum-template.png',
        alt: 'Discussion forum / online meeting promotional template',
      },
    ],
  },
  {
    id: 'delaine-harold-wedding',
    title: "Delaine & Harold's Wedding",
    summary:
      'Wedding stationery and day-of design — save the date, official invitation, reception piece, ceremony & reception program, welcome signage, and bridal party graphic.',
    tags: ['Wedding', 'Print', 'Stationery'],
    year: '2025',
    coverImage: '/assets/delaine-harold-wedding/save-the-date-official.png',
    gallery: [
      { src: '/assets/delaine-harold-wedding/invitation-official.png', alt: 'Official wedding invitation' },
      { src: '/assets/delaine-harold-wedding/reception-invite.png', alt: 'Reception invite' },
      {
        kind: 'pair',
        label: 'Ceremony & reception program',
        front: {
          src: '/assets/delaine-harold-wedding/artboard-1.png',
          alt: 'Ceremony & reception program — front',
        },
        back: {
          src: '/assets/delaine-harold-wedding/artboard-2.png',
          alt: 'Ceremony & reception program — inside',
        },
      },
      { src: '/assets/delaine-harold-wedding/bridesmaid-group.png', alt: 'Bridesmaid group graphic' },
      { src: '/assets/delaine-harold-wedding/welcome-sign.png', alt: 'Welcome sign' },
    ],
  },
  {
    id: 'modern-minimalist-logos',
    title: 'Modern Minimalist Logos',
    summary:
      'A sleek, high-contrast logo design showcase presented with premium mockups and brand previews.',
    tags: ['Logo Design', 'Branding', 'Mockups'],
    year: '2025',
    coverImage: '/assets/modern-minimalist/velora-preview.png',
    gallery: [
      {
        kind: 'group',
        id: 'velora',
        title: 'Velora',
        items: [
          { src: '/assets/modern-minimalist/velora-preview.png', alt: 'Velora — brand identity preview' },
          { src: '/assets/modern-minimalist/more/velora-wordmark.png', alt: 'Velora — wordmark' },
          { src: '/assets/modern-minimalist/more/ar-realty-logo.png', alt: 'AR Realty — logo' },
        ],
      },
      {
        kind: 'group',
        id: 'morva',
        title: 'Morva',
        items: [
          { src: '/assets/modern-minimalist/more/velora-bottle-mock.png', alt: 'Velora — bottle mockup' },
          { src: '/assets/modern-minimalist/more/morva-logo.png', alt: 'Morva Coffee — logo' },
        ],
      },
      {
        kind: 'group',
        id: 'nexora',
        title: 'Nexora',
        items: [
          { src: '/assets/modern-minimalist/more/nexora-mark.png', alt: 'Nexora — mark' },
          { src: '/assets/modern-minimalist/more/nexora-wordmark.png', alt: 'Nexora — wordmark' },
          { src: '/assets/modern-minimalist/nexora-laptop.png', alt: 'Nexora — laptop mockup' },
          { src: '/assets/modern-minimalist/more/alvera-tag.png', alt: 'Alvéra — tag design' },
        ],
      },
      {
        kind: 'group',
        id: 'ar',
        title: 'AR',
        items: [
          { src: '/assets/modern-minimalist/more/nexora-laptop-mock.png', alt: 'Nexora — laptop mockup (variant)' },
          { src: '/assets/modern-minimalist/ar-realty-card.png', alt: 'AR Realty — business card' },
          { src: '/assets/modern-minimalist/more/alvera-hangtag-mock.png', alt: 'Alvéra — hangtag mockup' },
        ],
      },
      {
        kind: 'group',
        id: 'alvera',
        title: 'Alvéra',
        items: [
          { src: '/assets/modern-minimalist/more/ar-realty-sign-mock.png', alt: 'AR Realty — signage mockup' },
          { src: '/assets/modern-minimalist/more/alvera-wordmark.png', alt: 'Alvéra — wordmark' },
          { src: '/assets/modern-minimalist/more/alvera-fabric-mock.png', alt: 'Alvéra — fabric label mockup' },
          { src: '/assets/modern-minimalist/more/morva-cup-mock.png', alt: 'Morva Coffee — cup mockup' },
        ],
      },
      {
        kind: 'group',
        id: 'ironvault',
        title: 'Ironvault',
        items: [
          { src: '/assets/modern-minimalist/more/alvera-label-mock.png', alt: 'Alvéra — label mockup' },
          { src: '/assets/modern-minimalist/more/ironvault-logo.png', alt: 'Ironvault — logo' },
        ],
      },
    ],
  },
  {
    id: 'portfolio-video',
    title: 'Video',
    summary:
      'Motion sample — editing, pacing, and visual storytelling for promotional and social use.',
    tags: ['Video', 'Motion'],
    year: '2025',
    gallery: [
      {
        kind: 'video',
        src: '/assets/video/Video.mp4',
        alt: 'Portfolio video',
      },
    ],
  },
  {
    id: 'mooncoffee',
    title: 'MoonCoffee',
    summary:
      'Coffee brand kit with logo variations, posts, and business card designs.',
    tags: ['Branding', 'Social', 'Print'],
    year: '2025',
    coverImage: '/assets/mooncoffee/BrandSheet.png',
    gallery: [
      { src: '/assets/mooncoffee/BrandSheet.png', alt: 'Brand sheet' },
      { src: '/assets/mooncoffee/MoonBean Logo-01.png', alt: 'Logo 1' },
      { src: '/assets/mooncoffee/MoonBean Logo-02.png', alt: 'Logo 2' },
      { src: '/assets/mooncoffee/MoonBean Logo-03.png', alt: 'Logo 3' },
      { src: '/assets/mooncoffee/Post-01.png', alt: 'Instagram post 1' },
      { src: '/assets/mooncoffee/Post-02.png', alt: 'Instagram post 2' },
      { src: '/assets/mooncoffee/Post-03.png', alt: 'Instagram post 3' },
      {
        kind: 'pair',
        label: 'Business card',
        front: {
          src: '/assets/mooncoffee/Business card-01.png',
          alt: 'MoonCoffee business card front',
        },
        back: {
          src: '/assets/mooncoffee/Business card-02.png',
          alt: 'MoonCoffee business card back',
        },
      },
    ],
  },
  {
    id: 'nova-street',
    title: 'NOVA Street',
    summary:
      'Streetwear concept featuring apparel mockups, editorial poster, and graphic set.',
    tags: ['Apparel', 'Branding', 'Logo Design', 'Mockups'],
    year: '2026',
    coverImage: '/assets/novastreet/NOVA01-01_logo.png',
    gallery: [
      { src: '/assets/novastreet/NOVA01-01_logo.png', alt: 'NOVA logotype' },
      { src: '/assets/novastreet/NOVA01-02_mark.png', alt: 'NOVA monogram mark' },
      { src: '/assets/novastreet/NOVA01-03_lockup.png', alt: 'NOVA logo lockup' },
    ],
  },
  {
    id: 'brum-co',
    title: 'Brum & Co.',
    summary: 'Coffee brand mockups featuring packaging and cup applications.',
    tags: ['Branding', 'Mockups'],
    year: '2025',
    coverImage: '/assets/brum-co/Coffee Bag Mockup.png',
    gallery: [
      { src: '/assets/brum-co/Coffee Bag Mockup.png', alt: 'Coffee bag mockup' },
      { src: '/assets/brum-co/Coffe Cup Mockup.png', alt: 'Coffee cup mockup' },
    ],
  },
  {
    id: 'business-cards',
    title: 'Business Card Concepts',
    summary:
      'A set of clean, modern business card explorations across multiple style directions.',
    tags: ['Print', 'Layout'],
    year: '2025',
    coverImage: '/assets/business-cards/Minimalistic Mockup.png',
    gallery: [
      {
        kind: 'pair',
        label: 'Minimalistic',
        front: { src: '/assets/business-cards/Minimalistic-01.png', alt: 'Minimalistic front' },
        back: { src: '/assets/business-cards/Minimalistic-02.png', alt: 'Minimalistic back' },
      },
      {
        src: '/assets/business-cards/Minimalistic Mockup.png',
        alt: 'Minimalistic — lifestyle mockup',
      },
      {
        kind: 'pair',
        label: 'Maximalist',
        front: { src: '/assets/business-cards/Maximalist-01.png', alt: 'Maximalist front' },
        back: { src: '/assets/business-cards/Maximalist-02.png', alt: 'Maximalist back' },
      },
      {
        kind: 'pair',
        label: 'Abstract',
        front: { src: '/assets/business-cards/Abstract-01.png', alt: 'Abstract front' },
        back: { src: '/assets/business-cards/Abstract-02.png', alt: 'Abstract back' },
      },
      {
        src: '/assets/business-cards/Abstract-Mockup.png',
        alt: 'Abstract — lifestyle mockup',
      },
      {
        kind: 'pair',
        label: 'Eco',
        front: { src: '/assets/business-cards/Eco-01.png', alt: 'Eco front' },
        back: { src: '/assets/business-cards/Eco-02.png', alt: 'Eco back' },
      },
      {
        kind: 'pair',
        label: 'Photo-based',
        front: { src: '/assets/business-cards/Photo-based-01.png', alt: 'Photo-based front' },
        back: { src: '/assets/business-cards/Photo-based-02.png', alt: 'Photo-based back' },
      },
      {
        src: '/assets/business-cards/Photo-based Mockup.png',
        alt: 'Photo-based — lifestyle mockup',
      },
      {
        kind: 'pair',
        label: 'Retro',
        front: { src: '/assets/business-cards/Retro-01.png', alt: 'Retro front' },
        back: { src: '/assets/business-cards/Retro-02.png', alt: 'Retro back' },
      },
      {
        kind: 'pair',
        label: 'Monogram',
        front: { src: '/assets/business-cards/Monogram-01.png', alt: 'Monogram front' },
        back: { src: '/assets/business-cards/Monogram-02.png', alt: 'Monogram back' },
      },
      {
        kind: 'pair',
        label: 'Tech',
        front: { src: '/assets/business-cards/Tech-01.png', alt: 'Tech front' },
        back: { src: '/assets/business-cards/Tech-02.png', alt: 'Tech back' },
      },
      {
        kind: 'pair',
        label: 'Typographic',
        front: { src: '/assets/business-cards/Typographic-01.png', alt: 'Typographic front' },
        back: { src: '/assets/business-cards/Typographic-02.png', alt: 'Typographic back' },
      },
      {
        kind: 'pair',
        label: 'Vertical',
        front: { src: '/assets/business-cards/Vertical-01.png', alt: 'Vertical front' },
        back: { src: '/assets/business-cards/Vertical-02.png', alt: 'Vertical back' },
      },
    ],
  },
]

export function getProjectById(projectId: string) {
  return projects.find((p) => p.id === projectId)
}

/** Home page “Selected work” — curated for breadth: systems, logos, conference suite, motion. */
export const FEATURED_PROJECT_IDS = [
  'unity-hospice',
  'modern-minimalist-logos',
  'ignite-conference',
  'papine-worship-events',
] as const

export function getFeaturedProjects(): Project[] {
  return FEATURED_PROJECT_IDS.map((id) => getProjectById(id)).filter(
    (p): p is Project => p !== undefined,
  )
}

