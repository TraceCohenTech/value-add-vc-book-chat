import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
      <div className="max-w-4xl mx-auto text-center relative">
        <Image
          src="/book-cover.png"
          alt="The Value Add VC"
          width={160}
          height={213}
          className="rounded-xl shadow-2xl mx-auto mb-8 ring-1 ring-white/10"
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          The Value Add VC
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-3">
          A Practical Guide to Venture Capital in the AI Era
        </p>
        <p className="text-sm text-gray-400 mb-8">
          By Trace Cohen — 20 chapters on fundraising, fund economics, and the vertical AI revolution
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://value-add-vc-book.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-semibold rounded-xl bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
          >
            Download Free
          </a>
          <a
            href="https://www.amazon.com/dp/B0GS6Z4B6Q"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-semibold rounded-xl border border-white/10 text-gray-200 hover:bg-white/5 transition-colors"
          >
            Amazon Paperback
          </a>
        </div>
      </div>
    </section>
  );
}
