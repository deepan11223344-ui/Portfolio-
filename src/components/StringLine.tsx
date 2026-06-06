import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface StringLineProps {
  className?: string;
  color?: string;
  thickness?: number;
}

export default function StringLine({ className = '', color = '#c8a96e', thickness = 1 }: StringLineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const mouseY = useMotionValue(0.5);
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 20 });
  const [isHovered, setIsHovered] = useState(false);

  const controlY = useTransform(smoothY, [0, 1], [0.2, 0.8]);

  useEffect(() => {
    if (!isHovered) {
      mouseY.set(0.5);
    }
  }, [isHovered, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const y = (e.clientY - rect.top) / rect.height;
    mouseY.set(Math.max(0, Math.min(1, y)));
  };

  return (
    <svg
      ref={ref}
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className={`w-full h-20 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'crosshair' }}
    >
      <motion.path
        d={useTransform(controlY, (y) => `M 0 0.5 Q 0.5 ${y} 1 0.5`)}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        vectorEffect="non-scaling-stroke"
        style={{ opacity: isHovered ? 1 : 0.4 }}
      />
    </svg>
  );
}
