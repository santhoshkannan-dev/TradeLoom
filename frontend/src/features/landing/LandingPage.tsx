import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Architecture from './components/Architecture';
import Screenshots from './components/Screenshots';
import AISection from './components/AISection';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#05040f] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Architecture />
        <Screenshots />
        <AISection />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
