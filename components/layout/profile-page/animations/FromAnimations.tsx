'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

interface FromAnimationsProps {
  children: ReactNode;
  className: string;
}

/**
 * FromAnimations
 * @param children children ReactNode
 * @param className card wrapper className
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const FromAnimations: FC<FromAnimationsProps> = ({ children, className }) => {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLDivElement>(null);

  const [prevStage, setPrevStage] = useState('');
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // Handle GSAP transitions based on stage changes
  useGSAP(() => {
    const stageTl = gsap.timeline({
      id: 'stageFromTl',
      paused: true,
    });

    if (readyState) {
      if (stage === 'none' && prevStage === '') {
        stageTl
          .set(ref.current, {
            autoAlpha: 0,
          })
          .to(ref.current, {
            autoAlpha: 1,
          });
        stageTl.play();
      } else if (stage === 'entering' && prevStage === 'leaving') {
        stageTl
          .set(ref.current, {
            autoAlpha: 0,
          })
          .to(ref.current, {
            autoAlpha: 1,
          });
        stageTl.play();
      } else if (stage === 'leaving' && prevStage === 'none') {
        stageTl
          .set(ref.current, {
            autoAlpha: 1,
          })
          .to(ref.current, {
            autoAlpha: 0,
          });
        stageTl.play();
      }
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage, readyState]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default FromAnimations;
