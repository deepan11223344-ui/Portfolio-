import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from './TextReveal';
import StringLine from './StringLine';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Space gradient overlay */}
      <div className="absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
      </div>

      {/* Decorative orbital rings */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-[0.06]"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rounded-full border border-[var(--color-accent)]" />
        </motion.div>

        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-[0.04]"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full rounded-full border border-[#a0b4ff]" style={{ transform: 'rotateX(60deg)' }} />
        </motion.div>

        {/* Geometric star pattern */}
        <motion.div
          className="absolute top-[20%] left-[15%] w-40 h-40 opacity-[0.08] hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 280 280" className="w-full h-full">
            <line x1="140" y1="0" x2="140" y2="280" stroke="var(--color-accent)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="239" y1="41" x2="41" y2="239" stroke="var(--color-accent)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="280" y1="140" x2="0" y2="140" stroke="var(--color-accent)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            <line x1="239" y1="239" x2="41" y2="41" stroke="var(--color-accent)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          </svg>
        </motion.div>

        {/* Floating cosmic particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + i * 1.5,
              height: 2 + i * 1.5,
              top: `${15 + i * 15}%`,
              left: `${10 + i * 18}%`,
              background: i % 2 === 0 ? 'var(--color-accent)' : '#a0b4ff',
              opacity: 0.3,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 w-full"
        style={{ opacity, scale, y: textY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-8 font-light flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse-glow" />
          Creative Developer, Designer & Cyber Security
        </motion.p>

        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-light leading-[0.95] tracking-tight text-[var(--color-text-primary)]">
            <TextReveal text="Deepan.A" delay={1} />
          </h1>
        </div>

        <div className="my-10 max-w-xl">
          <StringLine />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-xl font-light leading-relaxed"
        >
          I bridge the gap between innovative development and impenetrable security. As a Full Stack Developer and Cybersecurity Expert, I don’t just build high-performance web applications; I architect them with a security-first mindset to ensure your data stays as robust as your user experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-12 flex items-center gap-8"
        >
          <a
            href="#work"
            className="group relative inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-[var(--color-text-primary)] border border-[var(--color-accent)]/30 px-8 py-4 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-all duration-500 glass-card"
          >
            <span>View Work</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="text-sm tracking-[0.2em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors string-line pb-1"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-accent)]/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
