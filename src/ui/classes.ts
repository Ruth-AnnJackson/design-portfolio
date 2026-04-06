/**
 * Shared visual tokens — one place so cards, panels, pills, and buttons stay aligned.
 */
export const ui = {
  /** Elevated card / category tile / project card shell */
  surfaceCard:
    'rounded-2xl bg-black/[0.02] shadow-sm shadow-black/[0.04] transition dark:bg-white/[0.03] dark:shadow-black/40',
  surfaceCardHover:
    'hover:shadow-md hover:shadow-black/[0.08] dark:hover:shadow-lg',

  /** Full-width sections (About, Contact) */
  surfaceSection:
    'rounded-2xl bg-black/[0.02] shadow-sm shadow-black/[0.04] dark:bg-white/[0.03] dark:shadow-black/40',

  /** About page portrait frame */
  surfacePortrait:
    'overflow-hidden rounded-2xl bg-gradient-to-br from-fuchsia-500/15 via-cyan-400/10 to-amber-300/10 shadow-sm shadow-black/[0.08] dark:shadow-black/50',

  /** Home hero “selected work” gradient panel */
  surfaceHeroPanel:
    'rounded-2xl bg-gradient-to-br from-fuchsia-500/10 via-cyan-400/10 to-amber-300/10 shadow-sm shadow-black/[0.06] dark:shadow-black/30',

  /** Items inside hero panel */
  surfaceNestedTile:
    'rounded-xl bg-neutral-100/60 p-2 transition hover:bg-neutral-100/90 dark:bg-neutral-950/25 dark:hover:bg-neutral-950/40',

  /** Group block on project detail (Ignite year groups) */
  surfaceGroup:
    'rounded-2xl bg-black/[0.02] shadow-sm shadow-black/[0.04] dark:bg-white/[0.03] dark:shadow-black/40',

  /** Brochure mockup outer stage */
  surfaceBrochureStage:
    'overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-200/90 via-neutral-100 to-neutral-50 shadow-sm shadow-black/[0.06] dark:from-neutral-900/90 dark:via-neutral-950 dark:to-neutral-950 dark:shadow-black/35',

  /** Book / brochure inner document viewer */
  surfaceDocWell:
    'overflow-hidden rounded-2xl bg-neutral-100 shadow-inner shadow-black/[0.08] dark:bg-neutral-950 dark:shadow-inner dark:shadow-black/40',

  divider: 'border-black/[0.06] dark:border-white/[0.08]',
  dividerTop: 'border-t border-black/[0.06] dark:border-white/[0.08]',
  dividerBottom: 'border-b border-black/[0.06] dark:border-white/[0.08]',

  /** Top-of-page / inline eyebrow */
  pillEyebrow:
    'rounded-full bg-black/[0.06] px-3 py-1 text-xs text-neutral-700 dark:bg-white/10 dark:text-neutral-200',

  /** Year badge on cards */
  pillMeta:
    'rounded-full bg-black/[0.06] px-2 py-0.5 text-xs text-neutral-600 dark:bg-white/10 dark:text-neutral-300',

  /** Tag chips */
  pillTag:
    'rounded-full bg-neutral-200/80 px-2 py-0.5 text-xs text-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-200',

  pillTagLg:
    'rounded-full bg-neutral-200/80 px-3 py-1 text-xs text-neutral-800 dark:bg-neutral-800/80 dark:text-neutral-200',

  /** Skill / list highlight blocks */
  pillBlock:
    'rounded-lg bg-neutral-200/70 px-4 py-3 text-sm text-neutral-800 dark:bg-neutral-800/50 dark:text-neutral-200',

  /** Category links on project header */
  linkPill:
    'rounded-full bg-black/[0.06] px-2.5 py-0.5 font-medium text-neutral-800 transition hover:bg-black/[0.1] dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/[0.14]',

  btnPrimary:
    'inline-flex items-center justify-center rounded-lg bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200',

  btnPrimarySm:
    'inline-flex items-center justify-center rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200',

  btnSecondary:
    'inline-flex items-center justify-center rounded-lg bg-black/[0.06] px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-black/[0.1] dark:bg-white/10 dark:text-white dark:hover:bg-white/[0.14]',

  btnSecondarySm:
    'inline-flex items-center justify-center rounded-lg bg-black/[0.06] px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-black/[0.1] dark:bg-white/10 dark:text-white dark:hover:bg-white/[0.14]',

  btnGhost:
    'rounded-lg bg-black/[0.06] px-3 py-2 text-sm font-semibold text-neutral-900 transition enabled:hover:bg-black/[0.1] disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/10 dark:text-white dark:enabled:hover:bg-white/[0.14]',

  btnIcon:
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.06] text-neutral-700 transition hover:bg-black/[0.1] dark:bg-white/10 dark:text-neutral-200 dark:hover:bg-white/[0.14]',

  input:
    'w-full rounded-lg bg-white px-3 py-2 text-sm text-neutral-900 shadow-inner shadow-black/[0.04] outline-none ring-0 placeholder:text-neutral-400 focus:ring-2 focus:ring-black/10 dark:bg-neutral-950/60 dark:text-white dark:placeholder:text-neutral-500 dark:focus:ring-white/15',

  textarea:
    'min-h-28 w-full rounded-lg bg-white px-3 py-2 text-sm text-neutral-900 shadow-inner shadow-black/[0.04] outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-black/10 dark:bg-neutral-950/60 dark:text-white dark:placeholder:text-neutral-500 dark:focus:ring-white/15',

  /** Portfolio still / video frame */
  mockupFrame:
    'overflow-hidden rounded-2xl shadow-[0_20px_50px_-28px_rgba(0,0,0,0.28)] transition-shadow duration-300 dark:shadow-[0_24px_56px_-20px_rgba(0,0,0,0.65)]',

  mockupHoverLift:
    'transition group-hover:shadow-[0_24px_60px_-22px_rgba(0,0,0,0.32)] dark:group-hover:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.7)]',

  /** Lightbox chrome on dark overlay */
  btnOverlay:
    'rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15',

  /** Tri-fold “paper” face — soft shadow, no hard stroke */
  brochurePaper:
    'rounded-sm bg-white shadow-[0_20px_44px_-20px_rgba(0,0,0,0.45)] dark:bg-neutral-100',

  /** Floating hint chips (flip prompts) */
  hintFloating:
    'rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-neutral-800 shadow-md backdrop-blur-sm dark:bg-black/50 dark:text-white/90',

  /** Full-screen lightbox image */
  lightboxImage:
    'max-h-[85vh] w-auto max-w-[95vw] rounded-2xl bg-white object-contain shadow-2xl shadow-black/30 dark:bg-neutral-950 dark:shadow-black/60',
} as const
