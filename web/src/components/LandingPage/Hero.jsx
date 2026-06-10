function Hero({ onGetStarted }) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.24),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.22),transparent_30%),linear-gradient(180deg,#020617_0%,#0f172a_52%,#020617_100%)]" />
      <div className="absolute left-1/2 top-10 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 shadow-2xl shadow-black/20 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Unified GitHub intelligence for growing developers
          </div>

          <h1 className="mt-8 text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            Track Your GitHub Journey. Understand Your Growth.
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-xl">
            DevSync transforms GitHub activity into meaningful insights. Analyze repositories,
            commits, coding habits, and development trends through a unified dashboard.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              type="button"
              onClick={onGetStarted}
              className="rounded-lg bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl">
            <div className="rounded-xl border border-white/10 bg-slate-950/80 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">DevSync Activity</p>
                  <p className="text-xl font-semibold text-white">Growth Overview</p>
                </div>
                <div className="rounded-lg bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                  +24%
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {["Repos", "Commits", "Streak"].map((item, index) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-500">{item}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {[18, 642, 31][index]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-40 rounded-lg border border-white/10 bg-slate-900/80 p-4">
                <div className="flex h-full items-end gap-2">
                  {[34, 52, 42, 70, 58, 82, 76, 92, 80, 96].map((height, index) => (
                    <div
                      key={height + index}
                      className="flex-1 rounded-t bg-gradient-to-t from-cyan-500 to-fuchsia-400 opacity-90"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Repository engagement trending upward",
                  "Commit cadence remains consistent",
                  "Peak focus window detected",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
