import { MetadataRoute } from "next";
import { getAllChapters } from "@/lib/chapters";

const BASE_URL = "https://value-add-vc-book-chat.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = getAllChapters();

  const insightPages = chapters.map((ch) => ({
    url: `${BASE_URL}/insights/${ch.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...insightPages,
  ];
}
