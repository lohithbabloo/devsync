function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-800 ${className}`.trim()}
      aria-hidden="true"
    />
  );
}

function SkeletonList({ rows = 4, rowClassName = "h-16" }) {
  return (
    <ul className="space-y-3" aria-hidden="true">
      {Array.from({ length: rows }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index}>
          <Skeleton className={`w-full ${rowClassName}`} />
        </li>
      ))}
    </ul>
  );
}

export { SkeletonList };
export default Skeleton;
