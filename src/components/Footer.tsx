import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-16 border-t border-[var(--color-border)]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="w-6 h-6 rounded-full border border-[var(--color-accent)]/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/60" />
            </div>
            <span className="text-sm tracking-[0.2em] uppercase text-[var(--color-text-muted)]"> Deepan.A </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--color-text-muted)] text-xs tracking-[0.15em] text-center"
          >
            Designed & Developed with Passion
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--color-text-muted)] text-xs tracking-[0.15em]"
          >
            © 2026 All Rights Reserved
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.02, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center select-none"
        >
          <span className="text-[8vw] font-light tracking-tighter text-[var(--color-text-primary)]">
            Deepan.A
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
