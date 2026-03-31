import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CoverMedia } from '../components/CoverMedia'
import { getProjectFilterTags, projects } from '../content/projects'

const chipOn =
  'border-neutral-400/50 bg-neutral-200/80 text-neutral-900 dark:border-white/30 dark:bg-white/15 dark:text-white'
const chipOff =
  'border-black/10 bg-black/[0.04] text-neutral-600 hover:border-black/20 hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300 dark:hover:border-white/20 dark:hover:text-white'

export function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const filterTags = useMemo(() => getProjectFilterTags(), [])
  const visible = useMemo(
    () =>
      activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects,
    [activeTag],
  )

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Projects
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          A curated selection of branding, print, and mockup work. Click into a
          project for the full gallery. Filter by design type using the tags
          below.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
            activeTag === null ? chipOn : chipOff
          }`}
        >
          All
        </button>
        {filterTags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActiveTag(t)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              activeTag === t ? chipOn : chipOff
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          No projects match this filter.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="group overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] transition hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
              <CoverMedia
                project={p}
                className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.01]"
              />
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-semibold text-neutral-900 dark:text-white">
                  {p.title}
                </div>
                {p.year ? (
                  <div className="shrink-0 rounded-full border border-black/10 bg-black/[0.04] px-2 py-0.5 text-xs text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
                    {p.year}
                  </div>
                ) : null}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-300">{p.summary}</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 bg-neutral-100/90 px-2 py-0.5 text-xs text-neutral-800 dark:border-white/10 dark:bg-neutral-950/40 dark:text-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
