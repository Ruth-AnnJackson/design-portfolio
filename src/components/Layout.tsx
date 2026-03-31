import { NavLink, Outlet } from 'react-router-dom'
import { SITE_EMAIL_MAILTO } from '../content/site'

const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm font-medium tracking-wide transition',
    isActive ? 'text-white' : 'text-neutral-300 hover:text-white',
  ].join(' ')

export function Layout() {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-50">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
          <NavLink to="/" className="group">
            <div className="text-sm font-semibold tracking-[0.18em] text-white">
              RUTH-ANN JACKSON
            </div>
            <div className="text-xs tracking-wide text-neutral-400 group-hover:text-neutral-300">
              Graphic Design • Content Creation
            </div>
          </NavLink>

          <nav className="flex items-center gap-5">
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
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Ruth-Ann Jackson</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href={SITE_EMAIL_MAILTO}>
              Email
            </a>
            <a
              className="hover:text-white"
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

