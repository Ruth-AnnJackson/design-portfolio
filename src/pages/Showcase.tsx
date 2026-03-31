import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageLightbox } from '../components/ImageLightbox'
import { showcaseSections } from '../content/showcase'

function ShowcaseFullBleedImage(props: {
  src: string
  alt: string
  footer: string
  onOpen: () => void
}) {
  const { src, alt, footer, onOpen } = props
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] text-left transition hover:border-black/15 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
    >
      <div className="overflow-hidden bg-neutral-100 dark:bg-neutral-950">
        <img
          src={src}
          alt={alt}
          className="w-full object-contain p-4 transition duration-500 group-hover:scale-[1.01] md:p-6"
          loading="lazy"
        />
      </div>
      <div className="border-t border-black/5 px-4 py-3 text-xs text-neutral-500 dark:border-white/5 dark:text-neutral-500">
        {footer}
      </div>
    </button>
  )
}

export function Showcase() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <div className="space-y-2 pb-16">
      <header className="space-y-3 border-b border-black/10 pb-8 dark:border-white/10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
          <Link to="/" className="hover:text-neutral-900 dark:hover:text-white">
            Home
          </Link>
          <span className="text-neutral-400 dark:text-neutral-600">/</span>
          <span className="text-neutral-800 dark:text-neutral-200">Design showcase</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          Design showcase
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
          Selected work across identity, print, photo, and motion — organized by type so you can
          jump straight to what you care about.
        </p>
      </header>

      <nav
        aria-label="Showcase sections"
        className="sticky top-[4.5rem] z-30 -mx-1 flex gap-2 overflow-x-auto border-b border-black/10 bg-neutral-50/95 py-3 backdrop-blur dark:border-white/10 dark:bg-neutral-950/95"
      >
        {showcaseSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="shrink-0 rounded-full border border-amber-500/40 bg-amber-400/15 px-4 py-2 text-xs font-semibold tracking-wide text-amber-900 transition hover:border-amber-500/70 hover:bg-amber-400/25 dark:border-[#e8c840]/40 dark:bg-[#e8c840]/10 dark:text-[#f5e6a3] dark:hover:border-[#e8c840]/70 dark:hover:bg-[#e8c840]/20"
          >
            {s.navLabel}
          </a>
        ))}
      </nav>

      <div className="space-y-0">
        {showcaseSections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={[
              'scroll-mt-36 border-t border-black/10 py-12 dark:border-white/10 md:scroll-mt-32 md:py-16',
              idx === 0 ? 'border-t-0 pt-8 md:pt-10' : '',
            ].join(' ')}
          >
            <div className="mb-6 max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-base">
                {section.description}
              </p>
            </div>

            {section.layout === 'video' && section.video ? (
              <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-neutral-950">
                <div className="aspect-video w-full bg-black">
                  <video
                    className="h-full w-full object-contain"
                    src={section.video.src}
                    controls
                    playsInline
                    preload="metadata"
                    poster={section.video.poster}
                    aria-label={section.video.alt}
                  />
                </div>
                <div className="border-t border-black/5 px-4 py-3 text-xs text-neutral-500 dark:border-white/5 dark:text-neutral-500">
                  {section.video.alt}
                </div>
              </div>
            ) : section.layout === 'full' ? (
              <ShowcaseFullBleedImage
                src={section.images[0].src}
                alt={section.images[0].alt}
                onOpen={() => setLightboxSrc(section.images[0].src)}
                footer={
                  section.images[0].caption
                    ? `Click to enlarge · ${section.images[0].caption}`
                    : 'Click to enlarge'
                }
              />
            ) : (
              <div className="space-y-8">
                <ShowcaseFullBleedImage
                  src={section.images[0].src}
                  alt={section.images[0].alt}
                  onOpen={() => setLightboxSrc(section.images[0].src)}
                  footer={`${section.images[0].caption ?? 'Overview'} · click to enlarge`}
                />

                <div>
                  <h3 className="mb-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    Individual flyers
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {section.images.slice(1).map((img) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setLightboxSrc(img.src)}
                        className="group overflow-hidden rounded-xl border border-black/10 bg-neutral-100/80 text-left transition hover:border-black/20 dark:border-white/10 dark:bg-neutral-950/40 dark:hover:border-white/20"
                      >
                        <div className="aspect-[3/4] overflow-hidden bg-neutral-100 sm:aspect-[4/5] dark:bg-neutral-950">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                        {img.caption ? (
                          <div className="border-t border-black/5 px-3 py-2 text-xs text-neutral-600 dark:border-white/5 dark:text-neutral-400">
                            {img.caption}
                          </div>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-black/10 bg-black/[0.02] p-6 text-center dark:border-white/10 dark:bg-white/[0.03]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Want process shots or project files?{' '}
          <Link
            to="/contact"
            className="font-semibold text-amber-700 hover:text-amber-900 dark:text-[#e8c840] dark:hover:text-[#f5e6a3]"
          >
            Get in touch
          </Link>{' '}
          or browse{' '}
          <Link
            to="/projects"
            className="font-semibold text-neutral-900 underline-offset-2 hover:underline dark:text-white"
          >
            full case studies
          </Link>
          .
        </p>
      </div>

      <ImageLightbox
        src={lightboxSrc}
        onClose={() => setLightboxSrc(null)}
        zIndexClass="z-[70]"
        imgClassName="max-h-[90vh] w-auto max-w-[min(96vw,1200px)] rounded-xl border border-neutral-200 bg-white object-contain dark:border-white/10 dark:bg-neutral-950"
      />
    </div>
  )
}
