'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '../store/hooks';

interface CarouselCardAnimationsProps {
  children: ReactNode;
  className: string;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setState: any;
}

/**
 * Card animations with setState
 * @param children children ReactNode
 * @param className card wrapper className
 * @param index index of element in array for stagger
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const CarouselCardAnimations: FC<CarouselCardAnimationsProps> = ({
  children,
  className,
  index,
  setState,
}) => {
  const { stage } = useTransitionState();
  const [prevStage, setPrevStage] = useState('');
  const ref = useRef(null);
  const [triggerRef, setTriggerRef] = useState<gsap.core.Timeline>();
  const [inView, setInView] = useState<boolean>(false);

  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  useGSAP(() => {
    if (!readyState) {
      return;
    }
    const triggerTl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'restart reverse restart reverse',
        start: 'top bottom',
        end: 'bottom top',
        // markers: true,
        onToggle: (self) => {
          setInView(self.isActive);
        },
      },
      onStart: () => {
        setState(false);
      },
      onComplete: () => {
        setState(true);
      },
      onReverseComplete: () => {
        setState(true);
      },
    });
    setTriggerRef(triggerTl);

    triggerTl.fromTo(
      ref.current,
      {
        autoAlpha: 0,
        scale: 0.8,
        yPercent: 100,
      },
      {
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        delay: index / 10,
        duration: 1,
      },
    );

    return () => {
      triggerTl.kill();
    };
  }, [readyState]);

  // stage leaving animations
  useGSAP(() => {
    const stageTl = gsap.timeline();

    if (stage === 'leaving' && prevStage === 'none') {
      triggerRef?.kill();
      if (inView) {
        stageTl.to(ref.current, {
          scale: 0,
          duration: 0.65,
          delay: index / 10,
        });
      }
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage, readyState, triggerRef, inView]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default CarouselCardAnimations;
