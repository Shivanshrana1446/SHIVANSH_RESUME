import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  z: number;
  r: number;
  speed: number;
  hue: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

type Spark = {
  x: number;
  y: number;
  angle: number;
  life: number;
  maxLife: number;
};

const STAR_COUNT = 60;
const DUST_COUNT = 22;

interface StarfieldProps {
  parallaxRef: React.MutableRefObject<{ x: number; y: number }>;
}

const Starfield: React.FC<StarfieldProps> = ({ parallaxRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let frameId = 0;
    let sparks: Spark[] = [];
    let t = 0;

    const stars: Particle[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.4 + Math.random() * 0.6,
      r: 0.6 + Math.random() * 1.3,
      speed: 0.002 + Math.random() * 0.004,
      hue: Math.random() > 0.5 ? 200 : 155,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.5 + Math.random() * 1,
    }));

    const dust: Particle[] = Array.from({ length: DUST_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.15 + Math.random() * 0.35,
      r: 1 + Math.random() * 2.2,
      speed: 0.01 + Math.random() * 0.014,
      hue: Math.random() > 0.5 ? 160 : 205,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.25 + Math.random() * 0.4,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const maybeSpawnSpark = () => {
      if (sparks.length < 4 && Math.random() < 0.01) {
        sparks.push({
          x: Math.random(),
          y: Math.random(),
          angle: Math.random() * Math.PI * 2,
          life: 0,
          maxLife: 45 + Math.random() * 25,
        });
      }
    };

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      const px = parallaxRef.current.x;
      const py = parallaxRef.current.y;

      dust.forEach((p) => {
        p.y -= p.speed * 0.02;
        if (p.y < -0.06) p.y = 1.06;
        const alpha = 0.22 + 0.22 * Math.sin(t * 0.02 * p.twinkleSpeed + p.twinklePhase);
        const x = p.x * width + px * 16 * p.z;
        const y = p.y * height + py * 16 * p.z;
        const glowR = p.r * 6;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${alpha})`);
        grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();
      });

      stars.forEach((p) => {
        const alpha = 0.3 + 0.55 * Math.max(0, Math.sin(t * 0.03 * p.twinkleSpeed + p.twinklePhase));
        const x = p.x * width + px * 28 * p.z;
        const y = p.y * height + py * 28 * p.z;
        ctx.fillStyle = `hsla(${p.hue}, 95%, 85%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduceMotion) {
        maybeSpawnSpark();
        sparks = sparks.filter((s) => s.life < s.maxLife);
        sparks.forEach((s) => {
          s.life += 1;
          const progress = s.life / s.maxLife;
          const alpha = Math.sin(progress * Math.PI);
          const x = s.x * width;
          const y = s.y * height;
          const dx = Math.cos(s.angle) * 5;
          const dy = Math.sin(s.angle) * 5;
          ctx.strokeStyle = `rgba(180, 232, 255, ${alpha * 0.75})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(x - dx, y - dy);
          ctx.lineTo(x + dx, y + dy);
          ctx.stroke();
          ctx.fillStyle = `rgba(220, 245, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      if (!reduceMotion) {
        frameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [parallaxRef]);

  return <canvas className="journey-map__canvas" ref={canvasRef} aria-hidden="true" />;
};

export default Starfield;
