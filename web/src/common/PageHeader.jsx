function PageHeader({ title, subtitle, toolbar, className = "" }) {
  return (
    <div
      className={`mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${className}`.trim()}
    >
      <div>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        ) : null}
      </div>
      {toolbar ? (
        <div className="flex shrink-0 items-center gap-2">{toolbar}</div>
      ) : null}
    </div>
  );
}

export default PageHeader;
