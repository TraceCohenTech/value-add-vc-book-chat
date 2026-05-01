import Hero from "@/components/Hero";
import KeyStats from "@/components/KeyStats";
import ChapterOverview from "@/components/ChapterOverview";
import ChatSection from "@/components/ChatSection";
import CTASection from "@/components/CTASection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <KeyStats />
        <ChapterOverview />
        <ChatSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
