import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface MoonProps {
  isMoon: boolean;
  onToggle: () => void;
}

export default function Moon({ isMoon, onToggle }: MoonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const moonScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const moonOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0.5]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8]);

  // Smooth cursor follow
  const cursorX = useMotionValue(typeof window !== "undefined" ? window.innerWidth * 0.8 : 0);
  const cursorY = useMotionValue(typeof window !== "undefined" ? window.innerHeight * 0.1 : 0);
  
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      // 3D effect offset
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
      // Cursor follow position
      cursorX.set(e.clientX - 112); // Center offset
      cursorY.set(e.clientY - 112);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      ref={ref}
      className="fixed z-0 cursor-pointer"
      style={{
        left: smoothX,
        top: smoothY,
        scale: moonScale,
        opacity: moonOpacity,
      }}
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isMoon ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 20 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative"
          >
            {/* Outer atmospheric glow (Moon) */}
            <motion.div
              className="absolute -inset-32 md:-inset-48 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(200,169,110,0.06) 0%, rgba(200,169,110,0.03) 30%, rgba(100,130,180,0.02) 50%, transparent 70%)',
                scale: glowIntensity,
              }}
            />

            {/* Moon image core */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-[0_0_50px_rgba(200,169,110,0.1)]">
              <img
                src="images/moon.png"
                alt="Moon"
                className="w-full h-full object-cover rounded-full scale-110"
                style={{
                  filter: 'brightness(1.1) contrast(1.05)',
                }}
              />

              {/* Terminator shadow for 3D effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(${135 + mouse.x * 0.5}deg, transparent 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 80%)`,
                  transition: 'background 0.3s ease',
                }}
              />

              {/* Surface highlight */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at ${45 + mouse.x * 0.3}% ${40 + mouse.y * 0.3}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                  transition: 'background 0.3s ease',
                }}
              />

              {/* Rim light */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: 'inset -3px -3px 20px rgba(0,0,0,0.6), inset 3px 3px 15px rgba(255,240,200,0.15)',
                }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotate: -20 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="relative"
          >
            {/* Ultra-realistic Sun (using NASA SDO data) */}

            {/* Outer solar corona glow */}
            <motion.div
              className="absolute -inset-48 md:-inset-72 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,140,0,0.2) 0%, rgba(255,69,0,0.08) 35%, rgba(255,0,0,0.03) 60%, transparent 85%)',
                scale: glowIntensity,
              }}
              animate={{
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Intense solar glare */}
            <div
              className="absolute -inset-10 md:-inset-16 rounded-full blur-3xl opacity-30"
              style={{ background: 'radial-gradient(circle, #fff 0%, #ff8c00 50%, transparent 100%)' }}
            />

            {/* Sun core with NASA imagery */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-[0_0_120px_rgba(255,100,0,0.8)] bg-black">
              <motion.img
                src="images/sun.png"
                alt="Sun"
                className="w-full h-full object-cover scale-[1.3] brightness-125 contrast-125 saturate-[1.2]"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              />

              {/* Inner core intense glow */}
              <div
                className="absolute inset-0 rounded-full mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
                }}
              />

              {/* Spherical lighting overlay to make it pop (Interactive) */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at ${35 + mouse.x * 0.4}% ${35 + mouse.y * 0.4}%, rgba(255,255,255,0.4) 0%, transparent 50%)`,
                }}
              />

              {/* Deep Shadow for realistic 3D sphere feel (Interactive) */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at ${80 - mouse.x * 0.3}% ${80 - mouse.y * 0.3}%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)`,
                }}
              />

              {/* Intense Rim light (Solar Flare Edge Glow) */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(255,100,0,0.8), inset 0 0 20px rgba(255,255,255,0.6)',
                }}
              />
            </div>

            {/* Solar Rays/Flares */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[0, 45, 90, 135].map((angle) => (
                <motion.div
                  key={angle}
                  className="absolute w-[1px] h-[200%] md:h-[250%] origin-center"
                  style={{
                    rotate: angle,
                    background: 'linear-gradient(to bottom, transparent, rgba(255,140,0,0.1), transparent)',
                  }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scaleY: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4 + angle * 0.01,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Heat Haze shimmer */}
            <motion.div
              className="absolute -inset-10 rounded-full bg-orange-500/5 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction Help Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] tracking-[0.4em] uppercase text-[var(--color-accent)] font-bold pointer-events-none"
      >
        Click for {isMoon ? 'Day' : 'Night'}
      </motion.div>
    </motion.div>
  );
}
