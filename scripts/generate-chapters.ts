import * as fs from "fs";
import * as path from "path";

interface Chapter {
  number: number;
  title: string;
  slug: string;
  part: string;
  partNumber: number;
  excerpt: string;
  stats: string[];
  takeaways: string[];
}

const content = fs.readFileSync(
  path.join(process.cwd(), "content.md"),
  "utf-8"
);

const lines = content.split("\n");

// Find all parts and chapters
const parts: { line: number; title: string; number: number }[] = [];
const chapters: { line: number; title: string; number: number }[] = [];

lines.forEach((line, i) => {
  const partMatch = line.match(/^# PART ([IVXL]+): (.+)$/);
  if (partMatch) {
    const romanToNum: Record<string, number> = {
      I: 1, II: 2, III: 3, IV: 4, V: 5,
      VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11,
    };
    parts.push({
      line: i,
      title: partMatch[2],
      number: romanToNum[partMatch[1]] || 0,
    });
  }
  const chapterMatch = line.match(/^## Chapter (\d+): (.+)$/);
  if (chapterMatch) {
    chapters.push({
      line: i,
      title: chapterMatch[2],
      number: parseInt(chapterMatch[1]),
    });
  }
});

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractStats(text: string): string[] {
  const stats: string[] = [];
  const patterns = [
    /(\$[\d,.]+\s*(?:billion|million|trillion))/gi,
    /(\d+(?:\.\d+)?(?:\s*(?:percent|%)|\s*x\b))/gi,
    /((?:over|more than|roughly|approximately)\s+\d[\d,]*\s+\w+)/gi,
  ];

  const sentences = text.split(/\.\s+/);
  for (const sentence of sentences) {
    for (const pattern of patterns) {
      pattern.lastIndex = 0;
      if (pattern.test(sentence) && sentence.length < 200) {
        const clean = sentence.trim().replace(/\n/g, " ");
        if (clean.length > 20 && !stats.includes(clean)) {
          stats.push(clean);
          if (stats.length >= 4) return stats;
        }
        break;
      }
    }
  }
  return stats;
}

function extractTakeaways(text: string): string[] {
  const takeaways: string[] = [];
  const sentences = text.split(/\.\s+/);

  // Look for action-oriented sentences
  const actionPatterns = [
    /^(founders|investors|LPs|GPs|enterprises|the key|the action|focus on|consider|don't|do not|always|never|remember)/i,
    /should/i,
    /must/i,
    /the (?:biggest|most important|critical|essential)/i,
  ];

  for (const sentence of sentences) {
    const trimmed = sentence.trim().replace(/\n/g, " ");
    if (trimmed.length < 30 || trimmed.length > 180) continue;
    for (const pattern of actionPatterns) {
      if (pattern.test(trimmed)) {
        takeaways.push(trimmed + ".");
        break;
      }
    }
    if (takeaways.length >= 5) break;
  }

  return takeaways.length >= 3
    ? takeaways
    : sentences
        .filter((s) => s.trim().length > 40 && s.trim().length < 160)
        .slice(-5)
        .map((s) => s.trim() + ".");
}

const output: Chapter[] = [];

for (let i = 0; i < chapters.length; i++) {
  const chapter = chapters[i];
  const nextChapterLine = chapters[i + 1]?.line ?? lines.length;

  // Find which part this chapter belongs to
  let currentPart = parts[0];
  for (const part of parts) {
    if (part.line < chapter.line) currentPart = part;
    else break;
  }

  // Extract chapter text (skip first 2 lines which are the heading + blank)
  const chapterLines = lines.slice(chapter.line + 1, nextChapterLine);
  const fullText = chapterLines.join("\n").trim();

  // Get first 2-3 paragraphs as excerpt
  const paragraphs = fullText.split(/\n\n+/).filter((p) => p.trim().length > 0);
  const excerpt = paragraphs.slice(0, 3).join("\n\n");

  const stats = extractStats(fullText);
  const takeaways = extractTakeaways(fullText);

  output.push({
    number: chapter.number,
    title: chapter.title,
    slug: slugify(chapter.title),
    part: currentPart.title,
    partNumber: currentPart.number,
    excerpt,
    stats,
    takeaways,
  });
}

// Write individual chapter files
const outDir = path.join(process.cwd(), "content", "chapters");
fs.mkdirSync(outDir, { recursive: true });

for (const chapter of output) {
  fs.writeFileSync(
    path.join(outDir, `${chapter.slug}.json`),
    JSON.stringify(chapter, null, 2)
  );
}

// Write index file
fs.writeFileSync(
  path.join(outDir, "_index.json"),
  JSON.stringify(
    output.map(({ excerpt, ...rest }) => rest),
    null,
    2
  )
);

console.log(`Generated ${output.length} chapter files in content/chapters/`);
