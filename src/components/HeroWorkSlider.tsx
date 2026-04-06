import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { disclaimerForCoverVideo, type Project } from '../content/projects'
import { CoverMedia } from './CoverMedia'
import { PortfolioMockup } from './PortfolioMockup'
import { ui } from '../ui/classes'

const AUTO_MS = 6500

type Variant = 'card' | 'fullBleed'

export function HeroWorkSlider({
  projects,
  variant = 'card',
}: {
  projects: Project[]
  variant?: Variant
}) {
  const n = projects.length
  const [index, setIndex] = useState(0)
  const [hoverPause, setHoverPause] = useState(false)
  const [tabHidden, setTabHidden] = useState(
    () => typeof document !== 'undefined' && document.hidden,
  )
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const autoplayOff = hoverPause || tabHidden || reduceMotion
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const go = useCallback(
    (delta: number) => {
      if (n <= 1) return
      setIndex((i) => (i + delta + n) % n)
    },
    [n],
  )

  useEffect(() => {
    if (n <= 1 || autoplayOff) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, AUTO_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [n, autoplayOff])

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  if (n === 0) return null

  const current = projects[index]
  const coverDisclaimer = disclaimerForCoverVideo(current)

  const sharedHandlers = {
    onMouseEnter: () => setHoverPause(true),
    onMouseLeave: () => setHoverPause(false),
    onKeyDown: (e: KeyboardEvent) => {
      if (n <= 1) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      }
    },
  }

  if (variant === 'fullBleed') {
    return (
      <div
        className="w-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/20 dark:focus-visible:ring-white/25"
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        {...sharedHandlers}
      >
        <div className="relative w-full bg-neutral-200 dark:bg-neutral-950">
          {/* Tall band + object-contain so full pieces read clearly (no aggressive crop). */}
          <div className="relative min-h-[min(52vh,420px)] h-[min(78vh,920px)] w-full sm:min-h-[min(58vh,480px)] sm:h-[min(82vh,980px)] lg:min-h-[min(62vh,520px)] lg:h-[min(86vh,1080px)]">
            <div
              key={current.id}
              className={`flex h-full w-full items-center justify-center ${reduceMotion ? '' : 'animate-hero-fade'}`}
            >
              <CoverMedia
                project={current}
                className="max-h-full w-full object-contain px-2 py-3 sm:px-4 sm:py-5 lg:px-8 lg:py-8"
              />
            </div>
            {n > 1 ? (
              <>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent dark:from-black/50"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6 lg:left-10"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-neutral-900 shadow-lg backdrop-blur-sm dark:border-white/15 dark:bg-black/60 dark:text-white">
                    <span className="sr-only">Previous slide</span>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6 lg:right-10"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-neutral-900 shadow-lg backdrop-blur-sm dark:border-white/15 dark:bg-black/60 dark:text-white">
                    <span className="sr-only">Next slide</span>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="border-b border-black/[0.06] bg-neutral-50/95 backdrop-blur-sm dark:border-white/[0.08] dark:bg-neutral-950/95">
          <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                SELECTED WORK
              </div>
              {n > 1 ? (
                <span className="text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
                  {index + 1} / {n}
                </span>
              ) : null}
            </div>

            <div className="mt-3 space-y-1" aria-live="polite">
              <Link
                to={`/projects/${current.id}`}
                className="block text-lg font-semibold text-neutral-900 transition hover:text-amber-900 dark:text-white dark:hover:text-[#e8c840] sm:text-xl"
              >
                {current.title}
              </Link>
              <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400 sm:text-base">
                {current.summary}
              </p>
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                {current.tags.slice(0, 4).join(' • ')}
              </div>
              {coverDisclaimer ? (
                <p
                  className="max-w-2xl pt-2 text-xs leading-relaxed italic text-neutral-500 dark:text-neutral-500"
                  role="note"
                >
                  {coverDisclaimer}
                </p>
              ) : null}
              <Link
                to={`/projects/${current.id}`}
                className="inline-block pt-2 text-sm font-semibold text-amber-800 dark:text-[#e8c840]"
              >
                View project →
              </Link>
            </div>

            {n > 1 ? (
              <div className="mt-5 flex justify-center gap-2 sm:justify-start" role="tablist" aria-label="Slide indicators">
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show ${p.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => setIndex(i)}
                    className={[
                      'h-2 rounded-full transition-all duration-300',
                      i === index
                        ? 'w-8 bg-neutral-800 dark:bg-white'
                        : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500',
                    ].join(' ')}
                  />
                ))}
              </div>
            ) : null}

            <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              <Link to="/work" className="font-semibold text-neutral-800 dark:text-neutral-200">
                All work
              </Link>{' '}
              — by category.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative p-5 sm:p-6 outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20 ${ui.surfaceHeroPanel}`}
      onMouseEnter={sharedHandlers.onMouseEnter}
      onMouseLeave={sharedHandlers.onMouseLeave}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      tabIndex={0}
      onKeyDown={sharedHandlers.onKeyDown}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-300">
            SELECTED WORK
          </div>
          {n > 1 ? (
            <span className="text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
              {index + 1} / {n}
            </span>
          ) : null}
        </div>

        <div className="relative mt-4">
          <PortfolioMockup>
            <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
              <div
                key={current.id}
                className={reduceMotion ? '' : 'animate-hero-fade'}
              >
                <CoverMedia
                  project={current}
                  className="h-full w-full object-contain p-2 sm:p-3"
                />
              </div>
            </div>
          </PortfolioMockup>

          {n > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className={`absolute left-1 top-1/2 z-10 -translate-y-1/2 ${ui.btnIcon} !h-10 !w-10 shadow-md shadow-black/10 dark:shadow-black/40`}
                aria-label="Previous slide"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className={`absolute right-1 top-1/2 z-10 -translate-y-1/2 ${ui.btnIcon} !h-10 !w-10 shadow-md shadow-black/10 dark:shadow-black/40`}
                aria-label="Next slide"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          ) : null}
        </div>

        <div className="mt-4 space-y-1" aria-live="polite">
          <Link
            to={`/projects/${current.id}`}
            className="block text-base font-semibold text-neutral-900 transition hover:text-amber-900 dark:text-white dark:hover:text-[#e8c840]"
          >
            {current.title}
          </Link>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{current.summary}</p>
          <div className="text-xs text-neutral-500 dark:text-neutral-500">
            {current.tags.slice(0, 3).join(' • ')}
          </div>
          {coverDisclaimer ? (
            <p
              className="max-w-xl pt-2 text-[11px] leading-relaxed italic text-neutral-500 dark:text-neutral-500"
              role="note"
            >
              {coverDisclaimer}
            </p>
          ) : null}
          <Link
            to={`/projects/${current.id}`}
            className="inline-block pt-2 text-xs font-semibold text-amber-800 dark:text-[#e8c840]"
          >
            View project →
          </Link>
        </div>

        {n > 1 ? (
          <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Slide indicators">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${p.title}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
                className={[
                  'h-2 rounded-full transition-all duration-300',
                  i === index
                    ? 'w-8 bg-neutral-800 dark:bg-white'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500',
                ].join(' ')}
              />
            ))}
          </div>
        ) : null}

        <div className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          <Link to="/work" className="font-medium text-neutral-800 dark:text-neutral-200">
            All work
          </Link>{' '}
          — by category.
        </div>
      </div>
    </div>
  )
}
