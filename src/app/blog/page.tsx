export const metadata = {
  title: "ClickShift Blog",
  description: "Insights, strategies, and updates from ClickShift.",
   alternates: { 
    canonical: "https://clickshift.io/about" },
  openGraph: {
    title: "ClickShift Blog",
    description: "Smarter, safer, simpler trading with AI intelligence.",
    images: ["/og-blog.png"],
  },
};

import BlogHomeContent from "./BlogHomeContent";

export default function BlogPage() {
  return <BlogHomeContent />;
}
