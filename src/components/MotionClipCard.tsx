import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'
import { ui } from '../ui/classes'
import { PortfolioMockup } from './PortfolioMockup'

export function MotionClipCard(props: {
  project: Project
  src: string
  poster?: string
  alt: string
  disclaimer?: string
}) {
  const { project, src, poster, alt, disclaimer } = props

  return (
    <Link
      to={`/projects/${project.id}`}
      className={`group overflow-hidden ${ui.surfaceCard} ${ui.surfaceCardHover}`}
    >
      <PortfolioMockup>
        <div className="aspect-[4/3] overflow-hidden bg-neutral-950">
          <video
            src={src}
            poster={poster}
            className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-[1.01]"
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={alt}
          />
        </div>
      </PortfolioMockup>
      <div className="space-y-1 p-4">
        <div className="text-sm font-semibold leading-snug text-neutral-900 dark:text-white">{alt}</div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">{project.title}</div>
        {disclaimer ? (
          <p className="pt-2 text-[11px] leading-relaxed italic text-neutral-500 dark:text-neutral-500" role="note">
            {disclaimer}
          </p>
        ) : null}
      </div>
    </Link>
  )
}
