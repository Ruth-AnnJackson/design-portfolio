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

  // Prefer explicit `coverVideo`, otherwise prefer `coverImage`.
  // (Projects like Ignite include a promo video in the gallery but should still use their static cover on cards/hero.)
  const videoSrc =
    project.coverVideo ?? (project.coverImage ? undefined : firstGalleryVideoSrc(project.gallery))
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
