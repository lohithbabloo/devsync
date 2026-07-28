const VARIANT_CLASSES = {
  primary: "bg-white text-slate-950 hover:bg-slate-200",
  secondary: "bg-slate-800 text-white hover:bg-slate-700",
  ghost: "bg-transparent text-slate-200 hover:bg-slate-800",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

function Spinner({ className = "" }) {
  return (
    <svg
      className={`h-4 w-4 animate-spin ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
      />
    </svg>
  );
}

function Button({
  children,
  onClick,
  type = "button",
  variant = "secondary",
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.secondary} ${className}`.trim()}
      {...props}
    >
      {isLoading ? <Spinner /> : null}
      {children}
    </button>
  );
}

export { Spinner };
export default Button;
