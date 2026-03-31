import type { Project } from '../content/projects'

function firstGalleryVideoSrc(gallery: Project['gallery']): string | undefined {
  for (const item of gallery) {
    if ('kind' in item && item.kind === 'video') return item.src
  }
  return undefined
}

export function CoverMedia(props: {
  project: Project
  className: string
}) {
  const { project, className } = props

  const videoSrc = project.coverVideo ?? firstGalleryVideoSrc(project.gallery)
  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        className={className}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={project.title}
      />
    )
  }

  if (!project.coverImage) return null

  return (
    <img
      src={project.coverImage}
      alt={project.title}
      className={className}
      loading="lazy"
    />
  )
}
