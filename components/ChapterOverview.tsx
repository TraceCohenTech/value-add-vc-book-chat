import Link from "next/link";
import { getChaptersByPart } from "@/lib/chapters";

export default function ChapterOverview() {
  const grouped = getChaptersByPart();

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          What&apos;s Inside
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(grouped).slice(0, 6).map(([part, chapters]) => (
            <div key={part} className="glass rounded-xl p-5">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">
                {part}
              </h3>
              <ul className="space-y-2">
                {chapters.map((ch) => (
                  <li key={ch.slug}>
                    <Link
                      href={`/insights/${ch.slug}`}
                      className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="text-gray-600 text-xs w-5">
                        {ch.number}.
                      </span>
                      {ch.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/insights"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all 20 chapters &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
