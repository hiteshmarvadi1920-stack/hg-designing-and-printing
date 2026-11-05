export const contact = {
  studio: "HG Designing and Printing",
  location: "Vadodara, Gujarat",
  phone: "+91 90232 26564",
  phoneHref: "tel:+919023226564",
  whatsapp: "https://wa.me/919023226564",
  instagram: "https://www.instagram.com/hg_printing__designing?obrf=b3ZodjkyajFndjhw",
  facebook: "https://www.facebook.com/hitesh.marvadi.75",
  email: "hgprinting99@gmail.com",
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  ratio: string;
  year: string;
};

/** Default project data — used as fallback if JSON hasn't loaded yet */
export const defaultProjects: Project[] = [
  { slug: "riya-beauty-parlour", title: "Riya Beauty Parlour", category: "Banner", description: "Shop banner with a services list and bridal makeup.", image: "/work/w10.jpeg", ratio: "900/507", year: "2025" },
  { slug: "wedding-welcome", title: "Wedding Welcome", category: "Poster design", description: "Wedding welcome poster with a bride and groom illustration.", image: "/work/w04.jpeg", ratio: "600/900", year: "2026" },
  { slug: "haldi-ceremony", title: "Haldi Ceremony", category: "Poster design", description: "Haldi welcome poster with marigold umbrellas.", image: "/work/w05.jpeg", ratio: "600/900", year: "2026" },
  { slug: "mr-panda-labels", title: "Mr Panda", category: "Bottle labels", description: "Three soft drink bottle labels: Jamun, Spritee and Spark energy drink.", image: "/work/w08.jpeg", ratio: "1000/791", year: "2025" },
  { slug: "whoop-car-spa", title: "Whoop Car Spa", category: "Visiting card", description: "Front and back visiting card, ready to print.", image: "/work/w03.jpeg", ratio: "1/1", year: "2026" },
  { slug: "shree-radhe-pan", title: "Shree Radhe Pan", category: "Banner", description: "Pan shop name banner with a betel leaf emblem.", image: "/work/w11.jpeg", ratio: "800/451", year: "2025" },
  { slug: "fit-india-gym", title: "Fit India Gym", category: "Hoarding", description: "Hoarding for a flat 50% off annual membership offer for women.", image: "/work/w12.jpeg", ratio: "520/881", year: "2026" },
  { slug: "gloco-stickers", title: "Gloco", category: "Product stickers", description: "Floor cleaner and hand wash product sticker designs.", image: "/work/w09.jpeg", ratio: "900/704", year: "2025" },
  { slug: "nutrella-cookie-tin", title: "Nutrella Cookie Tin", category: "Sticker", description: "Round cookie tin sticker for Veena's Creative Pure Veg Kitchen.", image: "/work/w02.webp", ratio: "1/1", year: "2025" },
  { slug: "design-06", title: "Event Poster", category: "Poster design", description: "Event promotion poster design.", image: "/work/w06.jpeg", ratio: "640/960", year: "2025" },
  { slug: "design-07", title: "Brand Identity", category: "Branding", description: "Brand identity and logo package.", image: "/work/w07.jpeg", ratio: "640/960", year: "2025" },
];

/**
 * `projects` is kept for backwards‑compatible static imports.
 * Route loaders should prefer `getProjectsFn()` for live data from `data/projects.json`.
 */
export const projects: Project[] = defaultProjects;

export const services = [
  { name: "Poster design", note: "Events, offers, shop openings and campaigns.", image: "/work/w04.jpeg" },
  { name: "Banner & hoarding", note: "Large layouts that stay readable from the road.", image: "/work/w12.jpeg" },
  { name: "Visiting cards", note: "Card designs that are ready to print.", image: "/work/w03.jpeg" },
  { name: "Wedding invitations", note: "Invitation designs for wedding functions.", image: "/work/w05.jpeg" },
  { name: "Social media posts", note: "Instagram and Facebook posts that match your brand.", image: "/work/w10.jpeg" },
  { name: "Logo design", note: "A mark that works on a signboard, a card and a phone screen.", image: "/work/w11.jpeg" },
  { name: "Flyers & pamphlets", note: "Handouts and leaflets for your shop or event.", image: "/work/w09.jpeg" },
  { name: "YouTube thumbnails", note: "Thumbnails that get noticed in the feed.", image: "/work/w02.webp" },
  { name: "Stickers & labels", note: "Product stickers, bottle and tin labels, designed and printed.", image: "/work/w08.jpeg" },
];

export const process = [
  { step: "Brief", text: "Send what you need, or your CDR, PDF or JPG file." },
  { step: "Design", text: "We prepare the layout and colours." },
  { step: "Proof", text: "You see it first and ask for changes." },
  { step: "Print", text: "Printed only after you approve the proof." },
  { step: "Delivery", text: "Pick up from us or get it delivered." },
];

export const stats = [
  { value: 500, suffix: "+", label: "Designs delivered" },
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 200, suffix: "+", label: "Happy clients" },
  { value: 50, suffix: "+", label: "Repeat customers" },
];

export const testimonials = [
  {
    quote: "Got my wedding cards designed and printed in just two days. Everyone loved the design.",
    name: "Ravi Patel",
    role: "Wedding invitation",
  },
  {
    quote: "HG does all our posters and banners. Always on time, always affordable.",
    name: "Sneha Shah",
    role: "Regular client",
  },
  {
    quote: "The visiting card design was better than what I expected. Highly recommended.",
    name: "Amit Verma",
    role: "Business owner",
  },
];
