'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

interface BookingAnimationsProps {
  children: ReactNode;
  className: string;
}

/**
 * BookingAnimations animations
 * @param children children ReactNode
 * @param className card wrapper className
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const BookingAnimations: FC<BookingAnimationsProps> = ({
  children,
  className,
}) => {
  const { stage } = useTransitionState();
  const [prevStage, setPrevStage] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // stageTl
  useGSAP(() => {
    if (!readyState) {
      return;
    }
    const stageTl = gsap.timeline({
      paused: true,
    });
    const title = ref.current?.querySelectorAll('.title') || '';

    // leaving stage
    if (stage === 'none' && prevStage === '') {
      stageTl
        .from(title, {
          autoAlpha: 0,
        })
        .from(ref.current, {
          autoAlpha: 0,
        })
        .play();
    } else if (stage === 'entering' && prevStage === 'leaving') {
      stageTl
        .from(title, {
          autoAlpha: 0,
        })
        .from(ref.current, {
          autoAlpha: 0,
        })
        .play();
    } else if (stage === 'leaving' && prevStage === 'none') {
      // stageTl
      //   .to(ref.current, {
      //     autoAlpha: 0,
      //   })
      //   .play();
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage, readyState]);

  return (
    <section className={className} ref={ref}>
      {children}
    </section>
  );
};

export default BookingAnimations;
