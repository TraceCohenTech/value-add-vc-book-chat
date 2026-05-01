import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <Link href="/insights" className="hover:text-cyan-400 transition-colors">
            Insights
          </Link>
          <a
            href="https://value-add-vc-book.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            Download Book
          </a>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <a
            href="https://x.com/Trace_Cohen"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            Twitter
          </a>
          <span>|</span>
          <a
            href="mailto:t@nyvp.com"
            className="hover:text-cyan-400 transition-colors"
          >
            t@nyvp.com
          </a>
          <span>|</span>
          <a
            href="https://valueaddvc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            valueaddvc.com
          </a>
        </div>
      </div>
    </footer>
  );
}
