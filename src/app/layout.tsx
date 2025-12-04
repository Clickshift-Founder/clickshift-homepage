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
  title: "The Intelligent AI Terminal for DeFi Agents and Traders",
  description:
    "Empowering Autonomous Agents and traders On-chain to profit in DeFi.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "The Intelligent AI Terminal for DeFi Autonomous Agents and Traders Onchain",
    description:
      "ClickShift is the Bloomberg Terminal for DeFi with a Chip Technology that enables agents go into the market and bring back profit. Humans access same intelligence on our interface.",
    url: "https://clickshift.io",
    siteName: "ClickShift",
    images: [
      {
        url: "https://clickshift.io/og-whatsapp.png",
        width: 512,
        height: 512,
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
 <Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-75MZH565VW', {
      page_path: window.location.pathname,
      // Force a new session
      session_id: Date.now().toString(),
    });
  `}
</Script>


  {/* Schema.org structured data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "ClickShift",
        applicationCategory: "FinanceApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "525" },
      }),
    }}
  />

  {/* OG fallbacks for WhatsApp */}
  <meta property="og:image" content="https://clickshift.io/og-image.png" />
  <meta property="og:image" content="https://clickshift.io/og-whatsapp.png" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:image:alt" content="ClickShift Logo" />
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