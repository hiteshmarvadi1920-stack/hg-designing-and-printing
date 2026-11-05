import { MaskReveal } from "@/components/motion/Kinetic";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const items = [...testimonials, ...testimonials];

  return (
    <section aria-label="Testimonials" className="section-dark overflow-hidden py-28">
      <div className="mb-14 px-4 md:px-8">
        <h2 className="text-huge">
          <MaskReveal>Kind</MaskReveal>
          <MaskReveal delay={0.1}>
            <span className="font-serif font-normal italic tracking-normal text-silver">words</span>
            <span className="text-cherry">.</span>
          </MaskReveal>
        </h2>
      </div>
      <div className="relative">
        <div className="marquee-testimonials flex w-max gap-6 px-4 hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="group w-[320px] shrink-0 rounded-sm border border-porcelain/10 bg-porcelain/5 p-8 transition-all hover:border-porcelain/25 hover:bg-porcelain/10 md:w-[400px]"
            >
              <span className="font-serif text-6xl leading-none text-cherry" aria-hidden="true">
                &ldquo;
              </span>
              <p className="mt-2 font-serif text-xl italic text-porcelain md:text-2xl">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cherry font-display text-sm text-porcelain">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display text-sm text-porcelain">{t.name}</p>
                  <p className="meta text-silver">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
