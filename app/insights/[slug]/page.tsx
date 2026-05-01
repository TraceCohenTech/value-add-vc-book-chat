import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllChapters, getChapter, getRelatedChapters } from "@/lib/chapters";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
  return getAllChapters().map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const chapter = getChapter(params.slug);
  if (!chapter) return {};

  const title = `Chapter ${chapter.number}: ${chapter.title} | The Value Add VC`;
  const description = chapter.excerpt.slice(0, 155).replace(/\n/g, " ") + "...";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ["/book-cover.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Trace_Cohen",
    },
  };
}

export default function ChapterInsightPage({
  params,
}: {
  params: { slug: string };
}) {
  const chapter = getChapter(params.slug);
  if (!chapter) notFound();

  const related = getRelatedChapters(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Chapter ${chapter.number}: ${chapter.title}`,
    author: {
      "@type": "Person",
      name: "Trace Cohen",
      url: "https://x.com/Trace_Cohen",
    },
    publisher: {
      "@type": "Organization",
      name: "The Value Add VC",
    },
    description: chapter.excerpt.slice(0, 155).replace(/\n/g, " "),
    isPartOf: {
      "@type": "Book",
      name: "The Value Add VC: Cheering From the Sidelines",
      author: { "@type": "Person", name: "Trace Cohen" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Link
          href="/insights"
          className="text-sm text-gray-500 hover:text-cyan-400 transition-colors mb-6 inline-block"
        >
          &larr; All Insights
        </Link>

        <div className="mb-2">
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">
            Part {chapter.partNumber} &middot; {chapter.part}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Chapter {chapter.number}: {chapter.title}
        </h1>

        {/* Excerpt */}
        <div className="insight-prose mb-10">
          {chapter.excerpt.split("\n\n").map((p, i) => (
            <p key={i} className="text-gray-300 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>

        {/* Stats */}
        {chapter.stats.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Key Data Points</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {chapter.stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-4 text-sm text-gray-300"
                >
                  {stat}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Takeaways */}
        {chapter.takeaways.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {chapter.takeaways.map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-cyan-400 mt-0.5 shrink-0">&#10003;</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="glass rounded-2xl p-8 text-center mb-10">
          <h3 className="text-lg font-semibold mb-2">
            Read the full chapter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            This is just a preview. Get the complete book with all frameworks, data, and playbooks.
          </p>
          <a
            href="https://value-add-vc-book.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 text-sm font-semibold rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
          >
            Download Free
          </a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">
              More from {chapter.part}
            </h2>
            <div className="grid gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/insights/${r.slug}`}
                  className="glass rounded-xl p-4 hover:border-cyan-500/20 transition-all group block"
                >
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    Chapter {r.number}: {r.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
