import { motion, useScroll, useTransform, useMotionValue, animate, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, useSpring } from "framer-motion";
import { MaskReveal } from "@/components/motion/Kinetic";
import { Loop, Ring, Shard } from "@/components/motion/Sculptures";
import { contact, process, services, stats } from "@/lib/content";

/* ─── Animated counter (inlined from former Stats.tsx) ─── */

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [isInView, count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Philosophy + Stats ─── */

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  return (
    <section ref={ref} aria-label="Approach" className="section-light relative overflow-hidden px-4 py-32 md:px-8">
      <motion.div style={{ rotate: rot, y }} className="pointer-events-none absolute -right-20 top-10 w-[60vw] opacity-70 md:w-[30vw]">
        <Ring id="phr" className="w-full" />
      </motion.div>
      <h2 className="text-huge relative max-w-6xl">
        Your vision <span className="font-serif font-normal italic tracking-normal">+</span> our design <span className="text-cherry">=</span> perfect print.
      </h2>
      <div className="relative mt-16 grid max-w-4xl gap-8 md:ml-[40%] md:grid-cols-2">
        <p className="text-lg">HG Designing and Printing designs and prints under one roof. Designs at <strong>affordable</strong> prices — send your brief and we confirm the exact price.</p>
        <p className="font-serif text-2xl italic text-muted-foreground">Nothing goes to print until you approve the proof.</p>
      </div>

      {/* Stats counters */}
      <div className="relative mt-20 grid grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="font-display text-4xl md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="meta mt-3 text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Services (LIGHT theme) ─── */

export function Services() {
  const [img, setImg] = useState<string | null>(null);
  const cx = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 });
  const cy = useSpring(useMotionValue(0), { stiffness: 250, damping: 28 });
  return (
    <section
      id="services"
      aria-label="Services"
      className="section-light relative px-4 py-28 md:px-8"
      onPointerMove={(e) => { cx.set(e.clientX); cy.set(e.clientY); }}
      onPointerLeave={() => setImg(null)}
    >
      <AnimatePresence>
        {img && (
          <motion.img
            key={img}
            src={img}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{ x: cx, y: cy }}
            className="pointer-events-none fixed left-0 top-0 z-40 ml-6 -mt-24 hidden w-56 rounded-sm object-contain shadow-2xl md:block"
          />
        )}
      </AnimatePresence>
      <div className="mb-14 flex items-end justify-between">
        <h2 className="text-huge">
          <MaskReveal>What we</MaskReveal>
          <MaskReveal delay={0.1}>make<span className="text-cherry">.</span></MaskReveal>
        </h2>
        <p className="meta hidden text-silver md:block">Affordable designs</p>
      </div>
      <ul className="border-t border-obsidian/10">
        {services.map((s, i) => (
          <motion.li
            key={s.name}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              onPointerEnter={() => setImg(s.image ?? null)}
              onPointerLeave={() => setImg(null)}
              className="group relative flex flex-col gap-1 overflow-hidden border-b border-obsidian/10 py-6 md:flex-row md:items-center md:gap-10"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-obsidian transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
              <span className="meta relative w-10 text-silver group-hover:text-cherry">{String(i + 1).padStart(2, "0")}</span>
              <span className="relative font-display text-3xl transition-all duration-500 group-hover:translate-x-4 group-hover:text-porcelain md:text-5xl">{s.name}</span>
              <span className="relative text-muted-foreground group-hover:text-smoke md:ml-auto md:max-w-xs md:text-right">{s.note}</span>
              <span className="relative hidden text-2xl text-cherry opacity-0 transition-opacity group-hover:opacity-100 md:block">↗</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/* ─── Process (with Shard sculpture) ─── */

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rot = useTransform(scrollYProgress, [0, 1], [20, -30]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section ref={ref} id="process" aria-label="How an order works" className="section-light relative overflow-hidden px-4 py-28 md:px-8">
      <motion.div style={{ rotate: rot, y }} className="pointer-events-none absolute -left-16 top-20 w-[50vw] opacity-50 md:-left-10 md:w-[22vw]">
        <Shard id="ps" className="w-full" />
      </motion.div>
      <h2 className="text-huge relative mb-12">How it works<span className="text-cherry">.</span></h2>
      <div className="relative grid gap-px bg-border md:grid-cols-5">
        {process.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group bg-porcelain p-6 transition-colors hover:bg-obsidian hover:text-porcelain"
          >
            <span className="font-display text-6xl text-smoke transition-colors group-hover:text-cherry">{i + 1}</span>
            <h3 className="mt-6 font-display text-2xl">{p.step}</h3>
            <p className="mt-2 text-sm opacity-75">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Contact + Footer (merged) ─── */

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  return (
    <section ref={ref} id="contact" aria-label="Contact" className="section-dark relative overflow-hidden px-4 pb-8 pt-32 md:px-8">
      <div className="pointer-events-none absolute left-[55%] top-24 w-[40vw] opacity-60 md:w-[22vw]">
        <Loop id="cl" className="spin-slow w-full" />
      </div>
      <h2 className="text-mega relative">
        <motion.span style={{ x: x1 }} className="block">Let&apos;s</motion.span>
        <motion.span style={{ x: x2 }} className="block md:text-right">
          <span className="font-serif font-normal italic tracking-normal text-silver">print</span> it<span className="text-cherry">.</span>
        </motion.span>
      </h2>
      <p className="mt-10 max-w-md text-lg text-smoke">Tell us what you need and by when, and we will reply with the price.</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="rounded-full bg-cherry px-8 py-4 font-display text-sm tracking-wide text-porcelain transition-transform hover:scale-105">ORDER ON WHATSAPP ↗</a>
        <a href={contact.phoneHref} className="rounded-full border border-porcelain/30 px-8 py-4 font-display text-sm tracking-wide transition-colors hover:bg-porcelain hover:text-obsidian">CALL US</a>
      </div>

      {/* Contact details */}
      <dl className="mt-24 grid gap-8 border-t border-porcelain/15 pt-10 md:grid-cols-3">
        <div><dt className="meta text-silver">Location</dt><dd className="mt-2 text-xl">{contact.location}</dd></div>
        <div><dt className="meta text-silver">Phone &amp; WhatsApp</dt><dd className="mt-2 text-xl"><a href={contact.phoneHref} className="hover:text-cherry">{contact.phone}</a></dd></div>
        <div><dt className="meta text-silver">Email</dt><dd className="mt-2 text-xl"><a href={`mailto:${contact.email}`} className="hover:text-cherry">{contact.email}</a></dd></div>
      </dl>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-porcelain/15 py-4" aria-hidden="true">
        <div className="marquee flex w-max gap-10 font-display text-4xl text-silver">
          {Array.from({ length: 2 }).flatMap((_, k) => ["DESIGNING", "✦", "FLEX BANNER", "✦", "ADVERTISING", "✦", "BRANDING", "✦"].map((w, i) => <span key={`${k}-${i}`} className={w === "✦" ? "text-cherry" : ""}>{w}</span>))}
        </div>
      </div>

      {/* Footer content (merged) */}
      <div className="mt-16 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-xl">HG Designing<br />and Printing</p>
          <p className="mt-3 text-sm text-smoke">Design it. Print it. Both here.</p>
          <p className="mt-2 text-sm text-silver">{contact.location}</p>
        </div>
        <div>
          <h3 className="meta mb-4 text-silver">Quick links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/#work" className="text-smoke transition-colors hover:text-cherry">Work</a></li>
            <li><a href="/#services" className="text-smoke transition-colors hover:text-cherry">Services</a></li>
            <li><a href="/#process" className="text-smoke transition-colors hover:text-cherry">Process</a></li>
          </ul>
        </div>
        <div>
          <h3 className="meta mb-4 text-silver">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li><a href={contact.whatsapp} target="_blank" rel="noreferrer" className="text-smoke transition-colors hover:text-cherry">WhatsApp</a></li>
            <li><a href={contact.instagram} target="_blank" rel="noreferrer" className="text-smoke transition-colors hover:text-cherry">Instagram</a></li>
            <li><a href={contact.facebook} target="_blank" rel="noreferrer" className="text-smoke transition-colors hover:text-cherry">Facebook</a></li>
            <li><a href={`mailto:${contact.email}`} className="text-smoke transition-colors hover:text-cherry">{contact.email}</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-porcelain/10 pt-6 text-center md:flex-row md:text-left">
        <p className="meta text-silver">© 2026 HG Designing and Printing, Vadodara.</p>
        <p className="meta text-silver">Made with ❤️ in Vadodara</p>
      </div>
    </section>
  );
}
