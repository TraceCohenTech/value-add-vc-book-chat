import { Metadata } from "next";
import { getAllChapters } from "@/lib/chapters";
import InsightCard from "@/components/InsightCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "VC & AI Insights from The Value Add VC | All 20 Chapters",
  description:
    "Explore 20 chapters of actionable venture capital insights — from fund economics and vertical AI to IPO pipelines and founder assessment frameworks.",
  openGraph: {
    title: "VC & AI Insights from The Value Add VC",
    description:
      "20 chapters of actionable VC insights by Trace Cohen.",
    images: ["/book-cover.png"],
  },
};

export default function InsightsPage() {
  const chapters = getAllChapters();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Insights
          </h1>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Key takeaways from each chapter of The Value Add VC — covering fundraising, fund economics, vertical AI, and more.
          </p>
        </div>
        <div className="grid gap-4">
          {chapters.map((chapter) => (
            <InsightCard key={chapter.slug} chapter={chapter} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
