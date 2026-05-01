import fs from "fs";
import path from "path";

export interface Chapter {
  number: number;
  title: string;
  slug: string;
  part: string;
  partNumber: number;
  excerpt: string;
  stats: string[];
  takeaways: string[];
}

export interface ChapterMeta {
  number: number;
  title: string;
  slug: string;
  part: string;
  partNumber: number;
  stats: string[];
  takeaways: string[];
}

const chaptersDir = path.join(process.cwd(), "content", "chapters");

export function getAllChapters(): ChapterMeta[] {
  const indexPath = path.join(chaptersDir, "_index.json");
  return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
}

export function getChapter(slug: string): Chapter | null {
  const filePath = path.join(chaptersDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getChaptersByPart(): Record<string, ChapterMeta[]> {
  const chapters = getAllChapters();
  const grouped: Record<string, ChapterMeta[]> = {};
  for (const ch of chapters) {
    if (!grouped[ch.part]) grouped[ch.part] = [];
    grouped[ch.part].push(ch);
  }
  return grouped;
}

export function getRelatedChapters(slug: string, limit = 3): ChapterMeta[] {
  const chapters = getAllChapters();
  const current = chapters.find((c) => c.slug === slug);
  if (!current) return [];
  return chapters
    .filter((c) => c.part === current.part && c.slug !== slug)
    .slice(0, limit);
}
