import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LetterReveal } from "@/components/motion/Kinetic";

export function Preloader() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("hg-preloader-seen");
  });

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      sessionStorage.setItem("hg-preloader-seen", "1");
      setShow(false);
    }, 2600);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 className="font-display text-7xl text-porcelain md:text-9xl">
              <LetterReveal text="HG" delay={0.2} />
            </h1>
            <p className="meta mt-6 text-cherry">
              <LetterReveal text="DESIGNING AND PRINTING" delay={0.7} />
            </p>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease: "linear", delay: 0.3 }}
            className="absolute bottom-20 left-1/2 h-[2px] w-32 -translate-x-1/2 origin-left bg-cherry"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

