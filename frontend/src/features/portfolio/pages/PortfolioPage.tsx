export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Management</h1>
        <p className="text-xs text-gray-500 mt-1">Manage watchlists and normalized broker portfolios</p>
      </div>
      <div className="p-12 rounded-2xl bg-white/[0.01] border border-white/5 border-dashed text-center space-y-3">
        <p className="text-sm text-gray-400">Integrated broker adapters list will load here</p>
      </div>
    </div>
  );
}
