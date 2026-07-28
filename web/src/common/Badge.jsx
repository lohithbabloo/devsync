const TONE_CLASSES = {
  neutral: "bg-slate-800 text-slate-300",
  success: "bg-emerald-500/10 text-emerald-400",
  danger: "bg-red-500/10 text-red-400",
  info: "bg-blue-500/10 text-blue-400",
};

function Badge({ children, tone = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASSES[tone] || TONE_CLASSES.neutral} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

export default Badge;
