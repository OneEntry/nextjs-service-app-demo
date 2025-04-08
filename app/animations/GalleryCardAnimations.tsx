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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

/**
 * GalleryCard animations
 *
 * @param children children ReactNode
 * @param className card wrapper className
 * @param index index of element in array for stagger
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const GalleryCardAnimations: FC<CardAnimationsProps> = ({
  children,
  className,
  index,
  style,
}) => {
  const { stage } = useTransitionState();
  const ref = useRef(null);
  const [prevStage, setPrevStage] = useState('');
  const [inView, setInView] = useState<boolean>(false);
  const [triggerRef, setTriggerRef] = useState<gsap.core.Timeline>();

  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // triggerTl
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
    });
    setTriggerRef(triggerTl);

    triggerTl.fromTo(
      ref.current,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        delay: index / 20,
        duration: 0.5,
        // ease: 'power1.inOut',
      },
    );

    return () => {
      triggerTl.kill();
    };
  }, [readyState]);

  // stageTl
  useGSAP(() => {
    const stageTl = gsap.timeline();

    if (stage === 'leaving' && prevStage === 'none') {
      triggerRef?.kill();
      if (inView) {
        stageTl.to(ref.current, {
          scale: 0,
          autoAlpha: 0,
          duration: 0.65,
          delay: index / 20,
          ease: 'power1.inOut',
        });
      }
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage, readyState]);

  return (
    <div className={className} style={style} ref={ref}>
      {children}
    </div>
  );
};

export default GalleryCardAnimations;
