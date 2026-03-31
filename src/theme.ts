export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'portfolio-theme'

export function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY)
    if (t === 'light') return 'light'
  } catch {
    /* ignore */
  }
  return 'dark'
}

export function writeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

export function applyDomTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
