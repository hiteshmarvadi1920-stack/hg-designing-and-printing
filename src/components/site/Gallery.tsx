import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { Project } from "@/lib/content";
import { MaskReveal } from "@/components/motion/Kinetic";

export function Gallery({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="section-dark relative overflow-visible px-4 py-24 md:px-8"
    >
      {/* Canvas texture — grain + faint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(circle, oklch(0.6 0 0 / 0.4) 1px, transparent 1px),
            linear-gradient(to right, oklch(0.5 0 0 / 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.5 0 0 / 0.18) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px, 90px 90px, 90px 90px",
        }}
      />

      {/* Header */}
      <div className="relative mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="text-huge">
          <MaskReveal>Selected</MaskReveal>
          <MaskReveal delay={0.1}>
            <span className="font-serif font-normal italic tracking-normal text-silver">
              work.
            </span>
          </MaskReveal>
        </h2>
        <p className="meta text-silver">{projects.length} projects</p>
      </div>

      {/* Compact masonry collage — 3 cols mobile, 4 tablet, 5 desktop */}
      <div
        className="relative mx-auto max-w-7xl columns-3 gap-2 sm:columns-4 md:gap-3 lg:columns-5"
      >
        {projects.map((p, i) => (
          <div key={p.slug} className="mb-2 break-inside-avoid md:mb-3">
            <CollageCard project={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Collage Card — natural aspect ratio, compact ─── */

function CollageCard({
  project: p,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.05, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        to="/work/$slug"
        params={{ slug: p.slug }}
        className="group block"
      >
        {/* Image at its natural aspect ratio */}
        <div
          className="relative overflow-hidden rounded-sm bg-obsidian"
          style={{ aspectRatio: p.ratio }}
        >
          <motion.img
            layoutId={`img-${p.slug}`}
            src={p.image}
            alt={p.description}
            loading={index < 5 ? "eager" : "lazy"}
            className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent p-2 opacity-0 transition-opacity duration-400 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-3">
            <span className="meta text-[0.55rem] text-cherry">{p.category}</span>
            <span className="font-display text-xs text-porcelain md:text-sm">
              {p.title}
            </span>
          </div>
        </div>
        {/* Title below — compact */}
        <div className="mt-1 flex items-baseline justify-between gap-1 pb-0.5">
          <h3 className="truncate font-display text-[0.65rem] leading-normal text-porcelain/80 transition-colors group-hover:text-cherry md:text-xs">
            {p.title}
          </h3>
          <span className="meta shrink-0 text-[0.5rem] text-silver/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
