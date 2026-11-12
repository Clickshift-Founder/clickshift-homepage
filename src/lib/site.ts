// One place for the ClickShift identity. Change a value here and every page follows.

export const SITE = {
  name: "ClickShift",
  url: "https://clickshift.io",
  tagline: "The solutions factory.",
  promise: "We build what still works in 2045.",
  description:
    "ClickShift is a solutions factory. We design, build and run software, AI agents and automations for programmes, schools, companies and product teams, each one built to stay useful well beyond 2045.",
  // TODO(founder): confirm this inbox exists before launch.
  email: "hello@clickshift.io",
  location: "Abuja, Nigeria · working worldwide",
  // Set to a Calendly / Cal.com link to show "Book a call" buttons. null hides them.
  bookingUrl: null as string | null,
  founder: {
    name: "Emmanuel Ohanwe",
    role: "Founder and lead engineer",
    linkedin: "https://www.linkedin.com/in/emmanuelohanwe",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/clickshifthq/",
    x: "https://x.com/ClickShifthq",
  },
} as const;

// Brand colours. Mirrored as CSS tokens in src/app/globals.css: keep both in step.
export const BRAND = {
  ink: "#0B0C10",
  ink2: "#15171D",
  paper: "#F3F0E8",
  paper2: "#E9E4D8",
  signal: "#D4FF3A", // lime: fills on dark, never as text on paper
  signalDeep: "#4E6B00", // the lime family on light surfaces (flyers, documents): text and icons
  cobalt: "#2E44FF", // links and buttons on paper
  stone: "#8C9099",
} as const;

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/automation", label: "Automation" },
  { href: "/templates", label: "Templates" },
  { href: "/pricing", label: "Pricing" },
  { href: "/standard", label: "The 2045 Standard" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
] as const;

// Seconds-precise target for the countdown on the home page.
export const TARGET_2045 = Date.UTC(2045, 0, 1, 0, 0, 0);
