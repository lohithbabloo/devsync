function Card({ children, as: Tag = "div", className = "", ...props }) {
  return (
    <Tag
      className={`rounded-lg border border-slate-800 bg-slate-900 ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default Card;
