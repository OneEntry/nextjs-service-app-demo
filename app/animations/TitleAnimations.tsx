'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '../store/hooks';

/**
 * TitleAnimations
 *
 * @param children children ReactNode
 * @param className CSS className of ref element
 * @param index Index of element for animations stagger
 *
 * @returns JSX.Element with animated ref
 */
const TitleAnimations = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className: string;
  delay?: number;
}) => {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLDivElement>(null);
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  const [transition, setTransition] = useState<boolean>(false);
  const [triggerTl, setTriggerTl] = useState<gsap.core.Timeline>();
  const [prevStage, setPrevStage] = useState('');
  const [inView, setInView] = useState(false);

  // triggerTl
  useGSAP(() => {
    if (!ref.current || !readyState) {
      return;
    }
    const title = ref.current?.querySelector('.title');
    const hr = ref.current?.querySelector('hr');

    const triggerTl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'restart reverse restart reverse',
        start: 'top 80%',
        end: 'bottom top',
        // markers: true,
        onToggle: (self) => {
          setInView(self.isActive);
        },
      },
      delay: delay,
    });
    setTriggerTl(triggerTl);

    if (title) {
      triggerTl.fromTo(
        title,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 1,
        },
      );
    }
    if (hr) {
      triggerTl.fromTo(
        hr,
        {
          autoAlpha: 0.5,
          width: '0%',
        },
        {
          autoAlpha: 1,
          width: '100%',
          duration: 1.25,
          transformOrigin: 'center center',
        },
        '-=0.5',
      );
    }

    return () => {
      triggerTl.kill();
    };
  }, [readyState]);

  // stageTl
  useGSAP(() => {
    if (!readyState || transition) {
      return;
    }
    const title = ref.current?.querySelector('.title');
    const hr = ref.current?.querySelector('hr');

    const stageTl = gsap.timeline({
      paused: true,
    });

    // leaving stage
    if (stage === 'leaving' && prevStage === 'none') {
      triggerTl?.kill();
      setTransition(true);
      if (title) {
        stageTl.fromTo(
          title,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.65,
            ease: 'power2.inOut',
          },
        );
      }
      if (hr) {
        stageTl.fromTo(
          hr,
          {
            autoAlpha: 0.25,
            width: '0%',
          },
          {
            autoAlpha: 1,
            width: '100%',
            duration: 0.75,
            transformOrigin: 'center center',
            ease: 'power2.inOut',
          },
          '-=0.35',
        );
      }
      if (inView) {
        stageTl.reverse(1);
      }
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage, readyState, triggerTl, inView]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default TitleAnimations;
