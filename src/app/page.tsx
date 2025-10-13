export const metadata = {
  title: "ClickShift | Predictive Trading Intelligence",
  description: "Start, rebuild, or build – ClickShift helps you win in Web3.",
  metadataBase: new URL("https://clickshift.io"),
  alternates: {
    canonical: "https://clickshift.io",
  },
  openGraph: {
    type: "website",
    url: "https://clickshift.io",
    title: "ClickShift | Predictive Trading Intelligence",
    description: "Start, rebuild, or build – ClickShift helps you win in Web3.",
    siteName: "ClickShift",
    images: [
      {
        url: "https://clickshift.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClickShift Predictive Trading Intelligence Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickShift | Predictive Trading Intelligence",
    description: "Start, rebuild, or build – ClickShift helps you win in Web3.",
    images: ["https://clickshift.io/og-image.png"],
  },
};
import PhomeClient from "./PhomeClient";
export default function HomePage() {
  return <PhomeClient />;
}
