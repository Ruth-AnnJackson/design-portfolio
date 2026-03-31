import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookPages } from '../components/BookPages'
import { BrochureMockup } from '../components/BrochureMockup'
import { getProjectById } from '../content/projects'
import { FlipCard } from '../components/FlipCard'
import { ImageLightbox } from '../components/ImageLightbox'

const cardBorder =
  'border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/5'
const cardHover = 'hover:bg-black/[0.05] dark:hover:bg-white/10'
const mediaWell = 'bg-neutral-100 dark:bg-neutral-950'
const subtleText = 'text-neutral-500 dark:text-neutral-400'

export function ProjectDetail() {
  const { projectId } = useParams()
  const project = useMemo(
    () => (projectId ? getProjectById(projectId) : undefined),
    [projectId],
  )
  type LightboxState = { src: string; sources: string[]; index: number }
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const setLightboxFromSources = (sources: string[], index: number) => {
    if (!sources.length) return
    const nextIndex = Math.min(Math.max(index, 0), sources.length - 1)
    setLightbox({
      src: sources[nextIndex],
      sources,
      index: nextIndex,
    })
  }

  const goPrev = () => {
    setLightbox((lb) => {
      if (!lb) return lb
      if (lb.index <= 0) return lb
      const index = lb.index - 1
      return { ...lb, index, src: lb.sources[index] }
    })
  }

  const goNext = () => {
    setLightbox((lb) => {
      if (!lb) return lb
      if (lb.index >= lb.sources.length - 1) return lb
      const index = lb.index + 1
      return { ...lb, index, src: lb.sources[index] }
    })
  }

  const plainImageSources = useMemo(() => {
    if (!project) return []
    return project.gallery.flatMap((item) => {
      if ('kind' in item && item.kind && item.kind !== 'image') return []
      if ('src' in item) return [item.src]
      return []
    })
  }, [project])

  if (!project) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
          Project not found
        </h1>
        <Link
          className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
          to="/projects"
        >
          Back to projects
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-7">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
          <Link
            to="/projects"
            className="hover:text-neutral-900 dark:hover:text-white"
          >
            Projects
          </Link>
          <span className="text-neutral-400 dark:text-neutral-600">/</span>
          <span className="text-neutral-800 dark:text-neutral-200">{project.title}</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              {project.title}
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {project.summary}
            </p>
          </div>

          {project.downloads?.length ? (
            <div className="flex flex-col gap-2">
              {project.downloads.map((d) => (
                <a
                  key={d.href}
                  href={d.href}
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/[0.04] px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-black/[0.08] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  target="_blank"
                  rel="noreferrer"
                >
                  {d.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-black/10 bg-neutral-100/90 px-2 py-0.5 text-xs text-neutral-800 dark:border-white/10 dark:bg-neutral-950/40 dark:text-neutral-200"
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {project.gallery.map((item) => {
          if ('kind' in item && item.kind === 'pair') {
            return (
              <FlipCard
                key={item.label}
                front={item.front}
                back={item.back}
                caption={`${item.label} (front / back)`}
              />
            )
          }

          if ('kind' in item && item.kind === 'video') {
            return (
              <div
                key={item.src}
                className={`overflow-hidden rounded-2xl sm:col-span-2 ${cardBorder}`}
              >
                <div className={`aspect-video w-full overflow-hidden ${mediaWell}`}>
                  <video
                    className="h-full w-full object-contain"
                    src={item.src}
                    controls
                    playsInline
                    preload="metadata"
                    poster={item.poster}
                  />
                </div>
                <div className={`p-3 text-xs ${subtleText}`}>{item.alt}</div>
              </div>
            )
          }

          if ('kind' in item && item.kind === 'book') {
            return (
              <BookPages
                key={item.id}
                title={item.title ?? 'Brand guidelines'}
                pages={item.pages}
              />
            )
          }

          if ('kind' in item && item.kind === 'brochure') {
            return (
              <BrochureMockup
                key={`${item.cover.src}-${item.inside.src}`}
                cover={item.cover}
                inside={item.inside}
                caption={item.caption}
                onExpand={(src) => {
                  const sources = [item.cover.src, item.inside.src]
                  setLightboxFromSources(sources, sources.indexOf(src))
                }}
              />
            )
          }

          if ('kind' in item && item.kind === 'group') {
            const cover = item.cover ?? item.items[0]

            return (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl sm:col-span-2 ${cardBorder}`}
              >
                <div className="flex w-full items-center justify-between gap-4 p-4 text-left">
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-neutral-900 dark:text-white">
                      {item.title}
                    </div>
                    {item.summary ? (
                      <div className={`mt-1 text-xs ${subtleText}`}>{item.summary}</div>
                    ) : (
                      <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                        Click any tile to open as a slideshow.
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {cover ? (
                      <div
                        className={`hidden h-10 w-16 overflow-hidden rounded-lg border border-black/10 sm:block dark:border-white/10 ${mediaWell}`}
                      >
                        <img
                          src={cover.src}
                          alt={cover.alt}
                          className="h-full w-full object-contain p-1"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="border-t border-black/10 p-4 dark:border-white/10">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {item.items.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => {
                          const sources = item.items.map((i) => i.src)
                          setLightboxFromSources(sources, idx)
                        }}
                        className="group cursor-zoom-in overflow-hidden rounded-2xl border border-black/10 bg-neutral-100/80 text-left hover:bg-neutral-200/80 dark:border-white/10 dark:bg-neutral-950/30 dark:hover:bg-neutral-950/40"
                      >
                        <div className={`aspect-[4/3] overflow-hidden ${mediaWell}`}>
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.01]"
                            loading="lazy"
                          />
                        </div>
                        <div className={`p-3 text-xs ${subtleText}`}>{img.alt}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          return (
            <button
              key={item.src}
              type="button"
              onClick={() => {
                const idx = plainImageSources.indexOf(item.src)
                setLightboxFromSources(
                  plainImageSources.length ? plainImageSources : [item.src],
                  idx >= 0 ? idx : 0,
                )
              }}
              className={`group overflow-hidden rounded-2xl text-left ${cardBorder} ${cardHover}`}
            >
              <div className={`aspect-[4/3] overflow-hidden ${mediaWell}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
              <div className={`p-3 text-xs ${subtleText}`}>{item.alt}</div>
            </button>
          )
        })}
      </section>

      <ImageLightbox
        src={lightbox?.src ?? null}
        onClose={() => setLightbox(null)}
        onPrev={lightbox ? goPrev : undefined}
        onNext={lightbox ? goNext : undefined}
        canPrev={!!lightbox && lightbox.index > 0}
        canNext={!!lightbox && lightbox.index < lightbox.sources.length - 1}
      />
    </div>
  )
}
