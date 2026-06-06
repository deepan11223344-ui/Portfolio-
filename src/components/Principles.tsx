import { motion } from 'framer-motion';
import StringLine from './StringLine';

const principles = [
  {
    number: '01',
    title: 'Modular Architecture',
    subtitle: 'Craft only what you need.',
    description: 'Every piece stands alone — or flows as one. Build small, scale sharp.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="0.5">
        <rect x="2" y="2" width="16" height="16" />
        <rect x="22" y="2" width="16" height="16" />
        <rect x="2" y="22" width="16" height="16" />
        <rect x="22" y="22" width="16" height="16" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Purposeful Motion',
    subtitle: 'Every orbit has meaning.',
    description: 'Every animation serves the experience. From calm ripples to sharp strikes — controlled and intentional.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M5 20 Q 12 5 20 20 Q 28 35 35 20" />
        <circle cx="5" cy="20" r="2" />
        <circle cx="35" cy="20" r="2" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Effortless Integration',
    subtitle: 'No ceremony. No bloat.',
    description: 'Clean code that breathes. Import, configure — done. Complexity hidden, simplicity exposed.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="20" cy="20" r="15" />
        <circle cx="20" cy="20" r="8" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Performance First',
    subtitle: 'Fast as light through vacuum.',
    description: 'Engineered for speed. Low memory, zero layout shifts, native-friendly. Every millisecond counts.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="0.5">
        <polygon points="20,2 38,15 32,38 8,38 2,15" />
        <line x1="20" y1="2" x2="20" y2="38" />
        <line x1="2" y1="15" x2="38" y2="15" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Wide Range of Effects',
    subtitle: 'From nebulae to supernovae.',
    description: 'Control motion, depth, and presence across scroll, hover, visibility, and beyond.',
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M5 20 L15 10 L25 30 L35 20" />
        <path d="M5 25 L15 15 L25 35 L35 25" opacity="0.4" />
        <path d="M5 15 L15 5 L25 25 L35 15" opacity="0.4" />
      </svg>
    ),
  },
];

export default function Principles() {
  return (
    <section id="principles" className="relative py-32 md:py-48 section-glow">
      {/* Background nebula hint */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.05] bg-[var(--color-accent)] blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-light flex items-center justify-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 text-[var(--color-text-primary)]"
          >
            Code With{' '}
            <span className="font-serif italic gradient-text-space">Clarity</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[var(--color-text-secondary)] font-light text-lg max-w-2xl mx-auto"
          >
            Built to tune your animations, not fight your DOM.
            Minimal, expressive, and performance-first.
          </motion.p>
        </div>

        <div className="mb-8">
          <StringLine color="var(--color-border)" />
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card p-8 md:p-10 relative overflow-hidden"
            >
              {/* Top glow line on hover */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)]/0 to-transparent group-hover:via-[var(--color-accent)]/30 transition-all duration-700" />

              <div className="flex items-start justify-between mb-8">
                <div className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors duration-500">
                  {principle.icon}
                </div>
                <span className="text-[10px] tracking-[0.3em] text-[var(--color-border-light)] group-hover:text-[var(--color-text-muted)] transition-colors font-mono">
                  ({principle.number})
                </span>
              </div>

              <h3 className="text-xl font-light tracking-tight mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-500 text-[var(--color-text-primary)]">
                {principle.title}
              </h3>

              <p className="text-sm text-[var(--color-accent)]/60 mb-4 font-light">
                {principle.subtitle}
              </p>

              <p className="text-sm text-[var(--color-text-muted)] font-light leading-relaxed group-hover:text-[var(--color-text-secondary)] transition-colors duration-500">
                {principle.description}
              </p>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-8 md:p-10 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-accent)]/20 flex items-center justify-center mb-6 relative">
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent)]/60 animate-pulse-glow" />
              <div className="absolute inset-0 rounded-full border border-[var(--color-accent)]/5 animate-ping" style={{ animationDuration: '3s' }} />
            </div>
            <p className="text-sm tracking-[0.15em] uppercase text-[var(--color-text-secondary)] mb-2">
              Ready to launch?
            </p>
            <a
              href="#contact"
              className="text-[var(--color-accent)] text-sm tracking-[0.2em] uppercase string-line pb-1 hover:text-[var(--color-accent-light)] transition-colors"
            >
              Let's Talk →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
