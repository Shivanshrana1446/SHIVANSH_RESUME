import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  useEffect(() => {
    const journeyMap = journeyMapRef.current;
    const runner = runnerRef.current;
    const stageNodes = stageNodesRef.current;

    if (!journeyMap || !runner || stageNodes.length === 0) return;

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
      tl.to(
        runner,
        {
          '--x': stage.x,
          '--y': stage.y,
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
  }, [setActiveStageIndex, journeyStages]);

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
            ['--x' as string]: journeyStages[0].x,
            ['--y' as string]: journeyStages[0].y,
          }}
        >
          <img src="/src/assets/anime.png" alt="Runner" />
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
              ['--x' as string]: stage.x,
              ['--y' as string]: stage.y,
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
