import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookPages } from '../components/BookPages'
import { BrochureMockup } from '../components/BrochureMockup'
import { PortfolioMockup } from '../components/PortfolioMockup'
import { getProjectById } from '../content/projects'
import { getCategoryBySlug } from '../content/services'
import { FlipCard } from '../components/FlipCard'
import { ImageLightbox } from '../components/ImageLightbox'
import { ui } from '../ui/classes'

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
          to="/work"
        >
          Back to work
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-7">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
          <Link to="/work" className="hover:text-neutral-900 dark:hover:text-white">
            Work
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
                  className={ui.btnSecondarySm}
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
            <span key={t} className={ui.pillTag}>
              {t}
            </span>
          ))}
        </div>

        {project.services.length ? (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <span className="font-semibold text-neutral-600 dark:text-neutral-400">In</span>
            {project.services.map((slug) => {
              const def = getCategoryBySlug(slug)
              return (
                <Link
                  key={slug}
                  to={`/work/${slug}`}
                  className={ui.linkPill}
                >
                  {def?.title ?? slug}
                </Link>
              )
            })}
          </div>
        ) : null}
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
              <div key={item.src} className="sm:col-span-2">
                <PortfolioMockup>
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
                </PortfolioMockup>
                <div className={`mt-3 text-xs ${subtleText}`}>{item.alt}</div>
                {item.disclaimer ? (
                  <p
                    className={`mt-2 max-w-3xl text-xs leading-relaxed italic ${subtleText}`}
                    role="note"
                  >
                    {item.disclaimer}
                  </p>
                ) : null}
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
                className={`overflow-hidden sm:col-span-2 ${ui.surfaceGroup}`}
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
                        className={`hidden h-10 w-16 overflow-hidden rounded-lg sm:block ${mediaWell}`}
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

                <div className={`p-4 ${ui.dividerTop}`}>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {item.items.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => {
                          const sources = item.items.map((i) => i.src)
                          setLightboxFromSources(sources, idx)
                        }}
                        className="group w-full cursor-zoom-in text-left"
                      >
                        <PortfolioMockup className={ui.mockupHoverLift}>
                          <div className={`aspect-[4/3] overflow-hidden ${mediaWell}`}>
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.01] sm:p-3"
                              loading="lazy"
                            />
                          </div>
                        </PortfolioMockup>
                        <div className={`mt-2 text-xs ${subtleText}`}>{img.alt}</div>
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
              className="group w-full text-left"
            >
              <PortfolioMockup className={ui.mockupHoverLift}>
                <div className={`aspect-[4/3] overflow-hidden ${mediaWell}`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              </PortfolioMockup>
              <div className={`mt-3 text-xs ${subtleText}`}>{item.alt}</div>
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
