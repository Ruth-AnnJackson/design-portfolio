import { useState } from 'react'

const aboutIntro =
  'I’m a graphic designer and content creator based in Florida, United States. Over the past five years, I’ve focused on modern, purposeful work across digital and print—event and promo flyers, social and campaign graphics, logo and identity pieces, and short-form promotional video when motion tells the story best.'

const aboutClosing =
  'I like collaborating closely with clients so the work reflects their vision, not just a template. Strong design should look intentional and communicate what the brand stands for, clearly and memorably. Whether you’re launching something new, refining an identity, or need consistent assets across channels, I’d love to hear what you’re building. Get in touch and we can talk through your goals, timeline, and how I can help.'

export function About() {
  const [imgOk, setImgOk] = useState(true)

  return (
    <div className="space-y-7">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          About
        </h1>
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-neutral-300">
          <p>{aboutIntro}</p>
          <p>{aboutClosing}</p>
        </div>
      </header>

      <section className="grid gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4">
          <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/15 via-cyan-400/10 to-amber-300/10">
            {imgOk ? (
              <img
                src="/profile.png"
                alt="Portrait of Ruth-Ann Jackson, graphic designer and content creator"
                className="h-full w-full object-cover object-[center_15%]"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-semibold tracking-tight text-white">
                    RJ
                  </div>
                  <div className="mt-2 text-xs text-neutral-300">
                    Add <span className="font-semibold text-white">public/profile.png</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 md:col-span-8">
          <div className="text-sm font-semibold text-white">
            What I’m great at
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'Brand identity systems',
              'Clean print layout',
              'Social graphics',
              'Presentation mockups',
            ].map((x) => (
              <div
                key={x}
                className="rounded-xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm text-neutral-200"
              >
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

