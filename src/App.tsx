import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Principles from './components/Principles';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';
import SpaceBackground from './components/SpaceBackground';
import Moon from './components/Moon';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [isMoon, setIsMoon] = useState(true);

  return (
    <div className={`relative min-h-screen theme-transition ${isMoon ? 'space-bg' : 'sun-bg'}`}>
      {/* Canvas starfield with twinkling stars + shooting stars */}
      <SpaceBackground isMoon={isMoon} />

      {/* Nebula layer */}
      <motion.div
        animate={{ opacity: isMoon ? 0.15 : 0.05 }}
        className="nebula-layer animate-cosmic-drift"
        style={{
          backgroundImage: 'url(images/nebula.png)',
          filter: isMoon ? 'none' : 'hue-rotate(300deg) saturate(1.5)'
        }}
      />

      {/* Moon/Sun with parallax and glow */}
      <Moon isMoon={isMoon} onToggle={() => setIsMoon(!isMoon)} />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <CursorFollower />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] z-[100] origin-left"
        style={{
          scaleX,
          background: isMoon
            ? 'linear-gradient(90deg, #a0b4ff, var(--color-accent), var(--color-text-primary))'
            : 'linear-gradient(90deg, #ff8c00, #ffdf00, #ffffff)',
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-[5]">
        <About />
        <Hero />

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative py-20 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center gap-6">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[var(--color-border)]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--color-text-muted)] whitespace-nowrap flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
              Selected Works
              <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
            </span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[var(--color-border)]" />
          </div>
        </motion.div>

        <Projects />

        {/* Marquee-style divider */}
        <div className="relative py-16 overflow-hidden border-t border-b border-[var(--color-border)]/30">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12">
                <span className="text-6xl md:text-8xl font-light tracking-tighter text-[#0e0e18]">
                  Elegance
                </span>
                <span className="w-3 h-3 rounded-full border border-[var(--color-border)]" />
                <span className="text-6xl md:text-8xl font-serif italic tracking-tighter text-[#0e0e18]">
                  Cosmos
                </span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]/10" />
              </span>
            ))}
          </motion.div>
        </div>

        <Showcase />
        <Principles />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
