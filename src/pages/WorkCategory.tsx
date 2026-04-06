import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { MotionClipCard } from '../components/MotionClipCard'
import { ProjectCard } from '../components/ProjectCard'
import { getMotionClipsForCategory, getProjectsForCategory } from '../content/projects'
import { SERVICE_SLUGS, getCategoryBySlug, type ServiceSlug } from '../content/services'

function isCategorySlug(s: string): s is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(s)
}

export function WorkCategory() {
  const { categorySlug } = useParams()

  const category = useMemo(() => {
    if (!categorySlug || !isCategorySlug(categorySlug)) return undefined
    return getCategoryBySlug(categorySlug)
  }, [categorySlug])

  const categoryProjects = useMemo(() => {
    if (!categorySlug || !isCategorySlug(categorySlug)) return []
    return getProjectsForCategory(categorySlug)
  }, [categorySlug])

  const motionClips = useMemo(() => {
    if (categorySlug !== 'motion') return []
    return getMotionClipsForCategory()
  }, [categorySlug])

  if (!categorySlug || !category) {
    return <Navigate to="/work" replace />
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
        <Link to="/work" className="hover:text-neutral-900 dark:hover:text-white">
          Work
        </Link>
        <span className="text-neutral-400 dark:text-neutral-600">/</span>
        <span className="text-neutral-800 dark:text-neutral-200">{category.title}</span>
      </div>

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          {category.title}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
          {category.description}
        </p>
      </header>

      {categorySlug === 'motion' && motionClips.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Clips
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {motionClips.map(({ project, video }) => (
              <MotionClipCard
                key={`${project.id}-${video.src}`}
                project={project}
                src={video.src}
                poster={video.poster}
                alt={video.alt}
                disclaimer={video.disclaimer}
              />
            ))}
          </div>
        </section>
      ) : categoryProjects.length > 0 ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Work
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          <Link to="/work" className="font-semibold text-neutral-900 dark:text-white">
            All categories
          </Link>
          {' · '}
          <Link to="/contact" className="font-semibold text-amber-800 dark:text-[#e8c840]">
            Contact
          </Link>
        </p>
      )}

      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        <Link
          to="/work"
          className="font-semibold text-neutral-900 dark:hover:underline dark:text-white"
        >
          ← Work
        </Link>
      </p>
    </div>
  )
}
