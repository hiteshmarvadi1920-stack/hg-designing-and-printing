import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { SocialDock } from "../components/site/SocialDock";
import { Preloader } from "../components/site/Preloader";
import { ScrollProgress } from "../components/site/ScrollProgress";
import { BackToTop } from "../components/site/BackToTop";
import { CustomCursor } from "../components/motion/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(    {
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HG Designing and Printing — Posters, Banners & Visiting Cards in Vadodara" },
      { name: "description", content: "HG Designing and Printing is a creative design and print studio in Vadodara, Gujarat. We create posters, banners, visiting cards, stickers, packaging, and more — 7+ years of experience, 500+ designs delivered." },
      { name: "keywords", content: "graphic design Vadodara, printing services Vadodara, poster design, banner printing, visiting card design, sticker printing, packaging design, HG Designing, Gujarat print shop" },
      { name: "author", content: "HG Designing and Printing" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "HG Designing and Printing — Posters, Banners & Visiting Cards in Vadodara" },
      { property: "og:description", content: "Creative design and print studio in Vadodara, Gujarat. Posters, banners, visiting cards, stickers, packaging and more." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://hg-designing-and-printing.vercel.app" },
      { property: "og:image", content: "https://hg-designing-and-printing.vercel.app/work/w08.jpeg" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: "HG Designing and Printing" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "HG Designing and Printing — Vadodara" },
      { name: "twitter:description", content: "Creative design and print studio in Vadodara. Posters, banners, visiting cards & more." },
      { name: "twitter:image", content: "https://hg-designing-and-printing.vercel.app/work/w08.jpeg" },
      { name: "geo.region", content: "IN-GJ" },
      { name: "geo.placename", content: "Vadodara" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "canonical", href: "https://hg-designing-and-printing.vercel.app" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@1,700&family=Space+Grotesk:wght@400;500;700&family=Space+Mono&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "HG Designing and Printing",
          "description": "Creative design and print studio in Vadodara, Gujarat. Posters, banners, visiting cards, stickers, packaging and more.",
          "url": "https://hg-designing-and-printing.vercel.app",
          "image": "https://hg-designing-and-printing.vercel.app/work/w08.jpeg",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Vadodara",
            "addressRegion": "Gujarat",
            "addressCountry": "IN"
          },
          "areaServed": "Vadodara",
          "priceRange": "₹",
          "sameAs": [
            "https://www.instagram.com/hg_designing_and_printing",
            "https://www.facebook.com/hgdesigningandprinting"
          ]
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const { hash, pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  // Nav links use #anchors; clear the hash once landed so a refresh starts at the top.
  // resetScroll:false keeps the reader where they are while the URL is cleaned up.
  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      // Clear the hash without scrolling: resetScroll:false keeps the reader where they are.
      router.navigate({
        to: pathname,
        search: {},
        hash: "",
        replace: true,
        resetScroll: false,
        hashScrollIntoView: false,
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [hash, pathname, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      {!isAdmin && <Preloader />}
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <CustomCursor />}
      {!isAdmin && <Nav />}
      {!isAdmin && <SocialDock />}
      <Outlet />
      {!isAdmin && <BackToTop />}
    </QueryClientProvider>
  );
}
