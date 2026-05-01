import Link from "next/link";
import { ChapterMeta } from "@/lib/chapters";

export default function InsightCard({ chapter }: { chapter: ChapterMeta }) {
  return (
    <Link
      href={`/insights/${chapter.slug}`}
      className="glass rounded-xl p-6 hover:border-cyan-500/20 transition-all group block"
    >
      <div className="text-xs text-cyan-400 font-medium mb-2 uppercase tracking-wider">
        Part {chapter.partNumber} &middot; {chapter.part}
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-2">
        Chapter {chapter.number}: {chapter.title}
      </h3>
      {chapter.takeaways.length > 0 && (
        <p className="text-sm text-gray-400 line-clamp-2">
          {chapter.takeaways[0]}
        </p>
      )}
      {chapter.stats.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chapter.stats.slice(0, 2).map((stat, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400"
            >
              {stat.length > 50 ? stat.slice(0, 50) + "..." : stat}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
