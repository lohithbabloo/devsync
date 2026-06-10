function Navbar({ onGetStarted }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_28px_rgba(34,211,238,0.18)]">
            <span className="h-3.5 w-3.5 rounded-sm bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
          </span>
          <span className="text-lg font-semibold text-white">DevSync</span>
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden items-center gap-5 text-sm font-medium text-slate-300 sm:flex">
            <a className="transition hover:text-white" href="#features">
              Features
            </a>
            <a className="transition hover:text-white" href="#about">
              About
            </a>
          </div>

          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
