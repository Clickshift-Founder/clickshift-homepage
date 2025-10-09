  export const metadata = {
      title: "Our Products | ClickShift",
      description: "Professional-grade AI tools that transform crypto trading from guesswork to intelligence. Built for traders who demand precision, speed, and consistent profits.",
       alternates: { 
    canonical: "https://clickshift.io/about" },
      openGraph: {
        title: "Crypto Tools that gives you a competitive advantage | ClickShift",
        description: "Professional-grade AI tools that transform crypto trading from guesswork to intelligence. Built for traders who demand precision, speed, and consistent profits.",
        images: ["/og-image.png"],
      }
    }

    import ProductsContent from "./ProductsContent";
    export default function ProductsPage() {
      return <ProductsContent />;
    }


