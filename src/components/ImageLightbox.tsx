import { useEffect, useRef } from 'react'

type ImageLightboxProps = {
  src: string | null
  onClose: () => void

  /** Optional ordered navigation */
  onPrev?: () => void
  onNext?: () => void
  canPrev?: boolean
  canNext?: boolean

  /** Higher layers (e.g. sticky nav) use lower z-index. */
  zIndexClass?: string
  imgClassName?: string
}

export function ImageLightbox({
  src,
  onClose,
  onPrev,
  onNext,
  canPrev = false,
  canNext = false,
  zIndexClass = 'z-[60]',
  imgClassName = 'max-h-[85vh] w-auto max-w-[95vw] rounded-2xl border border-neutral-200 bg-white object-contain dark:border-white/10 dark:bg-neutral-950',
}: ImageLightboxProps) {
  const swipeStartX = useRef<number | null>(null)

  useEffect(() => {
    if (!src) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && canPrev) onPrev?.()
      if (e.key === 'ArrowRight' && canNext) onNext?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [src, onClose, onPrev, onNext, canPrev, canNext])

  if (!src) return null

  return (
    <div
      className={`fixed inset-0 ${zIndexClass} flex items-center justify-center bg-black/80 p-4`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      onPointerDown={(e) => {
        swipeStartX.current = e.clientX
      }}
      onPointerUp={(e) => {
        if (swipeStartX.current == null) return
        const dx = e.clientX - swipeStartX.current
        swipeStartX.current = null
        if (Math.abs(dx) < 50) return
        if (dx > 0 && canPrev) onPrev?.()
        if (dx < 0 && canNext) onNext?.()
      }}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        Close
      </button>

      {canPrev ? (
        <button
          type="button"
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation()
            onPrev?.()
          }}
        >
          ‹
        </button>
      ) : null}

      {canNext ? (
        <button
          type="button"
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation()
            onNext?.()
          }}
        >
          ›
        </button>
      ) : null}

      <img
        src={src}
        alt=""
        className={imgClassName}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
