import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from "../assets/anime.png";
import Starfield from './Starfield';
gsap.registerPlugin(ScrollTrigger);

type Stage = {
  title: string;
  subtitle: string;
  summary: string;
  detail: string;
  x: string;
  y: string;
  skills: string[];
};

interface AnimationProps {
  setActiveStageIndex: (index: number) => void;
  journeyStages: Stage[];
}

const PULSE_COUNT = 3;

const Animation: React.FC<AnimationProps> = ({ setActiveStageIndex, journeyStages }) => {
  const journeyMapRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const runnerBodyRef = useRef<HTMLDivElement>(null);
  const runnerGlowRef = useRef<HTMLSpanElement>(null);
  const fxLayerRef = useRef<HTMLDivElement>(null);
  const stageNodesRef = useRef<HTMLButtonElement[]>([]);
  const stageInnerRef = useRef<HTMLDivElement[]>([]);
  const pulsesRef = useRef<HTMLSpanElement[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const parallaxRef = useRef({ x: 0, y: 0 });
  const reduceMotionRef = useRef(false);
  const tiltSettersRef = useRef(
    new Map<number, { tiltX: (v: number) => void; tiltY: (v: number) => void; lift: (v: number) => void; scale: (v: number) => void }>()
  );

  // Responsive check
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Compute mobile positions: vertical track, nodes alternate left/right
  const getMobileX = (index: number): string => {
    return index % 2 === 0 ? '30%' : '70%';
  };

  const getMobileY = (index: number): string => {
    const total = journeyStages.length;
    const step = 80 / (total - 1 || 1);
    return `${10 + step * index}%`;
  };

  // Spawn a short-lived particle burst at a point relative to the journey map
  const spawnParticles = useCallback(
    (cx: number, cy: number, count: number, variant: 'spark' | 'dust') => {
      const layer = fxLayerRef.current;
      if (!layer || reduceMotionRef.current) return;

      for (let i = 0; i < count; i += 1) {
        const el = document.createElement('span');
        el.className = variant === 'spark' ? 'fx-particle fx-particle--spark' : 'fx-particle fx-particle--dust';
        el.style.left = `${cx}px`;
        el.style.top = `${cy}px`;
        layer.appendChild(el);

        const angle = variant === 'spark'
          ? Math.random() * Math.PI * 2
          : Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const distance = variant === 'spark' ? 26 + Math.random() * 46 : 14 + Math.random() * 22;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance * (variant === 'dust' ? 0.6 : 1);

        gsap.fromTo(
          el,
          { x: 0, y: 0, opacity: 1, scale: variant === 'spark' ? 0.4 : 0.7 },
          {
            x: dx,
            y: dy,
            opacity: 0,
            scale: variant === 'spark' ? 1.1 : 0.3,
            duration: 0.5 + Math.random() * 0.4,
            ease: 'power2.out',
            onComplete: () => el.remove(),
          }
        );
      }
    },
    []
  );

  const spawnRipple = useCallback((cx: number, cy: number) => {
    const layer = fxLayerRef.current;
    if (!layer || reduceMotionRef.current) return;
    const ring = document.createElement('span');
    ring.className = 'fx-ripple';
    ring.style.left = `${cx}px`;
    ring.style.top = `${cy}px`;
    layer.appendChild(ring);
    gsap.fromTo(
      ring,
      { scale: 0.3, opacity: 0.9 },
      {
        scale: 2.4,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => ring.remove(),
      }
    );
  }, []);

  // Fire all "arrival" effects for a milestone: glow states, ripple/burst, runner landing, camera punch
  const arriveAtStage = useCallback(
    (index: number) => {
      const map = journeyMapRef.current;
      const nodes = stageNodesRef.current;
      const runner = runnerRef.current;
      const body = runnerBodyRef.current;
      if (!map) return;

      nodes.forEach((node, i) => {
        if (!node) return;
        node.classList.toggle('stage-node--visited', i <= index);
        node.classList.toggle('stage-node--active', i === index);
      });

      const mapRect = map.getBoundingClientRect();
      const activeNode = nodes[index];
      if (activeNode) {
        const r = activeNode.getBoundingClientRect();
        spawnRipple(r.left + r.width / 2 - mapRect.left, r.top + r.height / 2 - mapRect.top);
        spawnParticles(r.left + r.width / 2 - mapRect.left, r.top + r.height / 2 - mapRect.top, 10, 'spark');
      }

      if (runner) {
        const rr = runner.getBoundingClientRect();
        spawnParticles(rr.left + rr.width / 2 - mapRect.left, rr.bottom - mapRect.top - 4, 6, 'dust');
      }

      if (body && !reduceMotionRef.current) {
        gsap
          .timeline()
          .to(body, { scaleX: 1.16, scaleY: 0.82, duration: 0.1, ease: 'power2.out' })
          .to(body, { scaleX: 0.94, scaleY: 1.06, duration: 0.14, ease: 'power2.out' })
          .to(body, { scaleX: 1, scaleY: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });
      }

      if (runnerGlowRef.current && !reduceMotionRef.current) {
        gsap.fromTo(
          runnerGlowRef.current,
          { opacity: 0.55, scale: 1 },
          { opacity: 1, scale: 1.35, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.out' }
        );
      }

      if (stageRef.current && !reduceMotionRef.current) {
        gsap.fromTo(
          stageRef.current,
          { scale: 1, y: 0 },
          { scale: 1.012, y: -2, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' }
        );
      }
    },
    [spawnParticles, spawnRipple]
  );

  useEffect(() => {
    const journeyMap = journeyMapRef.current;
    const runner = runnerRef.current;
    const stageNodes = stageNodesRef.current;

    if (!journeyMap || !runner || stageNodes.length === 0) return;

    ScrollTrigger.getAll().forEach(st => {
      if (st.vars.trigger === journeyMap) st.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: journeyMap,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const stageIndex = Math.min(
            journeyStages.length - 1,
            Math.floor(progress * journeyStages.length)
          );
          setActiveStageIndex(stageIndex);
        },
      },
    });

    journeyStages.forEach((stage, index) => {
      const targetX = isMobile ? getMobileX(index) : stage.x;
      const targetY = isMobile ? getMobileY(index) : stage.y;

      tl.to(
        runner,
        {
          '--x': targetX,
          '--y': targetY,
          duration: 1,
          ease: 'power1.inOut',
          onStart: () => runner.classList.add('is-moving'),
          onComplete: () => {
            runner.classList.remove('is-moving');
            arriveAtStage(index);
          },
          onReverseComplete: () => {
            runner.classList.remove('is-moving');
            arriveAtStage(index);
          },
        },
        index
      );
      tl.to(
        stageNodes[index],
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
        },
        index
      );
      if (index > 0) {
        tl.to(
          stageNodes[index - 1],
          {
            opacity: 0.5,
            scale: 0.8,
            duration: 0.5,
          },
          index
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === journeyMap) st.kill();
      });
    };
  }, [setActiveStageIndex, journeyStages, isMobile, arriveAtStage]);

  // Ambient traveling energy pulses along the track (independent of scroll)
  useEffect(() => {
    if (reduceMotionRef.current) return;
    const tweens = pulsesRef.current.map((pulse, i) => {
      if (!pulse) return null;
      gsap.set(pulse, { '--p': 0 });
      return gsap.to(pulse, {
        '--p': 100,
        duration: 2.6 + i * 0.5,
        repeat: -1,
        ease: 'none',
        delay: i * 0.8,
      });
    });
    return () => tweens.forEach((t) => t?.kill());
  }, []);

  // Global cursor parallax for background layers
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (reduceMotionRef.current || !journeyMapRef.current) return;
    const rect = journeyMapRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    parallaxRef.current.x = nx;
    parallaxRef.current.y = ny;
    gsap.to(journeyMapRef.current, { '--mx': nx, '--my': ny, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
  }, []);

  const handlePointerLeave = useCallback(() => {
    parallaxRef.current.x = 0;
    parallaxRef.current.y = 0;
    if (!journeyMapRef.current) return;
    gsap.to(journeyMapRef.current, { '--mx': 0, '--my': 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
  }, []);

  const getTiltSetters = (index: number, el: HTMLElement) => {
    let setters = tiltSettersRef.current.get(index);
    if (!setters) {
      setters = {
        tiltX: gsap.quickTo(el, '--tilt-x', { duration: 0.4, ease: 'power3' }),
        tiltY: gsap.quickTo(el, '--tilt-y', { duration: 0.4, ease: 'power3' }),
        lift: gsap.quickTo(el, '--hover-lift', { duration: 0.35, ease: 'power3' }),
        scale: gsap.quickTo(el, '--hover-scale', { duration: 0.35, ease: 'power3' }),
      };
      tiltSettersRef.current.set(index, setters);
    }
    return setters;
  };

  const handleCardPointerMove = (index: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduceMotionRef.current) return;
    const inner = stageInnerRef.current[index];
    if (!inner) return;
    const rect = inner.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    const { tiltX, tiltY } = getTiltSetters(index, inner);
    tiltX(nx * 9);
    tiltY(-ny * 9);
  };

  const handleCardPointerEnter = (index: number) => () => {
    if (reduceMotionRef.current) return;
    const inner = stageInnerRef.current[index];
    if (!inner) return;
    const { lift, scale } = getTiltSetters(index, inner);
    lift(-6);
    scale(1.04);
  };

  const handleCardPointerLeave = (index: number) => () => {
    const inner = stageInnerRef.current[index];
    if (!inner) return;
    const { tiltX, tiltY, lift, scale } = getTiltSetters(index, inner);
    tiltX(0);
    tiltY(0);
    lift(0);
    scale(1);
  };

  return (
    <>
      <section
        className="journey-map"
        id="journey"
        ref={journeyMapRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <Starfield parallaxRef={parallaxRef} />
        <div className="journey-map__sky" />
        <div className="journey-map__fog journey-map__fog--a" />
        <div className="journey-map__fog journey-map__fog--b" />
        <div className="journey-map__rays" />
        <div className="journey-map__mist journey-map__mist--left" />
        <div className="journey-map__mist journey-map__mist--right" />

        <div className="journey-map__stage" ref={stageRef}>
          <div className="journey-map__track">
            <span className="journey-map__track-flow" aria-hidden="true" />
            {Array.from({ length: PULSE_COUNT }).map((_, i) => (
              <span
                key={i}
                className="energy-pulse"
                ref={(el) => {
                  pulsesRef.current[i] = el!;
                }}
                aria-hidden="true"
              />
            ))}
          </div>
          <div className="journey-map__glow journey-map__glow--start" />
          <div className="journey-map__glow journey-map__glow--end" />

          <div className="journey-map__fx" ref={fxLayerRef} aria-hidden="true" />

          <div
            className="runner"
            ref={runnerRef}
            style={{
              ['--x' as string]: isMobile ? getMobileX(0) : journeyStages[0].x,
              ['--y' as string]: isMobile ? getMobileY(0) : journeyStages[0].y,
            }}
          >
            <span className="runner__glow" ref={runnerGlowRef} aria-hidden="true" />
            <div className="runner__body" ref={runnerBodyRef}>
              <img src={anime} alt="Runner" />
              <span className="runner__trail" aria-hidden="true" />
            </div>
            <span className="runner__shadow" />
          </div>

          {journeyStages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              ref={(el) => {
                stageNodesRef.current[index] = el!;
              }}
              className="stage-node"
              style={{
                ['--x' as string]: isMobile ? getMobileX(index) : stage.x,
                ['--y' as string]: isMobile ? getMobileY(index) : stage.y,
                opacity: 0,
                transform: 'scale(0.5) rotate(-6deg)',
              }}
              aria-label={`Focus ${stage.title}`}
              onPointerMove={handleCardPointerMove(index)}
              onPointerEnter={handleCardPointerEnter(index)}
              onPointerLeave={handleCardPointerLeave(index)}
            >
              <span className="stage-node__glow-border" aria-hidden="true" />
              <span className="stage-node__ring" aria-hidden="true" />
              <div
                className="stage-node__inner"
                ref={(el) => {
                  stageInnerRef.current[index] = el!;
                }}
                style={{ ['--float-delay' as string]: `${index * 0.3}s` }}
              >
                <span className="stage-node__sheen" aria-hidden="true" style={{ ['--sheen-delay' as string]: `${index * 0.6}s` }} />
                <span className="stage-node__level">{index + 1}</span>
                <span className="stage-node__tag">{stage.subtitle}</span>
                <span className="stage-node__title">{stage.title}</span>
                <span className="stage-node__summary">{stage.summary}</span>
                <span className="stage-node__detail">{stage.detail}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default Animation;
