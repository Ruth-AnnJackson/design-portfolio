import { Link } from 'react-router-dom'
import { PortfolioMockup } from '../components/PortfolioMockup'
import { getCategoryCardPreview } from '../content/projects'
import { workCategories } from '../content/services'
import { ui } from '../ui/classes'

export function Work() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          Work
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
          By category. Same order as on disk.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workCategories.map((s) => {
          const preview = getCategoryCardPreview(s.slug)
          return (
            <li key={s.slug}>
              <Link
                to={`/work/${s.slug}`}
                className={`group flex h-full flex-col p-4 ${ui.surfaceCard} ${ui.surfaceCardHover}`}
              >
                <PortfolioMockup>
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                    {preview?.kind === 'video' ? (
                      <video
                        src={preview.src}
                        poster={preview.poster}
                        className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.02] sm:p-3"
                        muted
                        loop
                        playsInline
                        autoPlay
                        preload="metadata"
                        aria-label={preview.alt}
                      />
                    ) : preview?.kind === 'image' ? (
                      <img
                        src={preview.src}
                        alt={preview.alt}
                        loading="lazy"
                        className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.02] sm:p-3"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-4 text-center text-sm text-neutral-400 dark:text-neutral-500">
                        {s.title}
                      </div>
                    )}
                  </div>
                </PortfolioMockup>
                <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                  <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {s.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {s.description}
                  </span>
                  {preview?.kind === 'video' && preview.disclaimer ? (
                    <p
                      className="mt-3 text-[11px] leading-relaxed italic text-neutral-500 dark:text-neutral-500"
                      role="note"
                    >
                      {preview.disclaimer}
                    </p>
                  ) : null}
                  <span className="mt-4 text-xs font-semibold text-amber-800 dark:text-[#e8c840]">
                    Open →
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        <Link to="/contact" className="font-semibold text-amber-800 dark:text-[#e8c840]">
          Contact
        </Link>
      </p>
    </div>
  )
}
