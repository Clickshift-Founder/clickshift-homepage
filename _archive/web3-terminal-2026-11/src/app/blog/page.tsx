export const metadata = {
  title: "ClickShift Blog",
  description: "Insights, strategies, stories and updates from ClickShift and guest users.",
   alternates: { 
    canonical: "https://clickshift.io/blog" },
  openGraph: {
    title: "ClickShift Blog",
    description: "Smarter, safer, simpler trading with AI intelligence.",
    images: ["/og-image.png"],
  },
};

import BlogHomeContent from "./BlogHomeContent";

export default function BlogPage() {
  return <BlogHomeContent />;
}
