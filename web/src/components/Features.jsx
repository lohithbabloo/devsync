const features = [
  {
    title: "Repository Insights",
    description: "Track repository growth, activity, and engagement.",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    title: "Commit Analytics",
    description: "Visualize commit frequency and coding consistency.",
    accent: "from-fuchsia-400 to-violet-500",
  },
  {
    title: "Developer Growth",
    description: "Understand coding habits and long-term development trends.",
    accent: "from-emerald-300 to-teal-500",
  },
];

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Features"
          title="Everything you need to read your developer signal"
          description="DevSync turns raw GitHub activity into clean, actionable context for your repositories, consistency, and growth."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-xl border border-white/10 bg-white/[0.035] p-6 text-left shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${feature.accent}`} />
              <h3 className="mt-8 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{feature.description}</p>
              <div className="mt-8 h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent transition group-hover:from-cyan-300/60" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
