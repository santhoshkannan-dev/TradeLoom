import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Architecture from './components/Architecture';
import Screenshots from './components/Screenshots';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#070714] text-gray-300 selection:bg-purple-500 selection:text-white overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <Architecture />
      <Screenshots />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
