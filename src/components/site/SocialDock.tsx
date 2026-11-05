import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { contact } from "@/lib/content";

type Item = { name: string; href: string; icon: ReactNode; style?: string };

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.57 14.85L2 22l5.3-1.39A9.9 9.9 0 1 0 12.04 2Zm0 18.06a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.05.8.81-2.98-.19-.31a8.13 8.13 0 1 1 6.86 3.8Zm4.46-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.28.18-.53.06a6.63 6.63 0 0 1-1.95-1.2 7.4 7.4 0 0 1-1.35-1.68c-.14-.24-.02-.37.1-.5.11-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.02.4 1.37.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M13.5 21v-7.2h2.42l.36-2.8H13.5V9.2c0-.81.23-1.36 1.39-1.36h1.48V5.35c-.26-.03-1.14-.11-2.17-.11-2.15 0-3.62 1.31-3.62 3.72V11H8.15v2.8h2.43V21h2.92Z" />
    </svg>
  );
}

const items: Item[] = [
  { name: "WhatsApp", href: contact.whatsapp, icon: <WhatsAppIcon />, style: "bg-whatsapp text-white" },
  { name: "Instagram", href: contact.instagram, icon: <InstagramIcon />, style: "instagram-gradient text-white" },
  { name: "Facebook", href: contact.facebook, icon: <FacebookIcon />, style: "bg-facebook text-white" },
];

export function SocialDock() {
  return (
    <motion.aside
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-16 right-3 z-40 md:bottom-5 md:right-5"
      aria-label="Contact us on social media"
    >
      <ul className="flex flex-col items-center gap-1.5">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`HG Designing and Printing on ${item.name}`}
              title={item.name}
              className={`group relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg ring-1 ring-white/10 transition-transform hover:scale-110 md:h-11 md:w-11 ${item.style}`}
            >
              {item.icon}
              <span className="meta pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-obsidian px-3 py-1.5 text-porcelain opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {item.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
