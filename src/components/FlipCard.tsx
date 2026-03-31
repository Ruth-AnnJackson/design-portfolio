import { useId, useState } from 'react'

export type FlipCardImage = { src: string; alt: string }

export function FlipCard(props: {
  front: FlipCardImage
  back: FlipCardImage
  caption?: string
}) {
  const { front, back, caption } = props
  const [flipped, setFlipped] = useState(false)
  const labelId = useId()

  return (
    <button
      type="button"
      className="group w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] text-left transition hover:bg-black/[0.05] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
      aria-describedby={caption ? labelId : undefined}
      onClick={() => setFlipped((v) => !v)}
    >
      <div className="relative aspect-[7/4] bg-neutral-100 [perspective:1200px] dark:bg-neutral-950">
        <div
          className={[
            'absolute inset-0 [transform-style:preserve-3d] transition-transform duration-500 ease-out',
            flipped ? '[transform:rotateY(180deg)]' : '',
          ].join(' ')}
        >
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <img
              src={front.src}
              alt={front.alt}
              className="h-full w-full object-contain p-3"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <img
              src={back.src}
              alt={back.alt}
              className="h-full w-full object-contain p-3"
              loading="lazy"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-2 left-2 rounded-full border border-black/10 bg-white/80 px-2 py-1 text-[11px] font-semibold text-neutral-800 opacity-0 shadow-sm transition group-hover:opacity-100 dark:border-white/10 dark:bg-black/40 dark:text-white/90">
          Click to flip
        </div>
      </div>

      {caption ? (
        <div id={labelId} className="p-3 text-xs text-neutral-500 dark:text-neutral-400">
          {caption}
        </div>
      ) : null}
    </button>
  )
}
