export default function CTASection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto text-center glass rounded-2xl p-10">
        <h2 className="text-2xl font-bold mb-3">
          Ready to go deeper?
        </h2>
        <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
          Get the complete guide — 20 chapters of actionable frameworks, data, and playbooks for founders, investors, and operators navigating the AI era.
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
            href="https://buy.stripe.com/5kQ28k1g9b9Sf1M2gZ6g800"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-semibold rounded-xl border border-white/10 text-gray-200 hover:bg-white/5 transition-colors"
          >
            Support the Author ($9.99)
          </a>
        </div>
      </div>
    </section>
  );
}
