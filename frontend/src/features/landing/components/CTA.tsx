import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-24 border-t border-white/10 bg-[#070714] relative overflow-hidden text-center">
      {/* Background ambient lighting and wave mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to See the<br />Full Picture?
        </h2>

        <p className="text-base text-gray-400 max-w-xl mx-auto font-normal leading-relaxed">
          Stop managing tabs. Start managing wealth with the same rigor as the world's leading family offices.
        </p>

        <div className="pt-4">
          <Link
            to="/register"
            className="inline-block px-10 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_35px_rgba(168,85,247,0.4)] border border-purple-400/40 transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            Enter the Loom
          </Link>
        </div>
      </div>
    </section>
  );
}
