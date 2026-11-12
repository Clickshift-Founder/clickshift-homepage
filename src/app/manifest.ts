import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ClickShift",
    short_name: "ClickShift",
    description: "The solutions factory. We build what still works in 2045.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0C10",
    theme_color: "#0B0C10",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
