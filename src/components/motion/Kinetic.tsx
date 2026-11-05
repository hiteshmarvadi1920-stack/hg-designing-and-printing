import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/** Letters enter from alternating directions. */
export function LetterReveal({ text, className, letterClassName, delay = 0 }: { text: string; className?: string; letterClassName?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => {
        const dir = i % 3;
        return (
          <motion.span
            key={i}
            aria-hidden="true"
            className={`inline-block ${letterClassName ?? ""}`}
            initial={reduce ? false : { opacity: 0, y: dir === 0 ? "80%" : dir === 1 ? "-60%" : 0, x: dir === 2 ? "40%" : 0, rotate: dir === 1 ? -8 : 4, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.05 }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        );
      })}
    </span>
  );
}

/** Clip-mask reveal on scroll into view. */
export function MaskReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span className={`block overflow-hidden ${className ?? ""}`} initial={reduce ? false : "hidden"} whileInView="shown" viewport={{ once: true, amount: 0.2 }}>
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, shown: { y: 0 } }}
        transition={{ duration: 1, ease, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Heading that expands letter-spacing / shifts as you scroll past. */
export function ScrollStretch({ children, className, from = "-0.06em", to = "0.04em", shift = 0 }: { children: ReactNode; className?: string; from?: string; to?: string; shift?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ls = useTransform(scrollYProgress, [0, 0.6], [from, to]);
  const x = useTransform(scrollYProgress, [0, 1], [`${-shift}%`, `${shift}%`]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? {} : { letterSpacing: ls, x }}>
      {children}
    </motion.div>
  );
}
