import { MetadataRoute } from "next";
import { INITIAL_VILLAS } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nusavilla21.netlify.app";

  const villaRoutes = INITIAL_VILLAS.map((villa) => ({
    url: `${baseUrl}/villa/${villa.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...villaRoutes,
  ];
}
