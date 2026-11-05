import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { LetterReveal } from "@/components/motion/Kinetic";
import { contact } from "@/lib/content";
import heroBg from "@/assets/images/hero-metal.jpg";

function Layer({ mx, my, depth, className, children }: { mx: MotionValue<number>; my: MotionValue<number>; depth: number; className?: string; children: ReactNode }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return <motion.div style={{ x, y }} className={className}>{children}</motion.div>;
}

export function Hero() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useSpring(rx, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(ry, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const amp = window.innerWidth < 1024 ? 0.5 : 1;
    const move = (e: PointerEvent) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1) * amp;
      const y = ((e.clientY / window.innerHeight) * 2 - 1) * amp;
      rx.set(x); ry.set(y);
    };
    const leave = () => { rx.set(0); ry.set(0); };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, [reduce, rx, ry]);

  return (
    <section className="section-dark relative min-h-[100svh] overflow-hidden" aria-label="Introduction">
      {/* Dark metallic background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 1.6 }, scale: { duration: 8, ease: "easeOut" } }}
      >
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/35 to-obsidian" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-obsidian via-obsidian/70 to-transparent" />
      </motion.div>
      <div className="grain absolute inset-0 opacity-30"><span /></div>

      <Layer mx={mx} my={my} depth={-10} className="meta pointer-events-none absolute inset-0 text-silver">
        <span className="absolute left-[6%] top-[22%]">Studio — Vadodara</span>
        <span className="absolute right-[6%] top-[22%] hidden md:block">22.3072° N / 73.1812° E</span>
      </Layer>

      <Layer mx={mx} my={my} depth={-8} className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-28 pt-32 md:px-8 md:pb-28">
        <p className="meta mb-6 text-silver">HG Designing and Printing — Hitesh Marvadi</p>
        <h1 className="text-mega-tight text-pop">
          <LetterReveal text="HG DESIGNING" className="block" delay={0.4} />
          <span className="block">
            <span className="inline-block scale-125" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 700 }} aria-hidden="true">&amp;</span>{" "}
            <LetterReveal text="PRINTING" delay={0.7} />
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 14 }} className="inline-block text-cherry">.</motion.span>
          </span>
        </h1>
        <div className="pointer-events-auto mt-8 flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 1 }} className="max-w-md text-lg text-smoke md:mr-auto">
            Posters, banners, visiting cards, wedding invitations and logos — <span className="font-serif text-2xl italic text-porcelain">designed and printed</span> in Vadodara.
          </motion.p>
          <motion.a
            href="#work"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            whileHover={{ scale: 1.04 }}
            className="group inline-flex items-center gap-3 self-start rounded-full bg-porcelain px-7 py-4 font-display text-sm tracking-wide text-obsidian transition-colors hover:bg-cherry hover:text-porcelain"
          >
            EXPLORE THE WORK <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
          </motion.a>
          <motion.a href={contact.whatsapp} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 1 }} whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-3 self-start rounded-full bg-cherry px-7 py-4 font-display text-sm tracking-wide text-porcelain">
            ORDER ON WHATSAPP ↗
          </motion.a>
        </div>
      </Layer>
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden bg-gradient-to-r from-silver via-smoke to-silver py-3 text-obsidian" aria-label="Designs start from just ₹199, printing, advertisement, flex banners">
        <div className="marquee flex w-max gap-8 font-display text-base md:text-lg" aria-hidden="true">
          {Array.from({ length: 2 }).flatMap((_, k) => ["DESIGNS START FROM JUST ₹199", "PRINTING", "ADVERTISEMENT", "FLEX BANNERS", "VISITING CARDS", "WEDDING CARDS", "LOGOS"].flatMap((w, i) => [<span key={`${k}-${i}`}>{w}</span>, <span key={`${k}-${i}s`} className="text-cherry">✦</span>]))}
        </div>
      </div>
    </section>
  );
}
