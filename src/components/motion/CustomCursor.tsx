import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const x = useSpring(cx, { stiffness: 500, damping: 28 });
  const y = useSpring(cy, { stiffness: 500, damping: 28 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setVisible(true);

    const move = (e: PointerEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='grow']",
      );
      setHovered(!!isInteractive);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [cx, cy]);

  if (!visible) return null;

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovered ? 48 : 12,
        height: hovered ? 48 : 12,
        backgroundColor: hovered ? "rgba(199, 44, 65, 0.1)" : "#C72C41",
        borderColor: "#C72C41",
        borderWidth: hovered ? 2 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
    />
  );
}

