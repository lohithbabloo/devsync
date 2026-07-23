function Button({
  children,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-md bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-slate-700 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
