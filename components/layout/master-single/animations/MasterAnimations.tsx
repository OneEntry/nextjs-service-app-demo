'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

interface MasterAnimationsProps {
  children: ReactNode;
  className: string;
}

/**
 * MasterAnimations animations
 *
 * @param children children ReactNode
 * @param className card wrapper className
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const MasterAnimations: FC<MasterAnimationsProps> = ({
  children,
  className,
}) => {
  const { stage } = useTransitionState();
  const [prevStage, setPrevStage] = useState('');
  const ref = useRef<HTMLDivElement>(null);
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
    const items = ref.current?.querySelectorAll('.item') || [];

    const triggerTl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'restart reverse restart reverse',
        start: 'top bottom',
        end: '+=120% top',
        // markers: true,
        onToggle: (self) => {
          setInView(self.isActive);
        },
      },
    });
    setTriggerRef(triggerTl);

    triggerTl.fromTo(
      items,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.35,
        stagger: 0.05,
      },
    );

    return () => {
      triggerTl.kill();
    };
  }, [readyState]);

  // stage tl
  useGSAP(() => {
    const items = ref.current?.querySelectorAll('.item') || [];

    const stageTl = gsap.timeline({
      paused: true,
    });

    // leaving stage
    if (stage === 'leaving' && prevStage === 'none') {
      triggerRef?.kill();
      if (inView) {
        stageTl
          .to([...items]?.reverse(), {
            autoAlpha: 0,
            yPercent: 50,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power1.inOut',
          })
          .play();
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

export default MasterAnimations;
