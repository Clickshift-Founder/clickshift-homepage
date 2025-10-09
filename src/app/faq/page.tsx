export const metadata = {
  title: "Frequently Asked Questions | ClickShift",
  description: "Everything you need to know about ClickShift's intelligent trading platform. Can't find what you're looking for? Contact our support team.",
   alternates: { 
    canonical: "https://clickshift.io/about" },
  openGraph: {
    title: "The A to Z of ClickShift and how to take advantage| ClickShift",
    description: "Everything you need to know about ClickShift's intelligent trading platform. Can't find what you're looking for? Contact our support team.",
    images: ["/og-image.png"],
  }
}

import FAQContent from "./FAQContent";

export default function FAQPage() {
  return <FAQContent />;
}


