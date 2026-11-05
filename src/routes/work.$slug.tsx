import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { contact } from "@/lib/content";
import { getProjectsFn } from "@/lib/projects-api";
import { LetterReveal } from "@/components/motion/Kinetic";
import { PageTransition } from "@/components/motion/PageTransition";

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const projects = await getProjectsFn();
    const i = projects.findIndex((p) => p.slug === params.slug);
    if (i < 0) throw notFound();
    const project = projects[i]!;
    const next = projects[(i + 1) % projects.length]!;
    const related = projects.filter((p) => p.slug !== params.slug).slice(0, 3);
    return { project, next, related, index: i };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — HG Designing and Printing` },
          { name: "description", content: loaderData.project.description },
          { property: "og:title", content: `${loaderData.project.title} — HG Designing and Printing` },
          { property: "og:description", content: loaderData.project.description },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p, next, related, index } = Route.useLoaderData();
  return (
    <PageTransition>
      <main className="section-dark min-h-screen">
        {/* Hero image */}
        <motion.div
          initial={{ clipPath: "inset(50% 0 50% 0)" }}
          animate={{ clipPath: "inset(0% 0 0% 0)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-obsidian px-4 pt-24"
        >
          <img
            src={p.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl"
          />
          <motion.img
            layoutId={`img-${p.slug}`}
            src={p.image}
            alt={p.description}
            className="relative max-h-[78svh] w-auto max-w-full object-contain shadow-2xl"
          />
        </motion.div>

        {/* Project info */}
        <section className="px-4 py-20 md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="meta text-cherry"
          >
            {p.category}
          </motion.p>
          <h1 className="text-huge mt-4">
            <LetterReveal text={p.title} delay={0.5} />
          </h1>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <p className="font-serif text-3xl italic text-smoke md:col-span-2">
              {p.description}
            </p>
            <div className="flex flex-col items-start gap-6">
              {/* Quick facts */}
              <dl className="grid w-full grid-cols-2 gap-4 border-t border-porcelain/15 pt-6">
                <div>
                  <dt className="meta text-silver">Category</dt>
                  <dd className="mt-1 text-lg">{p.category}</dd>
                </div>
                <div>
                  <dt className="meta text-silver">Project</dt>
                  <dd className="mt-1 text-lg">
                    #{String(index + 1).padStart(2, "0")}
                  </dd>
                </div>
                <div>
                  <dt className="meta text-silver">Year</dt>
                  <dd className="mt-1 text-lg">{p.year}</dd>
                </div>
                <div>
                  <dt className="meta text-silver">Status</dt>
                  <dd className="mt-1 text-lg">Delivered</dd>
                </div>
              </dl>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cherry px-7 py-4 font-display text-sm text-porcelain transition-transform hover:scale-105"
              >
                ORDER ON WHATSAPP ↗
              </a>
            </div>
          </div>
        </section>

        {/* Related work */}
        <section className="border-t border-porcelain/15 px-4 py-20 md:px-8">
          <h2 className="meta mb-8 text-silver">More work</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/work/$slug"
                params={{ slug: r.slug }}
                className="group block"
              >
                <motion.div
                  className="relative overflow-hidden bg-obsidian"
                  style={{ aspectRatio: "4/5" }}
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={r.image}
                    alt={r.description}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-obsidian/0 p-4 opacity-0 transition-all duration-500 group-hover:bg-obsidian/60 group-hover:opacity-100">
                    <span className="meta text-cherry">{r.category}</span>
                    <span className="font-display text-lg text-porcelain">
                      {r.title}
                    </span>
                  </div>
                </motion.div>
                <h3 className="mt-2 font-display text-lg transition-colors group-hover:text-cherry">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Next project */}
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group flex items-center justify-between border-t border-porcelain/15 px-4 py-14 md:px-8"
        >
          <span className="meta text-silver">Next project</span>
          <span className="text-huge transition-colors group-hover:text-cherry">
            {next.title} →
          </span>
        </Link>
        <div className="px-4 pb-10 md:px-8">
          <Link to="/" hash="work" className="meta text-silver hover:text-cherry">
            ← All work
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
