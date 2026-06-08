function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-sm text-slate-400 sm:flex-row">
        <p className="font-semibold text-white">DevSync</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a className="transition hover:text-white" href="https://github.com">
            GitHub
          </a>
          <a className="transition hover:text-white" href="#privacy">
            Privacy
          </a>
          <a className="transition hover:text-white" href="mailto:contact@devsync.app">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
