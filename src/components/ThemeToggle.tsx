import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-black/[0.04] text-neutral-700 transition hover:border-black/15 hover:bg-black/[0.07] dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-white/20 dark:hover:bg-white/10"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-[1.15rem] w-[1.15rem]"
          aria-hidden
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-[1.15rem] w-[1.15rem]"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 2.25 0 00-1.072.136.75.75 0 01-.712-.615 7.5 7.5 0 00-7.17-7.17.75.75 0 01-.615-.712A9.004 9.004 0 0112 3c2.52 0 4.79 1.03 6.43 2.69.22.22.388.48.5.77a.75.75 0 01-.04.52 9 9 0 01-8.45 4.92.75.75 0 01-.788-.755c0-.23.07-.45.2-.63A8.96 8.96 0 009 13.5c0-1.61.424-3.12 1.17-4.43l-1.642-1.642z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  )
}
