import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://www.mehedi-hasan.me";

const STATIC_ROUTES = ["/", "/about", "/blog", "/dashboard", "/links", "/portfolyio"];

type ProjectItem = {
  slug?: unknown;
};

const getProjectSlugs = (): string[] => {
  const filePath = path.join(process.cwd(), "public", "data", "projects.json");

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as ProjectItem[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((project) => (typeof project.slug === "string" ? project.slug : ""))
      .filter(Boolean);
  } catch {
    return [];
  }
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();
  const projectSlugs = getProjectSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const postDate = new Date(post.meta.date);

    return {
      url: `${SITE_URL}/blog/${post.meta.slug}`,
      lastModified: Number.isNaN(postDate.getTime()) ? now : postDate,
      changeFrequency: "monthly",
      priority: 0.7,
    };
  });

  const projectEntries: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...projectEntries];
}
