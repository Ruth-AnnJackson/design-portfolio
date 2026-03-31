export type ShowcaseImage = {
  src: string
  alt: string
  caption?: string
}

export type ShowcaseSection = {
  id: string
  navLabel: string
  title: string
  description: string
  /** 'full' = one wide image; 'grid' = multiple tiles; 'video' = embedded MP4 (use `video`) */
  layout: 'full' | 'grid' | 'video'
  images: ShowcaseImage[]
  /** Required when layout is `video`. */
  video?: { src: string; alt: string; poster?: string }
}

export const showcaseSections: ShowcaseSection[] = [
  {
    id: 'intro',
    navLabel: 'Intro',
    title: 'Introduction',
    description:
      'A quick snapshot of who I am — graphic designer and content creator — and how I like to lead with bold, readable type and color.',
    layout: 'full',
    images: [
      {
        src: '/assets/showcase/hello-intro.png',
        alt: 'Hi, I’m Ruth-Ann Jackson — graphic designer and content creator',
      },
    ],
  },
  {
    id: 'logos',
    navLabel: 'Logos',
    title: 'Logo design',
    description:
      'Marks and wordmarks across different industries — from refined serif lockups to tech and lifestyle brands.',
    layout: 'full',
    images: [
      {
        src: '/assets/showcase/logos-sheet.png',
        alt: 'Logo collection — Brūm & Co., Echo Fest, NebulaTech, KOVA, LUMA, and more',
      },
    ],
  },
  {
    id: 'business-cards',
    navLabel: 'Cards',
    title: 'Business cards',
    description:
      'Full card systems with front, back, and in-context mockups — developer, creative director, and artist directions.',
    layout: 'full',
    images: [
      {
        src: '/assets/showcase/business-cards-showcase.png',
        alt: 'Business card concepts — flat layouts and hand mockups',
      },
    ],
  },
  {
    id: 'flyers',
    navLabel: 'Flyers',
    title: 'Flyers & promotions',
    description:
      'Event, retail, fitness, education, and service flyers — from high-energy nightlife to clean corporate layouts. Below is a portfolio overview plus individual pieces.',
    layout: 'grid',
    images: [
      {
        src: '/assets/showcase/flyers-overview.png',
        alt: 'Flyer collection overview',
        caption: 'Collection overview',
      },
      {
        src: '/assets/showcase/flyer-sale.png',
        alt: 'End of season big sale promotional flyer',
        caption: 'Retail — big sale',
      },
      {
        src: '/assets/showcase/flyer-restaurant.png',
        alt: 'Pizza party deals restaurant flyer',
        caption: 'Restaurant / food',
      },
      {
        src: '/assets/showcase/flyer-fitness.png',
        alt: 'IronPulse gym membership flyer',
        caption: 'Fitness',
      },
      {
        src: '/assets/showcase/flyer-educational.png',
        alt: 'Free coding workshop educational flyer',
        caption: 'Education / workshop',
      },
      {
        src: '/assets/showcase/flyer-typography.png',
        alt: 'One night only typography-led event flyer',
        caption: 'Typography-led event',
      },
      {
        src: '/assets/showcase/flyer-event.png',
        alt: 'Summer night bash 2025 event flyer',
        caption: 'Nightlife / DJ event',
      },
      {
        src: '/assets/showcase/flyer-sports.png',
        alt: 'Ultimate fight night sports poster',
        caption: 'Sports / PPV',
      },
      {
        src: '/assets/showcase/flyer-service.png',
        alt: 'Quick fix handyman service flyer',
        caption: 'Home services',
      },
      {
        src: '/assets/ignite-conference/ignite-main-flyer.png',
        alt: 'Ignite Conference — main flyer',
        caption: 'Event — Ignite Conference',
      },
      {
        src: '/assets/ignite-conference/prayer-breakfast-flyer.png',
        alt: 'Prayer Breakfast — official flyer',
        caption: 'Event — Prayer Breakfast',
      },
      {
        src: '/assets/ignite-conference/ignite-2023-save-the-date.png',
        alt: 'Ignite Conference — save the date 2023',
        caption: 'Event — Ignite (save the date)',
      },
    ],
  },
  {
    id: 'photo-editing',
    navLabel: 'Photo',
    title: 'Photo editing',
    description:
      'Retouching and compositing work — polished portraits and consistent color for print and social.',
    layout: 'full',
    images: [
      {
        src: '/assets/showcase/photo-editing.png',
        alt: 'Photo editing — dual portrait treatment',
      },
    ],
  },
  {
    id: 'tehilla-vol-2-motion',
    navLabel: 'Tehillah',
    title: 'Tehillah Vol. 2 — event motion',
    description:
      'Promotional motion for Papine New Testament Church of God — Tehillah Vol. 2 / Battle Praise, paired with the print and social campaign.',
    layout: 'video',
    images: [],
    video: {
      src: '/assets/papine-events/tehilla-vol-2.mp4',
      alt: 'Tehillah Vol. 2 — event motion for Papine New Testament Church of God',
    },
  },
  {
    id: 'movie-night-promo',
    navLabel: 'Movie Night',
    title: 'Movie Night — Papine Youth',
    description:
      'Promo motion for NTCOG Papine Youth Department — Movie Night featuring Overcomer, with matching flyer art.',
    layout: 'video',
    images: [],
    video: {
      src: '/assets/papine-events/movie-night-promo.mp4',
      alt: 'Youth Department Movie Night — Overcomer promo (NTCOG Papine)',
      poster: '/assets/papine-events/movie-night-poster.png',
    },
  },
  {
    id: 'creative-text-anim',
    navLabel: 'Motion',
    title: 'Creative text animation',
    description:
      'Kinetic type and motion study — built in After Effects for logo and promo-style energy.',
    layout: 'video',
    images: [],
    video: {
      src: '/assets/showcase/creative-text-anim.mp4',
      alt: 'Creative Text Anim — motion piece',
    },
  },
]
