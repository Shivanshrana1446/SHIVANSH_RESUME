import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from "../assets/anime.png";
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

const Animation: React.FC<AnimationProps> = ({ setActiveStageIndex, journeyStages }) => {
  const journeyMapRef = useRef<HTMLElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const stageNodesRef = useRef<HTMLButtonElement[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Responsive check
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  // Compute mobile positions: vertical track, nodes alternate left/right
  const getMobileX = (index: number): string => {
    // Even indices go left of track, odd go right
    return index % 2 === 0 ? '30%' : '70%';
  };

  const getMobileY = (index: number): string => {
    // Distribute evenly from 10% to 90%
    const total = journeyStages.length;
    const step = 80 / (total - 1 || 1);
    return `${10 + step * index}%`;
  };

  useEffect(() => {
    const journeyMap = journeyMapRef.current;
    const runner = runnerRef.current;
    const stageNodes = stageNodesRef.current;

    if (!journeyMap || !runner || stageNodes.length === 0) return;

    // Kill any existing ScrollTrigger instances on this element
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
        },
        index
      );
      tl.to(
        stageNodes[index],
        {
          opacity: 1,
          scale: 1,
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
  }, [setActiveStageIndex, journeyStages, isMobile]);

  return (
    <>
      <section className="journey-map" id="journey" ref={journeyMapRef}>
        <div className="journey-map__sky" />
        <div className="journey-map__mist journey-map__mist--left" />
        <div className="journey-map__mist journey-map__mist--right" />
        <div className="journey-map__track" />
        <div className="journey-map__glow journey-map__glow--start" />
        <div className="journey-map__glow journey-map__glow--end" />

        <div
          className="runner"
          ref={runnerRef}
          style={{
            ['--x' as string]: isMobile ? getMobileX(0) : journeyStages[0].x,
            ['--y' as string]: isMobile ? getMobileY(0) : journeyStages[0].y,
          }}
        >
         <img src={anime} alt="Runner" />
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
              transform: 'scale(0.5)',
            }}
            aria-label={`Focus ${stage.title}`}
          >
            <span className="stage-node__level">{index + 1}</span>
            <span className="stage-node__tag">{stage.subtitle}</span>
            <span className="stage-node__title">{stage.title}</span>
            <span className="stage-node__summary">{stage.summary}</span>
            <span className="stage-node__detail">{stage.detail}</span>
          </button>
        ))}
      </section>
    </>
  );
};

export default Animation;
