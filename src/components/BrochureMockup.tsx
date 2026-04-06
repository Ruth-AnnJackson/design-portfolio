import { useId, useState } from 'react'
import { ui } from '../ui/classes'

type BrochureImage = { src: string; alt: string }

type BrochureMockupProps = {
  cover: BrochureImage
  inside: BrochureImage
  caption?: string
  onExpand?: (src: string) => void
}

function MockupFrame({
  image,
  showFoldLines,
  tiltClass,
  imageClassName,
  fillFace,
}: {
  image: BrochureImage
  showFoldLines: boolean
  tiltClass: string
  /** Cover: intrinsic pixels (clamped to viewport). Inside: same box, preserve aspect. */
  imageClassName: string
  /** Stretch to the flip face (inside) so object-contain uses cover dimensions. */
  fillFace?: boolean
}) {
  return (
    <div
      className={[
        'transition-transform duration-300 ease-out will-change-transform',
        fillFace ? 'flex h-full w-full min-h-0 min-w-0 items-center justify-center' : '',
        tiltClass,
      ].join(' ')}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className={[
          ui.brochurePaper,
          fillFace ? 'flex max-h-full max-w-full items-center justify-center' : '',
        ].join(' ')}
      >
        <div className={['relative', fillFace ? 'max-h-full max-w-full' : ''].join(' ')}>
          <img
            src={image.src}
            alt={image.alt}
            className={imageClassName}
            loading="lazy"
          />
          {showFoldLines ? (
            <>
              <div
                className="pointer-events-none absolute inset-y-2 left-[33.333%] w-px bg-gradient-to-b from-transparent via-neutral-900/12 to-transparent sm:inset-y-3"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-y-2 left-[66.666%] w-px bg-gradient-to-b from-transparent via-neutral-900/12 to-transparent sm:inset-y-3"
                aria-hidden
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function BrochureMockup({ cover, inside, caption, onExpand }: BrochureMockupProps) {
  const [flipped, setFlipped] = useState(false)
  const labelId = useId()
  const footer = caption ?? 'Tri-fold brochure — click mockup to flip'

  return (
    <div className={`group/mock sm:col-span-2 ${ui.surfaceBrochureStage}`}>
      <div className="relative px-5 py-10 sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_78%,rgba(0,0,0,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_78%,rgba(255,255,255,0.07),transparent_55%)]"
          aria-hidden
        />

        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          aria-describedby={labelId}
          className="relative mx-auto block w-full max-w-full rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:focus-visible:ring-white/25 dark:focus-visible:ring-offset-neutral-950"
        >
          {/* Cover sets natural width/height; no vh caps or max-w-4xl. Only max-w-full for narrow viewports. */}
          <div className="relative mx-auto w-fit max-w-full [perspective:1400px]">
            <div
              className={[
                'relative [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                flipped ? '[transform:rotateY(180deg)]' : '',
              ].join(' ')}
            >
              <div className="[backface-visibility:hidden]">
                <MockupFrame
                  image={cover}
                  showFoldLines={false}
                  tiltClass="group-hover/mock:[transform:rotateX(4deg)_rotateY(-6deg)] sm:[transform:rotateX(5deg)_rotateY(-8deg)]"
                  imageClassName="block h-auto w-auto max-w-full rounded-sm"
                />
              </div>
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <MockupFrame
                  image={inside}
                  showFoldLines
                  fillFace
                  tiltClass="group-hover/mock:[transform:rotateX(4deg)_rotateY(6deg)] sm:[transform:rotateX(5deg)_rotateY(8deg)]"
                  imageClassName="max-h-full max-w-full rounded-sm object-contain"
                />
              </div>
            </div>

            <div
              className={`pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 opacity-0 transition group-hover/mock:opacity-100 ${ui.hintFloating}`}
            >
              Click to flip
            </div>
          </div>
        </button>

        <div id={labelId} className="relative mt-5 space-y-3 text-center">
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {footer}
            <span className="text-neutral-400 dark:text-neutral-600"> · </span>
            <span className="text-neutral-500 dark:text-neutral-500">
              {flipped ? 'Showing inside spread' : 'Showing cover'}
            </span>
          </p>
          {onExpand ? (
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => onExpand(cover.src)}
                className={`${ui.btnGhost} text-xs font-medium`}
              >
                Enlarge cover
              </button>
              <button
                type="button"
                onClick={() => onExpand(inside.src)}
                className={`${ui.btnGhost} text-xs font-medium`}
              >
                Enlarge inside
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
