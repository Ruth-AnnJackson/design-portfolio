import type { ServiceSlug } from './services'

export type Project = {
  id: string
  title: string
  summary: string
  tags: string[]
  /** Work category slugs — order on `/work` is defined in `workCategories`. */
  services: ServiceSlug[]
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
    | { kind: 'video'; src: string; alt: string; poster?: string; disclaimer?: string }
    | {
        kind: 'group'
        id: string
        title: string
        summary?: string
        cover?: { src: string; alt: string }
        items: { src: string; alt: string }[]
        /** Wide PNG (e.g. phone strip) — full container width, natural image aspect. */
        wideMockup?: boolean
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
    | {
        kind: 'brochureRow'
        id: string
        title?: string
        summary?: string
        /** Shown beside the flip mockup on the first row (optional). */
        logo?: { src: string; alt: string }
        studio: { src: string; alt: string }
        brochure: {
          cover: { src: string; alt: string }
          inside: { src: string; alt: string }
          caption?: string
        }
      }
  )[]
  downloads?: { label: string; href: string }[]
  /**
   * When true, the category grid opens a fullscreen lightbox instead of `/projects/:id`.
   * Use for single-board studies where a detail page would be redundant.
   */
  lightboxOnly?: boolean
}

export const projects: Project[] = [
  {
    id: 'unity-hospice',
    title: 'Unity Hospice',
    summary: 'Healthcare brand—guidelines, print, social.',
    tags: ['Branding', 'Print', 'Social'],
    services: ['branding'],
    year: '2026',
    coverImage: '/assets/branding/unity-hospice/Cover.png',
    gallery: [
      {
        kind: 'book',
        id: 'hospice-guidelines',
        title: 'Unity Hospice — brand guidelines',
        pages: [
          { src: '/assets/branding/unity-hospice/Cover.png', alt: 'Unity Hospice cover', label: 'Cover' },
          {
            src: '/assets/branding/unity-hospice/Logo System.png',
            alt: 'Unity Hospice logo system',
            label: 'Page 1 — Logo system',
          },
          {
            src: '/assets/branding/unity-hospice/Color Palette.png',
            alt: 'Unity Hospice color system',
            label: 'Page 2 — Color system',
          },
          {
            src: '/assets/branding/unity-hospice/Typography.png',
            alt: 'Unity Hospice typography',
            label: 'Page 3 — Typography',
          },
          {
            src: '/assets/branding/unity-hospice/Layout System.png',
            alt: 'Unity Hospice layout system',
            label: 'Page 4 — Layout system',
          },
        ],
      },
      {
        kind: 'brochureRow',
        id: 'hospice-trifold',
        title: 'Tri-fold brochure',
        summary: 'Logo and flat mockup on one row; wood studio mockup full width below.',
        logo: {
          src: '/assets/branding/unity-hospice/hospice-logo-mark.jpg',
          alt: 'Unity Hospice — logo mark (heart and hands)',
        },
        studio: {
          src: '/assets/branding/unity-hospice/tri-fold-studio-mockup.png',
          alt: 'Brochure mockup on wood',
        },
        brochure: {
          cover: {
            src: '/assets/branding/unity-hospice/Tri-Fold Brochure.png',
            alt: 'Tri-fold cover (flat)',
          },
          inside: {
            src: '/assets/branding/unity-hospice/tri-fold-inside.png',
            alt: 'Tri-fold inside spread — What Is Hospice Care? (flat)',
          },
          caption: 'Tri-fold brochure (flat) — click mockup to flip',
        },
      },
      {
        kind: 'group',
        id: 'hospice-social',
        title: 'Social media campaign',
        wideMockup: true,
        summary:
          'Five-slide carousel strip — same 4:5 art in a row; slide 3 in-feed, 1–2 and 4–5 beside the device.',
        cover: {
          src: '/assets/branding/unity-hospice/mockups/mockup-social-carousel.png',
          alt: 'Unity Hospice social — five-tile carousel strip mockup (slide 3 on phone)',
        },
        items: [
          {
            src: '/assets/branding/unity-hospice/mockups/mockup-social-carousel.png',
            alt: 'Unity Hospice social — five-tile carousel strip mockup (slide 3 on phone)',
          },
        ],
      },
    ],
    downloads: [
      {
        label: 'Brand guidelines (PDF)',
        href: '/assets/branding/unity-hospice/Unity-Hospice-Brand-Guidelines.pdf',
      },
    ],
  },
  {
    id: 'motion-studies',
    title: 'Logo & type motion',
    summary: 'Logo animation and kinetic type.',
    tags: ['Motion', 'Logo'],
    services: ['motion'],
    year: '2025',
    coverVideo: `/assets/motion-graphics/${encodeURIComponent('Adidas Logo Anim.mp4')}`,
    gallery: [
      {
        kind: 'video',
        src: `/assets/motion-graphics/${encodeURIComponent('Adidas Logo Anim.mp4')}`,
        alt: 'Adidas logo — animation study',
        disclaimer:
          'Personal practice piece only. Not affiliated with, endorsed by, or commissioned by adidas AG or any of its brands.',
      },
      {
        kind: 'video',
        src: '/assets/motion-graphics/creative-text-anim.mp4',
        alt: 'Creative kinetic type — motion study',
      },
    ],
  },
  {
    id: 'papine-worship-events',
    title: 'Papine Church — youth promo',
    summary: 'Youth movie night promo.',
    tags: ['Video', 'Ministry', 'Youth'],
    services: ['video'],
    year: '2022',
    coverVideo: '/assets/video-production/movie-night-promo.mp4',
    gallery: [
      {
        kind: 'video',
        src: '/assets/video-production/movie-night-promo.mp4',
        alt: 'Youth Department Movie Night — Overcomer promo (NTCOG Papine)',
      },
    ],
  },
  {
    id: 'youth-ministry-flyers',
    title: 'Youth ministry flyer',
    summary: 'Youth event flyer.',
    tags: ['Event', 'Flyer', 'Social'],
    services: ['flyers'],
    year: '2022',
    coverImage: '/assets/flyers-events/youth-ministry-flyers/youth-department-lyme.png',
    gallery: [
      {
        src: '/assets/flyers-events/youth-ministry-flyers/youth-department-lyme.png',
        alt: 'Youth Department — Lyme event flyer',
      },
    ],
  },
  {
    id: 'ntcg-womens-week-2022',
    title: "NTCG Faith Tabernacle — Women's Week 2022",
    summary: 'Women’s week—schedule and session promos.',
    tags: ['Event', 'Flyer', 'Social'],
    services: ['flyers'],
    year: '2022',
    coverImage: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-overview.png',
    gallery: [
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-overview.png',
        alt: 'Women’s Week 2022 — Building Women of Purpose & Power, full schedule (March 7–13)',
      },
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-monday-bible-study.png',
        alt: 'Women’s Week — Monday online bible study (Book of Esther)',
      },
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-tuesday-panel.png',
        alt: 'Women’s Week — Tuesday panel discussion, Our Stories of Purpose & Power',
      },
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-thursday-forum.png',
        alt: 'Women’s Week — Thursday online discussion forum',
      },
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-friday-movie-night.png',
        alt: 'Women’s Week 2022 — Movie Night: Esther, Friday March 11 at 7 PM',
      },
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-saturday-health-day.png',
        alt: 'Women’s Week 2022 — Health Day (Saturday, March 12)',
      },
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-sunday-worship.png',
        alt: 'Women’s Week — Sunday worship service promotion',
      },
      {
        src: '/assets/flyers-events/ntcg-womens-week-2022/womens-week-sunday-worship-alt.png',
        alt: 'Women’s Week — Sunday worship service (alternate layout)',
      },
    ],
  },
  {
    id: 'wdm-lorna-campbell-appointment',
    title: 'WDM — new secretary appointment',
    summary: 'Announcement graphic for Women’s Discipleship Ministries (NTCG Dudley District).',
    tags: ['Publication', 'Church', 'Layout'],
    services: ['publications'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/publications/ntcg-wdm/lorna-campbell-secretary-appointment.png',
    gallery: [
      {
        src: '/assets/publications/ntcg-wdm/lorna-campbell-secretary-appointment.png',
        alt: 'New appointment — Sister Lorna Campbell, Secretary of Women’s Discipleship Ministries, NTCG Dudley District of Churches',
      },
    ],
  },
  {
    id: 'pastors-appreciation-portrait',
    title: "Pastor's appreciation — official portrait",
    summary: 'Full-color commemorative portrait layout (print-ready PDF).',
    tags: ['Publication', 'Church', 'Print'],
    services: ['publications'],
    year: '2023',
    lightboxOnly: true,
    coverImage: '/assets/publications/pastors-appreciation/pastors-appreciation-portrait-preview.jpg',
    gallery: [
      {
        src: '/assets/publications/pastors-appreciation/pastors-appreciation-portrait-preview.jpg',
        alt: "Pastor's appreciation — official colored portrait (preview)",
      },
    ],
  },
  {
    id: 'papine-church-flyers',
    title: 'NTCOG Papine — ministry flyers',
    summary: 'Evangelism BBQ, children’s church, young adults.',
    tags: ['Event', 'Flyer', 'Church'],
    services: ['flyers'],
    year: '2022',
    coverImage: '/assets/flyers-events/papine-church-flyers/evangelism-bbq-march-2022.png',
    gallery: [
      {
        src: '/assets/flyers-events/papine-church-flyers/evangelism-bbq-march-2022.png',
        alt: 'Evangelism barbecue — Life Builders Ministry, March 19, 2022',
      },
      {
        src: '/assets/flyers-events/papine-church-flyers/children-church-summer-sizzle-july-2022.png',
        alt: 'Little Treasures — Children Church Summer Sizzle, July 2022',
      },
      {
        src: '/assets/flyers-events/papine-church-flyers/young-adults-5-ways-june-2022.png',
        alt: 'Young Adults — 5 Ways to Set Your House on Fire, June 3, 2022',
      },
    ],
  },
  {
    id: 'ignite-conference-promo',
    title: 'Ignite Conference',
    summary: 'Official 2023 conference promo video.',
    tags: ['Event', 'Video'],
    services: ['video'],
    year: '2023',
    coverVideo: `/assets/video-production/ignite-conference/${encodeURIComponent('OFFICIAL IGNITE CONFERENCE 2023 PROMO VIDEO.mov')}`,
    gallery: [
      {
        kind: 'video',
        src: `/assets/video-production/ignite-conference/${encodeURIComponent('OFFICIAL IGNITE CONFERENCE 2023 PROMO VIDEO.mov')}`,
        alt: 'Ignite Conference 2023 — official promo video',
      },
    ],
  },
  {
    id: 'ignite-conference-flyers',
    title: 'Ignite Conference',
    summary: '2022–2023 conference flyers, save-the-date, and Prayer Breakfast print pieces.',
    tags: ['Event', 'Flyer', 'Print'],
    services: ['flyers'],
    year: '2022',
    coverImage: '/assets/flyers-events/ignite-conference/ignite-main-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/ignite-conference/ignite-main-flyer.png',
        alt: 'Ignite Conference — main flyer (2022)',
      },
      {
        src: '/assets/flyers-events/ignite-conference/ignite-2023-main-flyer.png',
        alt: 'Ignite Conference 2023 — main flyer',
      },
      {
        src: '/assets/flyers-events/ignite-conference/ignite-2023-save-the-date.png',
        alt: 'Ignite Conference 2023 — save the date',
      },
      {
        src: '/assets/flyers-events/ignite-conference/ignite-2022-circular-badge.png',
        alt: 'Ignite Conference 2022 — circular flame emblem',
      },
      {
        src: '/assets/flyers-events/ignite-conference/ignite-2023-circular-badge.png',
        alt: 'Ignite Conference 2023 — circular flame emblem',
      },
      {
        src: '/assets/flyers-events/ignite-conference/ignite-a4-flyer-mockup.png',
        alt: 'Ignite Conference — A4 flyer mockup',
      },
      {
        src: '/assets/flyers-events/ignite-conference/ignite-landscape-mockup.png',
        alt: 'Ignite Conference — landscape flyer mockup',
      },
      {
        src: '/assets/flyers-events/ignite-conference/prayer-breakfast-flyer.png',
        alt: 'Ignite Prayer Breakfast — flyer',
      },
      {
        src: '/assets/flyers-events/ignite-conference/prayer-breakfast-landscape.png',
        alt: 'Ignite Prayer Breakfast — landscape flyer',
      },
      {
        src: '/assets/flyers-events/ignite-conference/prayer-breakfast-floating-tickets.png',
        alt: 'Ignite Prayer Breakfast — floating ticket mockup',
      },
      {
        src: '/assets/flyers-events/ignite-conference/prayer-breakfast-tickets-sheet.png',
        alt: 'Ignite Prayer Breakfast — tickets sheet',
      },
    ],
  },
  {
    id: 'ignite-conference',
    title: 'Ignite Conference',
    summary: '2022–2023 event suite—flyers, circular marks, programme PDF, apparel mockups, and promo video.',
    tags: ['Event', 'Flyer', 'Mockups', 'Print', 'Branding', 'Video'],
    services: ['branding'],
    year: '2022',
    coverImage: '/assets/flyers-events/ignite-conference/ignite-main-flyer.png',
    downloads: [
      {
        label: 'Conference programme (PDF)',
        href: '/assets/publications/ignite-conference/ignite-programme-2022.pdf',
      },
    ],
    gallery: [
      {
        kind: 'video',
        src: `/assets/video-production/ignite-conference/${encodeURIComponent('OFFICIAL IGNITE CONFERENCE 2023 PROMO VIDEO.mov')}`,
        alt: 'Ignite Conference 2023 — official promo video',
      },
      {
        kind: 'group',
        id: 'ignite-2022',
        title: 'Ignite 2022',
        summary: 'Conference hero flyers and Prayer Breakfast suite.',
        cover: {
          src: '/assets/flyers-events/ignite-conference/ignite-main-flyer.png',
          alt: 'Ignite Conference — main flyer',
        },
        items: [
          {
            src: '/assets/flyers-events/ignite-conference/ignite-main-flyer.png',
            alt: 'Ignite Conference — main flyer',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2022-circular-badge.png',
            alt: 'Ignite Conference 2022 — circular flame emblem (navy)',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-a4-flyer-mockup.png',
            alt: 'Ignite Conference — A4 flyer mockup',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-landscape-mockup.png',
            alt: 'Ignite Conference — landscape mockup',
          },
          {
            src: '/assets/flyers-events/ignite-conference/prayer-breakfast-floating-tickets.png',
            alt: 'Prayer Breakfast — floating ticket mockup',
          },
          {
            src: '/assets/flyers-events/ignite-conference/prayer-breakfast-landscape.png',
            alt: 'Prayer Breakfast — landscape promotional graphic',
          },
        ],
      },
      {
        kind: 'group',
        id: 'ignite-2023',
        title: 'Ignite 2023',
        summary: 'Main flyer, save-the-date, circular mark, guests, schedule, and more.',
        cover: {
          src: '/assets/flyers-events/ignite-conference/ignite-2023-main-flyer.png',
          alt: 'Ignite Conference 2023 — main flyer',
        },
        items: [
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-main-flyer.png',
            alt: 'Ignite Conference 2023 — main flyer',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-save-the-date.png',
            alt: 'Ignite Conference 2023 — save the date',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-circular-badge.png',
            alt: 'Ignite Conference 2023 — circular flame emblem',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-one-week-to-go.png',
            alt: 'Ignite — 1 week to go (countdown promo)',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-guest-psalmist.png',
            alt: 'Ignite 2023 — guest psalmist',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-guest-speaker.png',
            alt: 'Ignite 2023 — guest speaker',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-evangelist-isaiah-dyer-promo.png',
            alt: 'Ignite 2023 — Evangelist Isaiah Raymond Dyer, guest speaker (Come Alive! Ezekiel 37)',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-prayer-breakfast.png',
            alt: 'Ignite 2023 — Prayer Breakfast',
          },
          {
            src: '/assets/flyers-events/ignite-conference/ignite-2023-schedule.png',
            alt: 'Ignite 2023 — schedule overview',
          },
        ],
      },
      {
        kind: 'pair',
        label: 'Conference tee mockup',
        front: {
          src: '/assets/flyers-events/ignite-conference/ignite-conference-tshirt-front-mockup.png',
          alt: 'Ignite Conference — NTCG Faith Tabernacle tee, front mockup',
        },
        back: {
          src: '/assets/flyers-events/ignite-conference/ignite-conference-tshirt-back-mockup.png',
          alt: 'Ignite Conference — circular “Catch the Fire” mark, tee back mockup',
        },
      },
    ],
  },
  {
    id: 'thank-you-boxes',
    title: 'Thank You Boxes',
    summary: 'Gift-box brand mark—ribbon, bow, and curved wordmark.',
    tags: ['Logo Design', 'Branding'],
    services: ['logos'],
    year: '2025',
    coverImage: '/assets/logo-design/thank-you-boxes/thank-you-boxes-logo.png',
    gallery: [
      {
        src: '/assets/logo-design/thank-you-boxes/thank-you-boxes-logo.png',
        alt: 'Thank You Boxes — logo with gift box, ribbon, and curved type',
      },
    ],
  },
  {
    id: 'vbs-logos',
    title: 'VBS Logos (2022–2023)',
    summary: 'VBS marks (2022–2023).',
    tags: ['Logo Design', 'Event', 'Print'],
    services: ['logos'],
    year: '2023',
    coverImage: '/assets/logo-design/vbs-logos/vbs-2023-logo.png',
    gallery: [
      {
        src: '/assets/logo-design/vbs-logos/vbs-2023-logo.png',
        alt: 'VBS 2023 — Lighthouse: Children of Light Reflecting Christ (official logo)',
      },
      { src: '/assets/logo-design/vbs-logos/vbs-lighthouse-logo.png', alt: 'VBS — lighthouse logo' },
      { src: '/assets/logo-design/vbs-logos/vbs-2022-logo.png', alt: 'VBS 2022 — official logo' },
    ],
  },
  {
    id: 'vbs-2022-official-flyer',
    title: 'VBS 2022 — official flyer',
    summary: 'Vacation Bible School promotional flyer.',
    tags: ['Flyer', 'Church', 'Print'],
    services: ['flyers'],
    year: '2022',
    lightboxOnly: true,
    coverImage: '/assets/logo-design/vbs-logos/vbs-2022-flyer.png',
    gallery: [
      {
        src: '/assets/logo-design/vbs-logos/vbs-2022-flyer.png',
        alt: 'VBS 2022 — official flyer',
      },
    ],
  },
  {
    id: 'event-templates-mockups',
    title: 'Event & social templates',
    summary: 'Reusable event and social layouts.',
    tags: ['Templates', 'Flyer', 'Social'],
    services: ['flyers'],
    year: '2022',
    coverImage: '/assets/flyers-events/event-templates-mockups/karaoke-night-flyer.png',
    gallery: [
      { src: '/assets/flyers-events/event-templates-mockups/karaoke-night-flyer.png', alt: 'Karaoke night flyer template' },
      { src: '/assets/flyers-events/event-templates-mockups/moving-forward-flyer.png', alt: 'Moving forward flyer template' },
      { src: '/assets/flyers-events/event-templates-mockups/baby-christening-template.png', alt: 'Baby christening template' },
      { src: '/assets/flyers-events/event-templates-mockups/wdm-christmas-social.png', alt: 'WDM Christmas social graphic' },
      {
        src: '/assets/flyers-events/event-templates-mockups/discussion-forum-template.png',
        alt: 'Discussion forum / online meeting promotional template',
      },
    ],
  },
  {
    id: 'flyer-study-sales',
    title: 'Retail sale flyer',
    summary: 'End-of-season promotion layout—bold type and sale tape accents.',
    tags: ['Flyer', 'Retail', 'Print'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/sales-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/sales-flyer.png',
        alt: 'Retail sale flyer — BIG SALE, up to 70% off',
      },
    ],
  },
  {
    id: 'flyer-study-restaurant',
    title: 'Restaurant promo flyer',
    summary: 'Pizza party deals—photography-forward menu promo.',
    tags: ['Flyer', 'Food', 'Print'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/restaurant-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/restaurant-flyer.png',
        alt: 'Taste House Pizza — party deals and offers',
      },
    ],
  },
  {
    id: 'flyer-study-fitness',
    title: 'Fitness / gym flyer',
    summary: 'Gym membership promo with offer bar and feature bullets.',
    tags: ['Flyer', 'Fitness', 'Print'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/fitness-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/fitness-flyer.png',
        alt: 'IronPulse gym — join now and membership offer',
      },
    ],
  },
  {
    id: 'flyer-study-educational',
    title: 'Educational workshop flyer',
    summary: 'Tech workshop poster—schedule blocks and registration CTA.',
    tags: ['Flyer', 'Education', 'Event'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/educational-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/educational-flyer.png',
        alt: 'Free coding workshop — date, speaker, and topics',
      },
    ],
  },
  {
    id: 'flyer-study-typography',
    title: 'Typography-led event flyer',
    summary: 'Type-first nightlife poster with watermark texture.',
    tags: ['Flyer', 'Typography', 'Event'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/typography-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/typography-flyer.png',
        alt: 'One Night Only — event details',
      },
    ],
  },
  {
    id: 'flyer-study-event',
    title: 'Summer night event flyer',
    summary: 'DJ-forward summer bash with layered badges and ticket line.',
    tags: ['Flyer', 'Event', 'Music'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/event-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/event-flyer.png',
        alt: 'Summer Night Bash 2025 — DJ and venue details',
      },
    ],
  },
  {
    id: 'flyer-study-sports',
    title: 'Sports / fight night flyer',
    summary: 'Landscape matchup graphic with fighters and broadcast line.',
    tags: ['Flyer', 'Sports', 'Print'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/sports-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/sports-flyer.png',
        alt: 'Ultimate Fight Night — Santos vs Rivers',
      },
    ],
  },
  {
    id: 'flyer-study-service',
    title: 'Home services flyer',
    summary: 'Repair brand one-sheet—photo hero, services list, and booking CTA.',
    tags: ['Flyer', 'Services', 'Print'],
    services: ['flyers'],
    year: '2025',
    lightboxOnly: true,
    coverImage: '/assets/flyers-events/design-specimens/service-flyer.png',
    gallery: [
      {
        src: '/assets/flyers-events/design-specimens/service-flyer.png',
        alt: 'We Fix It Fast — handyman and repair services',
      },
    ],
  },
  {
    id: 'delaine-harold-wedding',
    title: "Delaine & Harold's Wedding",
    summary: 'Wedding stationery and day-of print.',
    tags: ['Wedding', 'Print', 'Stationery'],
    services: ['stationery'],
    year: '2025',
    coverImage: '/assets/stationery/wedding-package/save-the-date-official.png',
    gallery: [
      { src: '/assets/stationery/wedding-package/invitation-official.png', alt: 'Official wedding invitation' },
      { src: '/assets/stationery/wedding-package/reception-invite.png', alt: 'Reception invite' },
      {
        kind: 'pair',
        label: 'Ceremony & reception program',
        front: {
          src: '/assets/stationery/wedding-package/artboard-1.png',
          alt: 'Ceremony & reception program — front',
        },
        back: {
          src: '/assets/stationery/wedding-package/artboard-2.png',
          alt: 'Ceremony & reception program — inside',
        },
      },
      { src: '/assets/stationery/wedding-package/bridesmaid-group.png', alt: 'Bridesmaid group graphic' },
      { src: '/assets/stationery/wedding-package/welcome-sign.png', alt: 'Welcome sign' },
    ],
  },
  {
    id: 'velora',
    title: 'Velora',
    summary: 'Skincare brand—identity preview, mark, and bottle mockup.',
    tags: ['Branding', 'Packaging', 'Logo'],
    services: ['branding'],
    year: '2025',
    coverImage: '/assets/branding/velora/velora-preview.png',
    gallery: [
      {
        src: '/assets/branding/velora/velora-preview.png',
        alt: 'Velora — brand identity preview',
      },
      {
        src: '/assets/branding/velora/velora-wordmark.png',
        alt: 'Velora — logo / wordmark',
      },
      {
        src: '/assets/branding/velora/velora-bottle-mock.png',
        alt: 'Velora — bottle mockup',
      },
    ],
  },
  {
    id: 'modern-minimalist-logos',
    title: 'Modern Minimalist Logos',
    summary: 'Logo suite with mockups.',
    tags: ['Logo Design', 'Branding', 'Mockups'],
    services: ['logos'],
    year: '2025',
    coverImage: '/assets/logo-design/modern-minimalist-logos/nexora-laptop.png',
    gallery: [
      {
        kind: 'group',
        id: 'morva',
        title: 'Morva Coffee',
        summary: 'Logo with kraft bag + takeaway cup studio mockup, plus lifestyle cup.',
        cover: {
          src: '/assets/logo-design/modern-minimalist-logos/more/morva-coffee-packaging-mockup.png',
          alt: 'Morva Coffee — kraft bag and paper cup mockup',
        },
        items: [
          {
            src: '/assets/logo-design/modern-minimalist-logos/more/morva-logo.png',
            alt: 'Morva Coffee — logo',
          },
        ],
      },
      {
        kind: 'group',
        id: 'nexora',
        title: 'Nexora',
        items: [
          { src: '/assets/logo-design/modern-minimalist-logos/more/nexora-mark.png', alt: 'Nexora — mark' },
          { src: '/assets/logo-design/modern-minimalist-logos/more/nexora-wordmark.png', alt: 'Nexora — wordmark' },
          { src: '/assets/logo-design/modern-minimalist-logos/nexora-laptop.png', alt: 'Nexora — laptop mockup' },
          {
            src: '/assets/logo-design/modern-minimalist-logos/more/alvera-tag.png',
            alt: 'Nexora — tag design',
          },
        ],
      },
      {
        kind: 'group',
        id: 'velora',
        title: 'Velora',
        items: [
          {
            src: '/assets/logo-design/modern-minimalist-logos/more/ar-realty-logo.png',
            alt: 'Velora — mockup',
          },
        ],
      },
      {
        kind: 'group',
        id: 'ar',
        title: 'AR Realty',
        items: [
          {
            src: '/assets/logo-design/modern-minimalist-logos/more/nexora-laptop-mock.png',
            alt: 'AR Realty — logo',
          },
          { src: '/assets/logo-design/modern-minimalist-logos/ar-realty-card.png', alt: 'AR Realty — business card' },
          {
            src: '/assets/logo-design/modern-minimalist-logos/more/alvera-hangtag-mock.png',
            alt: 'AR Realty — signage mockup',
          },
        ],
      },
      {
        kind: 'group',
        id: 'alvera',
        title: 'Alvéra',
        items: [
          {
            src: '/assets/logo-design/modern-minimalist-logos/more/ar-realty-sign-mock.png',
            alt: 'Alvéra — signage mockup',
          },
          { src: '/assets/logo-design/modern-minimalist-logos/more/alvera-wordmark.png', alt: 'Alvéra — wordmark' },
          { src: '/assets/logo-design/modern-minimalist-logos/more/alvera-fabric-mock.png', alt: 'Alvéra — clothing tag mockup' },
          { src: '/assets/logo-design/modern-minimalist-logos/more/morva-cup-mock.png', alt: 'Alvéra — clothing label mockup' },
        ],
      },
      {
        kind: 'group',
        id: 'ironvault',
        title: 'Ironvault',
        items: [
          { src: '/assets/logo-design/modern-minimalist-logos/more/alvera-label-mock.png', alt: 'Ironvault — mockup' },
          { src: '/assets/logo-design/modern-minimalist-logos/more/ironvault-logo.png', alt: 'Ironvault — logo' },
        ],
      },
    ],
  },
  {
    id: 'photo-editing',
    title: 'Photo editing & compositing',
    summary: 'Retouching and compositing sample.',
    tags: ['Photo', 'Print', 'Social'],
    services: ['photo'],
    year: '2025',
    coverImage: '/assets/photo-editing/photo-editing.png',
    gallery: [
      {
        src: '/assets/photo-editing/photo-editing.png',
        alt: 'Photo editing — dual portrait treatment',
      },
    ],
  },
  {
    id: 'portfolio-video',
    title: 'Video',
    summary: 'Edited showreel.',
    tags: ['Video', 'Motion'],
    services: ['video'],
    year: '2025',
    gallery: [
      {
        kind: 'video',
        src: '/assets/video-production/Video.mp4',
        alt: 'Portfolio showreel',
      },
    ],
  },
  {
    id: 'mooncoffee',
    title: 'MoonCoffee',
    summary: 'Coffee brand—logo, posts, card.',
    tags: ['Branding', 'Social', 'Print'],
    services: ['branding'],
    year: '2025',
    coverImage: '/assets/branding/mooncoffee/BrandSheet.png',
    gallery: [
      { src: '/assets/branding/mooncoffee/BrandSheet.png', alt: 'Brand sheet' },
      { src: '/assets/branding/mooncoffee/MoonBean Logo-01.png', alt: 'Logo 1' },
      { src: '/assets/branding/mooncoffee/MoonBean Logo-02.png', alt: 'Logo 2' },
      { src: '/assets/branding/mooncoffee/MoonBean Logo-03.png', alt: 'Logo 3' },
      { src: '/assets/branding/mooncoffee/Post-01.png', alt: 'Instagram post 1' },
      { src: '/assets/branding/mooncoffee/Post-02.png', alt: 'Instagram post 2' },
      { src: '/assets/branding/mooncoffee/Post-03.png', alt: 'Instagram post 3' },
      {
        kind: 'pair',
        label: 'Business card',
        front: {
          src: '/assets/branding/mooncoffee/Business card-01.png',
          alt: 'MoonCoffee business card front',
        },
        back: {
          src: '/assets/branding/mooncoffee/Business card-02.png',
          alt: 'MoonCoffee business card back',
        },
      },
    ],
  },
  {
    id: 'nova-street',
    title: 'NOVA Street',
    summary: 'Streetwear logo set—logotype, mark, and lockup.',
    tags: ['Apparel', 'Branding', 'Logo Design'],
    services: ['logos'],
    year: '2026',
    coverImage: '/assets/logo-design/nova-street/NOVA01-03_lockup.png',
    gallery: [
      { src: '/assets/logo-design/nova-street/NOVA01-01_logo.png', alt: 'NOVA logotype' },
      { src: '/assets/logo-design/nova-street/NOVA01-02_mark.png', alt: 'NOVA monogram mark' },
      { src: '/assets/logo-design/nova-street/NOVA01-03_lockup.png', alt: 'NOVA logo lockup' },
    ],
  },
  {
    id: 'brum-co',
    title: 'Brum & Co.',
    summary: 'Coffee brand—logo suite and packaging mocks.',
    tags: ['Branding', 'Mockups'],
    services: ['branding'],
    year: '2025',
    coverImage: '/assets/branding/brum-co/Coffee Bag Mockup.png',
    gallery: [
      { src: '/assets/branding/brum-co/brum-co-logo-01.png', alt: 'Brum & Co. — logo 1' },
      { src: '/assets/branding/brum-co/Coffee Bag Mockup.png', alt: 'Coffee bag mockup' },
      { src: '/assets/branding/brum-co/brum-co-logo-02.png', alt: 'Brum & Co. — logo 2' },
      { src: '/assets/branding/brum-co/Coffe Cup Mockup.png', alt: 'Coffee cup mockup' },
      { src: '/assets/branding/brum-co/brum-co-logo-03.png', alt: 'Brum & Co. — logo 3' },
    ],
  },
  {
    id: 'business-cards',
    title: 'Business Card Concepts',
    summary: 'Card direction studies.',
    tags: ['Print', 'Layout'],
    services: ['stationery'],
    year: '2025',
    coverImage: '/assets/stationery/business-cards/Minimalistic Mockup.png',
    gallery: [
      {
        kind: 'pair',
        label: 'Minimalistic',
        front: { src: '/assets/stationery/business-cards/Minimalistic-01.png', alt: 'Minimalistic front' },
        back: { src: '/assets/stationery/business-cards/Minimalistic-02.png', alt: 'Minimalistic back' },
      },
      {
        src: '/assets/stationery/business-cards/Minimalistic Mockup.png',
        alt: 'Minimalistic — lifestyle mockup',
      },
      {
        kind: 'pair',
        label: 'Maximalist',
        front: { src: '/assets/stationery/business-cards/Maximalist-01.png', alt: 'Maximalist front' },
        back: { src: '/assets/stationery/business-cards/Maximalist-02.png', alt: 'Maximalist back' },
      },
      {
        kind: 'pair',
        label: 'Abstract',
        front: { src: '/assets/stationery/business-cards/Abstract-01.png', alt: 'Abstract front' },
        back: { src: '/assets/stationery/business-cards/Abstract-02.png', alt: 'Abstract back' },
      },
      {
        src: '/assets/stationery/business-cards/Abstract-Mockup.png',
        alt: 'Abstract — lifestyle mockup',
      },
      {
        kind: 'pair',
        label: 'Eco',
        front: { src: '/assets/stationery/business-cards/Eco-01.png', alt: 'Eco front' },
        back: { src: '/assets/stationery/business-cards/Eco-02.png', alt: 'Eco back' },
      },
      {
        kind: 'pair',
        label: 'Photo-based',
        front: { src: '/assets/stationery/business-cards/Photo-based-01.png', alt: 'Photo-based front' },
        back: { src: '/assets/stationery/business-cards/Photo-based-02.png', alt: 'Photo-based back' },
      },
      {
        src: '/assets/stationery/business-cards/Photo-based Mockup.png',
        alt: 'Photo-based — lifestyle mockup',
      },
      {
        kind: 'pair',
        label: 'Retro',
        front: { src: '/assets/stationery/business-cards/Retro-01.png', alt: 'Retro front' },
        back: { src: '/assets/stationery/business-cards/Retro-02.png', alt: 'Retro back' },
      },
      {
        kind: 'pair',
        label: 'Monogram',
        front: { src: '/assets/stationery/business-cards/Monogram-01.png', alt: 'Monogram front' },
        back: { src: '/assets/stationery/business-cards/Monogram-02.png', alt: 'Monogram back' },
      },
      {
        kind: 'pair',
        label: 'Tech',
        front: { src: '/assets/stationery/business-cards/Tech-01.png', alt: 'Tech front' },
        back: { src: '/assets/stationery/business-cards/Tech-02.png', alt: 'Tech back' },
      },
      {
        kind: 'pair',
        label: 'Typographic',
        front: { src: '/assets/stationery/business-cards/Typographic-01.png', alt: 'Typographic front' },
        back: { src: '/assets/stationery/business-cards/Typographic-02.png', alt: 'Typographic back' },
      },
      {
        kind: 'pair',
        label: 'Vertical',
        front: { src: '/assets/stationery/business-cards/Vertical-01.png', alt: 'Vertical front' },
        back: { src: '/assets/stationery/business-cards/Vertical-02.png', alt: 'Vertical back' },
      },
    ],
  },
]

export function getProjectById(projectId: string) {
  return projects.find((p) => p.id === projectId)
}

export function projectOpensInLightbox(p: Project): boolean {
  return p.lightboxOnly === true
}

/** Cover image, else first simple image in the gallery. */
export function getPrimaryGalleryImageSrc(p: Project): string | undefined {
  if (p.coverImage) return p.coverImage
  for (const item of p.gallery) {
    if ('kind' in item && item.kind && item.kind !== 'image') continue
    if ('src' in item) return item.src
  }
  return undefined
}

type HeroSlideConfig = {
  projectId: string
  coverImage?: string
  coverVideo?: string
}

/** Home hero slideshow — order and optional cover overrides per slide. */
const HERO_SLIDE_CONFIG: HeroSlideConfig[] = [
  { projectId: 'motion-studies' },
  {
    projectId: 'delaine-harold-wedding',
    coverImage: '/assets/stationery/wedding-package/invitation-official.png',
  },
  { projectId: 'vbs-logos' },
  { projectId: 'event-templates-mockups' },
  { projectId: 'flyer-study-sales' },
  { projectId: 'brum-co' },
  { projectId: 'photo-editing' },
  {
    projectId: 'ignite-conference',
    coverImage: '/assets/flyers-events/ignite-conference/ignite-landscape-mockup.png',
  },
  {
    projectId: 'ignite-conference',
    coverImage: '/assets/flyers-events/ignite-conference/prayer-breakfast-floating-tickets.png',
  },
  {
    projectId: 'ignite-conference',
    coverImage: '/assets/flyers-events/ignite-conference/ignite-conference-tshirt-front-mockup.png',
  },
]

function projectWithHeroOverrides(config: HeroSlideConfig): Project | undefined {
  const base = getProjectById(config.projectId)
  if (!base) return undefined
  if (config.coverVideo !== undefined) {
    return { ...base, coverVideo: config.coverVideo }
  }
  if (config.coverImage !== undefined) {
    return { ...base, coverImage: config.coverImage, coverVideo: undefined }
  }
  return { ...base }
}

export function getHeroSlides(): { key: string; project: Project }[] {
  return HERO_SLIDE_CONFIG.map((config, index) => {
    const project = projectWithHeroOverrides(config)
    if (!project) return null
    return { key: `${config.projectId}-${index}`, project }
  }).filter((x): x is { key: string; project: Project } => x !== null)
}

/** Curated display order per category (first = top). IDs not listed sort after, by year then title. */
export const PROJECT_ORDER_BY_CATEGORY: Record<ServiceSlug, string[]> = {
  branding: ['brum-co', 'mooncoffee', 'unity-hospice', 'velora', 'ignite-conference'],
  flyers: [
    'event-templates-mockups',
    'flyer-study-sales',
    'flyer-study-restaurant',
    'flyer-study-fitness',
    'flyer-study-educational',
    'flyer-study-typography',
    'flyer-study-event',
    'flyer-study-sports',
    'flyer-study-service',
    'ignite-conference-flyers',
    'ntcg-womens-week-2022',
    'papine-church-flyers',
    'vbs-2022-official-flyer',
    'youth-ministry-flyers',
  ],
  logos: ['modern-minimalist-logos', 'nova-street', 'thank-you-boxes', 'vbs-logos'],
  motion: ['motion-studies'],
  photo: ['photo-editing'],
  publications: ['wdm-lorna-campbell-appointment', 'pastors-appreciation-portrait'],
  stationery: ['business-cards', 'delaine-harold-wedding'],
  video: ['ignite-conference-promo', 'papine-worship-events', 'portfolio-video'],
}

function compareProjectsDefault(a: Project, b: Project): number {
  const ya = parseInt(a.year ?? '0', 10)
  const yb = parseInt(b.year ?? '0', 10)
  if (yb !== ya) return yb - ya
  return a.title.localeCompare(b.title)
}

export function projectHasMotionMedia(p: Project): boolean {
  if (p.coverVideo) return true
  return p.gallery.some((item) => 'kind' in item && item.kind === 'video')
}

export function getProjectsForCategory(slug: ServiceSlug): Project[] {
  let filtered = projects.filter((p) => p.services.includes(slug))
  if (slug === 'motion') {
    filtered = filtered.filter(projectHasMotionMedia)
  }
  const order = PROJECT_ORDER_BY_CATEGORY[slug]
  if (!order.length) {
    return [...filtered].sort(compareProjectsDefault)
  }
  const rank = new Map(order.map((id, i) => [id, i]))
  return [...filtered].sort((a, b) => {
    const ra = rank.get(a.id)
    const rb = rank.get(b.id)
    const aUn = ra === undefined
    const bUn = rb === undefined
    if (!aUn && !bUn) return ra - rb
    if (!aUn && bUn) return -1
    if (aUn && !bUn) return 1
    return compareProjectsDefault(a, b)
  })
}

/** Static image for category cards — first project in category order; avoids many autoplay videos on `/work`. */
function firstStaticImageFromGallery(gallery: Project['gallery']): { src: string; alt: string } | undefined {
  for (const item of gallery) {
    switch (item.kind) {
      case 'pair':
        return { src: item.front.src, alt: item.front.alt }
      case 'brochure':
        return { src: item.cover.src, alt: item.cover.alt }
      case 'brochureRow':
        return { src: item.studio.src, alt: item.studio.alt }
      case 'group':
        if (item.cover) return { src: item.cover.src, alt: item.cover.alt }
        if (item.items[0]) return { src: item.items[0].src, alt: item.items[0].alt }
        break
      case 'book':
        if (item.pages[0]) return { src: item.pages[0].src, alt: item.pages[0].alt }
        break
      case 'video':
        if (item.poster) return { src: item.poster, alt: item.alt }
        break
      default:
        if ('src' in item && 'alt' in item) return { src: item.src, alt: item.alt }
    }
  }
}

export type CategoryCardPreview =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string; alt: string; disclaimer?: string }

/** One row per video file; `coverVideo` deduped against gallery. Order follows `projects` order, then gallery order. */
function collectVideosFromProjects(projects: Project[]): {
  project: Project
  video: { src: string; poster?: string; alt: string; disclaimer?: string }
}[] {
  const results: {
    project: Project
    video: { src: string; poster?: string; alt: string; disclaimer?: string }
  }[] = []

  for (const p of projects) {
    const seen = new Set<string>()
    const push = (
      src: string,
      poster: string | undefined,
      alt: string,
      disclaimer?: string,
    ) => {
      if (seen.has(src)) return
      seen.add(src)
      results.push({ project: p, video: { src, poster, alt, disclaimer } })
    }

    if (p.coverVideo) {
      let alt = p.title
      let galleryPoster: string | undefined
      let coverDisclaimer: string | undefined
      for (const item of p.gallery) {
        if (item.kind === 'video' && item.src === p.coverVideo) {
          alt = item.alt
          galleryPoster = item.poster
          coverDisclaimer = item.disclaimer
          break
        }
      }
      push(p.coverVideo, p.coverImage ?? galleryPoster, alt, coverDisclaimer)
    }

    for (const item of p.gallery) {
      if (item.kind === 'video') push(item.src, item.poster, item.alt, item.disclaimer)
    }
  }

  return results
}

export function getMotionClipsForCategory(): {
  project: Project
  video: { src: string; poster?: string; alt: string; disclaimer?: string }
}[] {
  return collectVideosFromProjects(getProjectsForCategory('motion'))
}

export function getVideoClipsForCategory(): {
  project: Project
  video: { src: string; poster?: string; alt: string; disclaimer?: string }
}[] {
  return collectVideosFromProjects(getProjectsForCategory('video'))
}

/** Disclaimer for the clip used as `coverVideo` (e.g. hero / cards), if any. */
export function disclaimerForCoverVideo(project: Project): string | undefined {
  if (!project.coverVideo) return undefined
  for (const item of project.gallery) {
    if (item.kind === 'video' && item.src === project.coverVideo && item.disclaimer) {
      return item.disclaimer
    }
  }
  return undefined
}

export function getCategoryCardPreview(slug: ServiceSlug): CategoryCardPreview | null {
  if (slug === 'motion') {
    const clips = getMotionClipsForCategory()
    const first = clips[0]
    if (!first) return null
    return {
      kind: 'video',
      src: first.video.src,
      poster: first.video.poster,
      alt: first.video.alt,
      disclaimer: first.video.disclaimer,
    }
  }

  if (slug === 'video') {
    const clips = getVideoClipsForCategory()
    const first = clips[0]
    if (!first) return null
    return {
      kind: 'video',
      src: first.video.src,
      poster: first.video.poster ?? first.project.coverImage,
      alt: first.video.alt,
      disclaimer: first.video.disclaimer,
    }
  }

  const list = getProjectsForCategory(slug)
  const p = list[0]
  if (!p) return null
  if (p.coverImage) return { kind: 'image', src: p.coverImage, alt: 'Cover preview' }
  const fromGallery = firstStaticImageFromGallery(p.gallery)
  return fromGallery ? { kind: 'image', src: fromGallery.src, alt: fromGallery.alt } : null
}

