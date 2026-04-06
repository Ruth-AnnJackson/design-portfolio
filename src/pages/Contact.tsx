import { SITE_EMAIL, SITE_EMAIL_MAILTO } from '../content/site'
import { ui } from '../ui/classes'

export function Contact() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Contact
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          Want to work together? Send a message and tell me about your project.
        </p>
      </header>

      <section className={`grid gap-5 p-6 md:grid-cols-2 ${ui.surfaceSection}`}>
        <div className="space-y-2">
          <div className="text-sm font-semibold text-neutral-900 dark:text-white">Email</div>
          <a
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            href={SITE_EMAIL_MAILTO}
          >
            {SITE_EMAIL}
          </a>
          <div className="text-xs text-neutral-500 dark:text-neutral-500">
            Best for project details, timelines, and links.
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-neutral-900 dark:text-white">
            Quick message
          </div>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const data = new FormData(form)
              const name = String(data.get('name') ?? '')
              const message = String(data.get('message') ?? '')
              const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'someone'}`)
              const body = encodeURIComponent(message)
              window.location.href = `${SITE_EMAIL_MAILTO}?subject=${subject}&body=${body}`
            }}
          >
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                Name
              </div>
              <input name="name" className={ui.input} placeholder="Your name" />
            </label>
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                Message
              </div>
              <textarea
                name="message"
                className={ui.textarea}
                placeholder="What do you need designed?"
              />
            </label>
            <button type="submit" className={ui.btnPrimarySm}>
              Email me
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
