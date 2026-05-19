import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aadityapadiya.vercel.app";
  const routes = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/skills",
    "/contact",
    "/labs",
    "/ai",
    "/infrastructure",
    "/case-studies",
  ];

  const staticPages = routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectPages = getAllProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
