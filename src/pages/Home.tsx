import { Link } from 'react-router-dom'
import { HeroWorkSlider } from '../components/HeroWorkSlider'
import { getFeaturedProjects } from '../content/projects'
import { ui } from '../ui/classes'

export function Home() {
  const featured = getFeaturedProjects()

  return (
    <div className="-mt-10">
      {/* Full-width slideshow — edge to edge, first thing below the nav */}
      <div className="ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen max-w-none">
        <HeroWorkSlider projects={featured} variant="fullBleed" />
      </div>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:py-14 lg:py-16">
        <div className={`inline-flex items-center gap-2 ${ui.pillEyebrow}`}>
          Graphic design & content
          <span className="text-neutral-400 dark:text-neutral-500">•</span>
          Florida, USA
        </div>

        <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
          Design and motion for brands, events, and ministries.
        </h1>

        <p className="mt-4 text-pretty text-base leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-lg">
          Brand, print, logos, motion, photo, and video—by category.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/work" className={ui.btnPrimary}>
            View work
          </Link>
          <Link to="/about" className={ui.btnSecondary}>
            About
          </Link>
        </div>
      </section>
    </div>
  )
}
