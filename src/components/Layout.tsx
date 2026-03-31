import { NavLink, Outlet } from 'react-router-dom'
import { SITE_EMAIL_MAILTO } from '../content/site'
import { ThemeToggle } from './ThemeToggle'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm font-medium tracking-wide transition',
    isActive
      ? 'text-neutral-900 dark:text-white'
      : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white',
  ].join(' ')

export function Layout() {
  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-neutral-50/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:flex-nowrap sm:gap-6">
          <NavLink to="/" className="group min-w-0">
            <div className="text-sm font-semibold tracking-[0.18em] text-neutral-900 dark:text-white">
              RUTH-ANN JACKSON
            </div>
            <div className="text-xs tracking-wide text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300">
              Graphic Design • Content Creation
            </div>
          </NavLink>

          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5">
            <ThemeToggle />
            <nav className="flex items-center gap-4 sm:gap-5">
              <NavLink to="/projects" className={navLinkClassName}>
                Projects
              </NavLink>
              <NavLink to="/showcase" className={navLinkClassName}>
                Showcase
              </NavLink>
              <NavLink to="/about" className={navLinkClassName}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClassName}>
                Contact
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-neutral-500 dark:text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Ruth-Ann Jackson</div>
          <div className="flex gap-4">
            <a
              className="hover:text-neutral-900 dark:hover:text-white"
              href={SITE_EMAIL_MAILTO}
            >
              Email
            </a>
            <a
              className="hover:text-neutral-900 dark:hover:text-white"
              href="https://ruthannfnjackson.wixsite.com/ruth-ann-jackson"
              target="_blank"
              rel="noreferrer"
            >
              Legacy site
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

