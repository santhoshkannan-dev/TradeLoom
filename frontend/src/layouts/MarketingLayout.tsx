import { Outlet } from 'react-router-dom';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';

export default function MarketingLayout() {
  return (
    <AnimatedBackground>
      <Outlet />
    </AnimatedBackground>
  );
}
