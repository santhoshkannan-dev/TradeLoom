export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Market Intelligence News</h1>
        <p className="text-xs text-gray-500 mt-1">Real-time news classification and sentiment indexing</p>
      </div>
      <div className="p-12 rounded-2xl bg-white/[0.01] border border-white/5 border-dashed text-center space-y-3">
        <p className="text-sm text-gray-400">Financial news headlines matching your stocks list will load here</p>
      </div>
    </div>
  );
}
