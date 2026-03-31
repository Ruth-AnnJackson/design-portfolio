import { useEffect, useRef, useState } from 'react'

export type BookPage = { src: string; alt: string; label: string }

export function BookPages(props: { title: string; pages: BookPage[] }) {
  const { title, pages } = props
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'next' | 'prev'>('idle')
  const [turning, setTurning] = useState(false)
  const skipNextEndRef = useRef(false)

  const canNext = index < pages.length - 1
  const canPrev = index > 0

  useEffect(() => {
    if (phase === 'idle') return
    skipNextEndRef.current = true
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        skipNextEndRef.current = false
        setTurning(true)
      })
    })
    return () => cancelAnimationFrame(id)
  }, [phase])

  function onFlipEnd(e: React.TransitionEvent<HTMLDivElement>) {
    if (e.propertyName !== 'transform') return
    if (e.target !== e.currentTarget) return
    if (skipNextEndRef.current) return

    if (phase === 'next') {
      setIndex((i) => i + 1)
    } else if (phase === 'prev') {
      setIndex((i) => i - 1)
    }
    setTurning(false)
    setPhase('idle')
  }

  function goNext() {
    if (!canNext || phase !== 'idle') return
    setTurning(false)
    setPhase('next')
  }

  function goPrev() {
    if (!canPrev || phase !== 'idle') return
    setTurning(false)
    setPhase('prev')
  }

  const current = pages[index]

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] sm:col-span-2 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-col gap-3 border-b border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-white">{title}</div>
          <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
            Turn the page — use arrows or click the sides of the spread.
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canPrev || phase !== 'idle'}
            className="rounded-xl border border-black/10 bg-black/[0.04] px-3 py-2 text-sm font-semibold text-neutral-900 transition enabled:hover:bg-black/[0.08] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:enabled:hover:bg-white/10"
          >
            Previous
          </button>
          <span className="rounded-full border border-black/10 bg-neutral-100/90 px-3 py-1 text-xs text-neutral-800 dark:border-white/10 dark:bg-neutral-950/40 dark:text-neutral-200">
            {current.label}
          </span>
          <button
            type="button"
            onClick={goNext}
            disabled={!canNext || phase !== 'idle'}
            className="rounded-xl border border-black/10 bg-black/[0.04] px-3 py-2 text-sm font-semibold text-neutral-900 transition enabled:hover:bg-black/[0.08] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:enabled:hover:bg-white/10"
          >
            Next
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mx-auto max-w-3xl [perspective:1800px]">
          <div
            className={[
              'relative aspect-[4/3] select-none overflow-hidden rounded-xl border border-black/10 bg-neutral-100 shadow-[inset_0_0_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-950 dark:shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]',
              phase === 'idle' ? 'cursor-pointer' : 'pointer-events-none cursor-default',
            ].join(' ')}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - r.left
              if (x < r.width / 2) goPrev()
              else goNext()
            }}
            role="presentation"
          >
            {phase === 'idle' ? (
              <img
                src={current.src}
                alt={current.alt}
                className="h-full w-full object-contain p-4"
                loading="lazy"
                draggable={false}
              />
            ) : null}

            {phase === 'next' ? (
              <>
                <img
                  src={pages[index + 1].src}
                  alt={pages[index + 1].alt}
                  className="absolute inset-0 z-0 h-full w-full object-contain p-4"
                  loading="eager"
                  draggable={false}
                />
                <div
                  className={[
                    'absolute inset-0 z-10 origin-left transition-transform duration-[850ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    '[transform-style:preserve-3d] [backface-visibility:hidden]',
                    'shadow-[4px_0_24px_rgba(0,0,0,0.45)]',
                    turning ? '[transform:rotateY(-180deg)]' : '[transform:rotateY(0deg)]',
                  ].join(' ')}
                  onTransitionEnd={onFlipEnd}
                >
                  <div className="h-full w-full bg-neutral-200 dark:bg-neutral-900">
                    <img
                      src={pages[index].src}
                      alt={pages[index].alt}
                      className="h-full w-full object-contain p-4"
                      draggable={false}
                    />
                  </div>
                </div>
              </>
            ) : null}

            {phase === 'prev' ? (
              <>
                <img
                  src={pages[index - 1].src}
                  alt={pages[index - 1].alt}
                  className="absolute inset-0 z-0 h-full w-full object-contain p-4"
                  loading="eager"
                  draggable={false}
                />
                <div
                  className={[
                    'absolute inset-0 z-10 origin-right transition-transform duration-[850ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    '[transform-style:preserve-3d] [backface-visibility:hidden]',
                    'shadow-[-4px_0_24px_rgba(0,0,0,0.45)]',
                    turning ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
                  ].join(' ')}
                  onTransitionEnd={onFlipEnd}
                >
                  <div className="h-full w-full bg-neutral-200 dark:bg-neutral-900">
                    <img
                      src={pages[index].src}
                      alt={pages[index].alt}
                      className="h-full w-full object-contain p-4"
                      draggable={false}
                    />
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
