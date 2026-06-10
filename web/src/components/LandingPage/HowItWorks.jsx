const steps = [
  {
    label: "Step 1",
    title: "Connect GitHub",
    description: "Authorize DevSync through Authify and securely sync your GitHub profile.",
  },
  {
    label: "Step 2",
    title: "Analyze Activity",
    description: "DevSync maps repositories, commits, cadence, and trends into one clean view.",
  },
  {
    label: "Step 3",
    title: "Gain Insights",
    description: "Spot momentum, consistency, and growth patterns across your development journey.",
  },
];

function SectionHeader({ eyebrow, title }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="about" className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How it works"
          title="From OAuth to insight in three focused steps"
        />

        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-cyan-300/20 via-fuchsia-300/30 to-emerald-300/20 lg:block" />
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-xl border border-white/10 bg-slate-950/70 p-6 text-left shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-cyan-300/30"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
                {index + 1}
              </div>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                {step.label}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
