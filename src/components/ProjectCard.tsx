import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import { ui } from '../ui/classes'
import { CoverMedia } from './CoverMedia'
import { PortfolioMockup } from './PortfolioMockup'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={`group overflow-hidden ${ui.surfaceCard} ${ui.surfaceCardHover}`}
    >
      <PortfolioMockup>
        <div className="aspect-[4/3] overflow-hidden bg-neutral-100 dark:bg-neutral-950">
          <CoverMedia
            project={project}
            className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.01] sm:p-3"
          />
        </div>
      </PortfolioMockup>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="text-base font-semibold text-neutral-900 dark:text-white">
            {project.title}
          </div>
          {project.year ? (
            <div className={`shrink-0 ${ui.pillMeta}`}>{project.year}</div>
          ) : null}
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-300">{project.summary}</div>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((t) => (
            <span key={t} className={ui.pillTag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
