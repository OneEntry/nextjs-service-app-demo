'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

/**
 * TableAnimations
 *
 * @param children children ReactNode
 * @param className CSS className of ref element
 * @param index Index of element for animations stagger
 *
 * @returns JSX.Element with animated ref
 */
const TableAnimations = ({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className: string;
  style?: object;
  delay?: number;
}) => {
  const { stage } = useTransitionState();
  const [prevStage, setPrevStage] = useState<string>('');
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
    const triggerTl = gsap.timeline({
      id: 'tableTriggerTl',
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'restart reverse restart reverse',
        start: 'center bottom',
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
        duration: 0.5,
        delay: delay,
      },
    );

    return () => {
      triggerTl.kill();
    };
  }, [readyState]);

  // stageTl
  useGSAP(() => {
    const stageTl = gsap.timeline({
      paused: true,
    });

    // leaving stage
    if (stage === 'leaving' && prevStage === 'none') {
      triggerRef?.kill();
      if (inView) {
        stageTl
          .to(ref.current, {
            autoAlpha: 0,
            borderColor: 'transparent',
            duration: 0.65,
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
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default TableAnimations;
