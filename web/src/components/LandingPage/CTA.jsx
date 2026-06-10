function CTA({ onGetStarted }) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300/12 via-white/[0.045] to-fuchsia-400/12 px-6 py-14 text-center shadow-2xl shadow-cyan-950/20 backdrop-blur">
        <h2 className="text-3xl font-semibold text-white sm:text-5xl">
          Ready to Understand Your Development Journey?
        </h2>
        <button
          type="button"
          onClick={onGetStarted}
          className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

export default CTA;
