export function MiniChart({ values, height = 82 }: { values: number[]; height?: number }) {
  if (values.length < 2) return <div className="emptyChart" style={{ height }} />;
  const width = 420;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(1, max - min);
  const points = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - ((v - min) / spread) * (height - 8) - 4}`).join(" ");
  return (
    <svg className="miniChart" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".28"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
      <polygon points={`0,${height} ${points} ${width},${height}`} fill="url(#area)" />
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
