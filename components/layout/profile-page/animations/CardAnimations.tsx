'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

interface CardAnimationsProps {
  children: ReactNode;
  className: string;
  index: number;
}

/**
 * ProfileCard animations
 * @param children children ReactNode
 * @param className card wrapper className
 * @param index index of element in array for stagger
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const CardAnimations: FC<CardAnimationsProps> = ({
  children,
  className,
  index,
}) => {
  const { stage } = useTransitionState();
  const [prevStage, setPrevStage] = useState('');
  const ref = useRef(null);
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // stageTl
  useGSAP(() => {
    if (!ref.current || !readyState) {
      return;
    }
    const first = stage === 'none' && prevStage === '';
    const enter = stage === 'entering' && prevStage === 'leaving';
    const leaving = stage === 'leaving' && prevStage === 'none';

    const stageTl = gsap.timeline({
      id: 'stageProfileCardTl',
    });

    // first loading
    if (first) {
      stageTl.fromTo(
        ref.current,
        {
          scale: 0,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          delay: index / 10,
        },
      );
    }
    // enter stage
    else if (enter) {
      stageTl.fromTo(
        ref.current,
        {
          scale: 0,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          delay: index / 10,
        },
      );
    }
    // leaving stage
    else if (leaving) {
      stageTl.to(ref.current, {
        scale: 0,
        duration: 0.5,
        delay: index / 10,
        ease: 'power1.inOut',
      });
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default CardAnimations;
