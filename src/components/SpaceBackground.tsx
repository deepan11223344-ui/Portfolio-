import { useEffect, useRef, useCallback } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  layer: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  trail: { x: number; y: number; opacity: number }[];
  life: number;
  maxLife: number;
  thickness: number;
  active: boolean;
}

interface Asteroid {
  x: number;
  y: number;
  radius: number;
  speed: number;
  angle: number;
  rotation: number;
  rotationSpeed: number;
  active: boolean;
  points: { x: number; y: number }[];
}

interface SpaceBackgroundProps {
  isMoon: boolean;
}

export default function SpaceBackground({ isMoon }: SpaceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const lastShootingStarTime = useRef(0);
  const lastAsteroidTime = useRef(0);

  const starColors = ['#ffffff', '#ffe4c4', '#ffd700', '#add8e6', '#e6e6fa', '#fff5ee', '#f0f8ff', '#fffacd', '#b0c4de'];

  const createStars = useCallback((width: number, height: number) => {
    const totalHeight = height * 4;
    const stars: Star[] = [];
    const numStars = Math.floor((width * totalHeight) / 1800);

    for (let i = 0; i < numStars; i++) {
      const layer = Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2;
      const baseRadius = layer === 0 ? Math.random() * 0.8 + 0.2 : layer === 1 ? Math.random() * 1.2 + 0.5 : Math.random() * 1.8 + 0.8;
      const baseOpacity = layer === 0 ? Math.random() * 0.4 + 0.1 : layer === 1 ? Math.random() * 0.5 + 0.2 : Math.random() * 0.6 + 0.4;

      stars.push({
        x: Math.random() * width,
        y: Math.random() * totalHeight,
        radius: baseRadius,
        opacity: baseOpacity,
        baseOpacity,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        layer,
      });
    }
    return stars;
  }, []);

  const createShootingStar = useCallback((width: number, height: number): ShootingStar => {
    const side = Math.random();
    let x = side < 0.5 ? Math.random() * width : side < 0.8 ? -50 : width + 50;
    let y = side < 0.5 ? -50 : Math.random() * height * 0.4;
    let angle = side < 0.5 ? Math.PI / 4 : side < 0.8 ? Math.PI / 6 : Math.PI - Math.PI / 6;

    return {
      x, y, length: Math.random() * 100 + 60, speed: Math.random() * 4 + 5,
      angle, opacity: 1, trail: [], life: 0, maxLife: Math.random() * 60 + 40,
      thickness: Math.random() * 1.5 + 0.5, active: true
    };
  }, []);

  const createAsteroid = useCallback((width: number, height: number): Asteroid => {
    const radius = Math.random() * 3 + 2; // Small size (2 to 5px)
    const points = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const r = radius * (0.8 + Math.random() * 0.4);
      return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
    });

    const side = Math.random();
    let startX = side < 0.5 ? -20 : Math.random() * width;
    let startY = side < 0.5 ? Math.random() * height * 0.4 : -20;

    // Angle points diagonally down-right so it flies perfectly across the screen
    let angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;

    return {
      x: startX,
      y: startY,
      radius,
      speed: Math.random() * 2 + 3, // Normal comfortable speed
      angle,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      active: true,
      points
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      starsRef.current = createStars(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', handleMouseMove);
    const handleScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const drawStar = (star: Star, time: number, scrollOffset: number) => {
      const parallax = star.layer === 0 ? 0.02 : star.layer === 1 ? 0.05 : 0.1;
      const y = ((star.y - scrollOffset * parallax * 10) % (height * 4) + height * 4) % (height * 4);
      if (y > height + 10) return;
      const x = star.x + (mouseRef.current.x - width / 2) * (star.layer === 2 ? 0.01 : 0.002);
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
      const opacity = (star.baseOpacity + twinkle * 0.3 * star.baseOpacity) * (isMoon ? 1 : 0.2);
      if (opacity <= 0) return;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(x, y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawAsteroid = (ast: Asteroid) => {
      ctx.save();

      // Flaming trail (Violet color)
      ctx.translate(ast.x, ast.y);
      ctx.rotate(ast.angle);

      const tailGrad = ctx.createLinearGradient(0, 0, -ast.radius * 12, 0);
      tailGrad.addColorStop(0, 'rgba(255, 215, 0, 0.95)');  // Gold
      tailGrad.addColorStop(0.4, 'rgba(255, 69, 0, 0.7)');  // Red-Orange
      tailGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = tailGrad;
      ctx.beginPath();
      ctx.moveTo(0, -ast.radius * 1.5);
      ctx.lineTo(-ast.radius * 15, 0);
      ctx.lineTo(0, ast.radius * 1.5);
      ctx.closePath();
      ctx.fill();

      // Asteroid body (Golden red color)
      ctx.rotate(-ast.angle);
      ctx.rotate(ast.rotation);

      ctx.fillStyle = '#6a1a00'; // Dark red core
      ctx.beginPath();
      ctx.moveTo(ast.points[0].x, ast.points[0].y);
      ast.points.forEach(p => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.fill();

      const grad = ctx.createLinearGradient(-ast.radius, -ast.radius, ast.radius, ast.radius);
      grad.addColorStop(0, 'rgba(255, 69, 0, 1)'); // Red-Orange
      grad.addColorStop(0.5, 'rgba(255, 215, 0, 0.9)'); // Gold
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      if (!isMoon) {
        ctx.save();
        const grad = ctx.createRadialGradient(width * 0.85, height * 0.1, 0, width * 0.85, height * 0.1, height * 1.5);
        grad.addColorStop(0, 'rgba(255, 140, 0, 0.15)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      const stars = starsRef.current;
      stars.forEach(s => drawStar(s, time, scrollRef.current));

      // Shooting stars (Moon only)
      if (isMoon && time - lastShootingStarTime.current > 3000) {
        shootingStarsRef.current.push(createShootingStar(width, height));
        lastShootingStarTime.current = time;
      }

      if (isMoon) {
        const ss = shootingStarsRef.current;
        for (let i = ss.length - 1; i >= 0; i--) {
          const s = ss[i];
          s.trail.push({ x: s.x, y: s.y, opacity: 1 });
          if (s.trail.length > 20) s.trail.shift();
          s.trail.forEach(t => t.opacity *= 0.9);
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.life++;
          if (s.life > s.maxLife) s.active = false;
          if (!s.active) ss.splice(i, 1);
          else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
            ctx.stroke();
          }
        }
      }

      // Asteroids (one at a time, every 12 seconds)
      if (time - lastAsteroidTime.current > 12000) {
        asteroidsRef.current = [createAsteroid(width, height)]; // Overwrite so only 1 exists
        lastAsteroidTime.current = time;
      }

      const asts = asteroidsRef.current;
      for (let i = asts.length - 1; i >= 0; i--) {
        const a = asts[i];
        a.x += Math.cos(a.angle) * a.speed;
        a.y += Math.sin(a.angle) * a.speed;
        a.rotation += a.rotationSpeed;
        if (a.x > width + 100 || a.y > height + 100 || a.y < -100) a.active = false;
        if (!a.active) asts.splice(i, 1);
        else drawAsteroid(a);
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [createStars, createShootingStar, createAsteroid, isMoon]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'transparent' }} />;
}
