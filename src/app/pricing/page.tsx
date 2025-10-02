export const metadata = {
  title: "Pricing & Plans | ClickShift",
  description: "Choose the perfect plan for your trading needs. Free Explorer tier, Professional at $79/month, or Elite at $199/month.",
  openGraph: {
    title: "ClickShift Pricing - DeFi Trading Intelligence",
    description: "Professional-grade trading tools starting free. Upgrade for unlimited analysis and advanced features.",
    images: ["/og-image.png"],
  }
}

import PricingContent from "./PricingContent"; 
export default function PricingPage() {
  return <PricingContent />;
}



