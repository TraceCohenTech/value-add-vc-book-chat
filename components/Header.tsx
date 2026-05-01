import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/book-cover.png"
            alt="The Value Add VC"
            width={36}
            height={48}
            className="rounded shadow-lg"
          />
          <div>
            <h1 className="text-sm font-bold leading-tight group-hover:text-cyan-400 transition-colors">
              The Value Add VC
            </h1>
            <p className="text-xs text-gray-400">
              By Trace Cohen
            </p>
          </div>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/insights"
            className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Insights
          </Link>
          <a
            href="https://value-add-vc-book.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
          >
            Download Free
          </a>
        </nav>
      </div>
    </header>
  );
}
