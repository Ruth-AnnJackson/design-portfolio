import { SITE_EMAIL, SITE_EMAIL_MAILTO } from '../content/site'

export function Contact() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Contact
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-neutral-300">
          Want to work together? Send a message and tell me about your project.
        </p>
      </header>

      <section className="grid gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-semibold text-white">Email</div>
          <a
            className="text-sm text-neutral-300 hover:text-white"
            href={SITE_EMAIL_MAILTO}
          >
            {SITE_EMAIL}
          </a>
          <div className="text-xs text-neutral-500">
            Replace this with your preferred contact email.
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Quick message</div>
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
              <div className="mb-1 text-xs font-semibold text-neutral-300">
                Name
              </div>
              <input
                name="name"
                className="w-full rounded-xl border border-white/10 bg-neutral-950/60 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-neutral-500 focus:border-white/20"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <div className="mb-1 text-xs font-semibold text-neutral-300">
                Message
              </div>
              <textarea
                name="message"
                className="min-h-28 w-full rounded-xl border border-white/10 bg-neutral-950/60 px-3 py-2 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
                placeholder="What do you need designed?"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
            >
              Email me
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

