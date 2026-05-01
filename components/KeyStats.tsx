const stats = [
  { value: "20", label: "Chapters" },
  { value: "140+", label: "Vertical AI startups tracked" },
  { value: "$120B+", label: "Combined AI valuations" },
  { value: "65+", label: "Investments made" },
];

export default function KeyStats() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-6 text-center hover:border-cyan-500/20 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
