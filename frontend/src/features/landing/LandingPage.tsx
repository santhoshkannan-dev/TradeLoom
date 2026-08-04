import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Architecture from './components/Architecture';
import Screenshots from './components/Screenshots';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#080710] overflow-x-hidden selection:bg-purple-500 selection:text-black">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      
      <Navbar />
      <Hero />
      <Features />
      <Architecture />
      <Screenshots />
      <Pricing />
      <Footer />
    </div>
  );
}
