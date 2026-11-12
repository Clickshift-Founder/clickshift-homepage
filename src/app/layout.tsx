import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "ClickShift: the solutions factory, built for 2045",
    template: "%s · ClickShift",
  },
  description: SITE.description,
  keywords: [
    "automation as a service",
    "AI automation agency Nigeria",
    "HubSpot automation",
    "Airtable CRM template",
    "Make.com expert",
    "programme technology partner",
    "M&E dashboard",
    "AI agents",
    "products that survive 2045",
  ],
  authors: [{ name: SITE.founder.name, url: SITE.founder.linkedin }],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "ClickShift: we build what still works in 2045",
    description: SITE.description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickShift: we build what still works in 2045",
    description: SITE.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0B0C10",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/icon.svg`,
  slogan: SITE.promise,
  description: SITE.description,
  founder: { "@type": "Person", name: SITE.founder.name, sameAs: [SITE.founder.linkedin] },
  sameAs: [SITE.socials.linkedin, SITE.socials.x],
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
  email: SITE.email,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${space.variable} ${inter.variable} ${mono.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-75MZH565VW" strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-75MZH565VW');`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
