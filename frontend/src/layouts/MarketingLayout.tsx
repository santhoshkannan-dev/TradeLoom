import { Outlet } from 'react-router-dom';

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[#080710] text-[#9ca3af] font-sans selection:bg-purple-500 selection:text-black">
      <Outlet />
    </div>
  );
}
