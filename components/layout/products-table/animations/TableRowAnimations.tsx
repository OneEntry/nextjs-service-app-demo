'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

/**
 * TableRowAnimations
 *
 * @param children children ReactNode
 * @param className CSS className of ref element
 * @param index Index of element for animations stagger
 *
 * @returns JSX.Element with animated ref
 */
const TableRowAnimations = ({
  children,
  className,
  onClick,
  index = 0,
}: {
  children: ReactNode;
  className: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  index: number;
}) => {
  const { stage } = useTransitionState();
  const [prevStage, setPrevStage] = useState('');
  const ref = useRef<HTMLTableRowElement>(null);
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
        yPercent: 100,
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.35,
        delay: index / 10,
      },
    );

    return () => {
      triggerTl.kill();
    };
  }, [readyState]);

  // on stage change transitions
  useGSAP(() => {
    if (!ref.current) {
      return;
    }
    const tl = gsap.timeline({
      paused: true,
    });

    if (stage === 'leaving' && prevStage === 'none') {
      triggerRef?.kill();
      if (inView) {
        tl.to(ref.current, {
          autoAlpha: 0,
          yPercent: 100,
          duration: 0.5,
          delay: index / 10,
        }).play();
      }
    }

    setPrevStage(stage);

    return () => {
      tl.kill();
    };
  }, [stage, readyState, triggerRef, inView]);

  return (
    <tr ref={ref} onClick={onClick} className={className}>
      {children}
    </tr>
  );
};

export default TableRowAnimations;
