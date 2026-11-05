import { createFileRoute } from "@tanstack/react-router";
import { PageTransition } from "@/components/motion/PageTransition";
import { Hero } from "@/components/site/Hero";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact, Philosophy, Process, Services } from "@/components/site/Sections";
import { getProjectsFn } from "@/lib/projects-api";

export const Route = createFileRoute("/")(  {
  loader: () => getProjectsFn(),
  head: () => ({
    meta: [
      { title: "HG Designing and Printing — Vadodara" },
      { name: "description", content: "Posters, banners, visiting cards, wedding invitations and logos, designed and printed in Vadodara. Affordable designs." },
      { property: "og:title", content: "HG Designing and Printing — Vadodara" },
      { property: "og:description", content: "Design it. Print it. Both here. Affordable designs in Vadodara." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const projects = Route.useLoaderData();
  return (
    <PageTransition>
      <main>
        <Hero />
        <Philosophy />
        <Gallery projects={projects} />
        <Services />
        <Testimonials />
        <Process />
        <Contact />
      </main>
    </PageTransition>
  );
}
