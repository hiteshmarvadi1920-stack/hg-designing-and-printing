import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import logo from "@/assets/images/logo-light.png";
import { contact } from "@/lib/content";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 md:px-8"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-obsidian via-obsidian/80 to-transparent md:h-28"
        />
        <Link to="/" aria-label="HG Designing and Printing, home" className="rounded-sm">
          <img src={logo} alt="HG Designing and Printing logo" className="h-9 w-auto md:h-11" />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 rounded-full bg-obsidian/85 px-2 py-1.5 text-porcelain backdrop-blur sm:flex"
          aria-label="Main"
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="meta rounded-full px-3 py-1.5 transition-colors hover:text-cherry"
            >
              {l.label}
            </a>
          ))}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="meta rounded-full bg-cherry px-3 py-1.5 transition-transform hover:scale-105"
          >
            Order ↗
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-6 bg-porcelain"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-[2px] w-6 bg-porcelain"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-[2px] w-6 bg-porcelain"
          />
        </button>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-obsidian"
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-4xl text-porcelain transition-colors hover:text-cherry"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + navLinks.length * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-4 rounded-full bg-cherry px-8 py-4 font-display text-sm tracking-wide text-porcelain"
            >
              ORDER ON WHATSAPP ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
