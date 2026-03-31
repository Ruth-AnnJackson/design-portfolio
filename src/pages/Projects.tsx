import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CoverMedia } from '../components/CoverMedia'
import { getProjectFilterTags, projects } from '../content/projects'

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
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Projects
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-300">
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
            activeTag === null
              ? 'border-white/30 bg-white/15 text-white'
              : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 hover:text-white'
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
              activeTag === t
                ? 'border-white/30 bg-white/15 text-white'
                : 'border-white/10 bg-white/5 text-neutral-300 hover:border-white/20 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-neutral-400">No projects match this filter.</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10"
          >
            <div className="aspect-[4/3] overflow-hidden bg-neutral-950">
              <CoverMedia
                project={p}
                className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.01]"
              />
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-base font-semibold text-white">
                  {p.title}
                </div>
                {p.year ? (
                  <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-neutral-300">
                    {p.year}
                  </div>
                ) : null}
              </div>
              <div className="text-sm text-neutral-300">{p.summary}</div>
              <div className="flex flex-wrap gap-2 pt-1">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-neutral-950/40 px-2 py-0.5 text-xs text-neutral-200"
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

