/** Category slugs → `/work/<slug>`. Order matches `public/assets/`. */
export const SERVICE_SLUGS = [
  'branding',
  'flyers',
  'logos',
  'motion',
  'photo',
  'publications',
  'stationery',
  'video',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

export type ServiceDefinition = {
  slug: ServiceSlug
  title: string
  description: string
}

export const workCategories: ServiceDefinition[] = [
  { slug: 'branding', title: 'Branding', description: 'Identity, guidelines, campaigns.' },
  { slug: 'flyers', title: 'Flyers', description: 'Events and promos.' },
  { slug: 'logos', title: 'Logos', description: 'Marks and applications.' },
  { slug: 'motion', title: 'Motion', description: 'Short motion and type.' },
  { slug: 'photo', title: 'Photo', description: 'Retouching and compositing.' },
  {
    slug: 'publications',
    title: 'Publications',
    description: 'Announcements, editorial layouts, and organizational communications.',
  },
  { slug: 'stationery', title: 'Stationery', description: 'Cards, invitations, print.' },
  { slug: 'video', title: 'Video', description: 'Edits and promos.' },
]

export function getCategoryBySlug(slug: string): ServiceDefinition | undefined {
  return workCategories.find((s) => s.slug === slug)
}
