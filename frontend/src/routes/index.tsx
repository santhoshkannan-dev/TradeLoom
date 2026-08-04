import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MarketingLayout from '../layouts/MarketingLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LandingPage from '../features/landing/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';
import PortfolioPage from '../features/portfolio/pages/PortfolioPage';
import AnalyticsPage from '../features/analytics/pages/AnalyticsPage';
import NewsPage from '../features/news/pages/NewsPage';
import AdvisorPage from '../features/ai/pages/AdvisorPage';

export default function AppRouter() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Marketing / Public routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Dashboard / Protected routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/advisor" element={<AdvisorPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
