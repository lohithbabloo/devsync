function DefaultIcon() {
  return (
    <svg
      className="h-6 w-6 text-slate-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 13h6m-6 4h6M9 5h6m-9-2h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

function EmptyState({ icon, title, description, action, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-800 px-6 py-12 text-center ${className}`.trim()}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
        {icon || <DefaultIcon />}
      </div>
      <p className="text-sm font-medium text-slate-200">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export default EmptyState;
