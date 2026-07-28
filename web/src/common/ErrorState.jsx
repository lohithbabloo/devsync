import Button from "./Button";

function ErrorIcon() {
  return (
    <svg
      className="h-6 w-6 text-red-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0Z"
      />
    </svg>
  );
}

function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this data. Please try again.",
  onRetry,
  className = "",
}) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center rounded-lg border border-red-900/40 bg-red-950/20 px-6 py-12 text-center ${className}`.trim()}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-900">
        <ErrorIcon />
      </div>
      <p className="text-sm font-medium text-slate-200">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      {onRetry ? (
        <div className="mt-4">
          <Button variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default ErrorState;
