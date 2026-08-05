import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../../../components/ui/Container';
import { Button } from '../../../components/ui/Button';
import { fadeUp } from '../../../lib/animations';

export default function CTA() {
  return (
    <section className="py-24 border-t border-white/10 relative overflow-hidden text-center">
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ready to See the<br />Full Picture?
          </h2>

          <p className="text-base text-gray-400 max-w-xl mx-auto font-normal leading-relaxed">
            Stop managing tabs. Start managing wealth with the same rigor as the world's leading family offices.
          </p>

          <div className="pt-4">
            <Link to="/register">
              <Button size="lg" className="px-10 py-4 font-bold text-sm">
                Enter the Loom
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
