import { Link } from 'react-router-dom'
import { CoverMedia } from '../components/CoverMedia'
import { getFeaturedProjects } from '../content/projects'

export function Home() {
  const featured = getFeaturedProjects()

  return (
    <div className="space-y-10">
      <section className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-xs text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200">
            Portfolio
            <span className="text-neutral-400 dark:text-neutral-500">•</span>
            Graphic Design • Content Creation
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Modern design for brands that want to stand out.
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
            Explore case studies, or browse the showcase for flyers, cards, logos,
            and photo work in one scrollable page.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            >
              View projects
            </Link>
            <Link
              to="/showcase"
              className="inline-flex items-center justify-center rounded-xl border border-amber-500/40 bg-amber-400/15 px-5 py-3 text-sm font-semibold text-amber-900 transition hover:border-amber-500/70 hover:bg-amber-400/25 dark:border-[#e8c840]/50 dark:bg-[#e8c840]/15 dark:text-[#f5e6a3] dark:hover:border-[#e8c840]/80 dark:hover:bg-[#e8c840]/25"
            >
              Design showcase
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/[0.04] px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-black/[0.08] dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              About me
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-fuchsia-500/10 via-cyan-400/10 to-amber-300/10 p-6 dark:border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_55%)]" />
            <div className="relative">
              <div className="text-xs font-semibold tracking-[0.25em] text-neutral-500 dark:text-neutral-300">
                SELECTED WORK
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {featured.map((p) => (
                  <Link
                    key={p.id}
                    to={`/projects/${p.id}`}
                    className="group overflow-hidden rounded-xl border border-black/10 bg-neutral-100/80 dark:border-white/10 dark:bg-neutral-950/30"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <CoverMedia
                        project={p}
                        className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {p.title}
                      </div>
                      <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                        {p.tags.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
                Tip: click a project to see the full gallery.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
