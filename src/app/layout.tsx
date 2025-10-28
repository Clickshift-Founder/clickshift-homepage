import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/Navbar";  // ← Fixed path for your structure
import Footer from "../components/Footer";  // ← Fixed path for your structure
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Intelligent AI Terminal for DeFi Traders",
  description:
    "ClickShift gets you onchain safely. AI-powered tools to prevent losses, boost profits, and trade with precision in DeFi.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "The Intelligent AI Terminal for DeFi Traders",
    description:
      "ClickShift gets you onchain safely. AI-powered tools to prevent losses, boost profits, and trade with precision in DeFi.",
    url: "https://clickshift.io",
    siteName: "ClickShift",
    images: [
      {
        url: "https://clickshift.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClickShift – DeFi Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Intelligent AI Terminal for DeFi Traders",
    description:
      "ClickShift gets you onchain safely. AI-powered tools to prevent losses, boost profits, and trade with precision in DeFi.",
    images: ["https://clickshift.io/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-75MZH565VW"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-75MZH565VW');
  `}
  </Script>

{/* Schema.org structured data */}
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ClickShift",
      "applicationCategory": "FinanceApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "525"
      }
    })
  }}
/>
</head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}