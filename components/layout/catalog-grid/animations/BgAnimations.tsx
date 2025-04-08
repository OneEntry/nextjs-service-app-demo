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
}

/**
 * BgAnimations
 *
 * @returns card with animations
 */
const BgAnimations: FC<CardAnimationsProps> = ({ children, className }) => {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLDivElement>(null);

  const [prevStage, setPrevStage] = useState<string>('');
  const [inView, setInView] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);
  const [triggerRef, setTriggerRef] = useState<gsap.core.Timeline>();

  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // triggerTl
  useGSAP(() => {
    if (!readyState || transition) {
      return;
    }
    const triggerTl = gsap.timeline({
      id: 'bgTriggerTl',
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        scrub: 4,
        toggleActions: 'restart reverse restart reverse',
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          setInView(self.isActive);
        },
      },
    });
    setTriggerRef(triggerTl);

    triggerTl
      .fromTo(
        '#beauty_bg',
        {
          autoAlpha: 0.5,
          x: 400,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 3,
        },
      )
      .fromTo(
        '#salon_bg',
        {
          autoAlpha: 0.5,
          x: -400,
        },
        {
          autoAlpha: 1,
          x: 0,
          duration: 5,
          stagger: 0.1,
        },
        '-=2.5',
      );

    return () => {
      triggerTl.kill();
    };
  }, [readyState, transition]);

  // stage Tl
  useGSAP(() => {
    // stageTl
    const stageTl = gsap.timeline({
      id: 'bgStageTl',
      paused: true,
    });

    // first loading
    if (stage === 'none' && prevStage === '' && readyState) {
      stageTl
        .fromTo(
          '#beauty_bg span',
          {
            autoAlpha: 0.5,
            yPercent: 50,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 3,
            stagger: 0.15,
          },
        )
        .fromTo(
          '#salon_bg span',
          {
            autoAlpha: 0.5,
            yPercent: 50,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 3.5,
            delay: 0.25,
            stagger: 0.1,
          },
          '<',
        )
        .play();
    }
    // enter stage
    else if (stage === 'entering' && prevStage === 'leaving' && readyState) {
      stageTl
        .fromTo(
          '#beauty_bg span',
          {
            autoAlpha: 0.5,
            yPercent: 50,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 3,
            stagger: 0.15,
          },
        )
        .fromTo(
          '#salon_bg span',
          {
            autoAlpha: 0.5,
            yPercent: 50,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 3.5,
            delay: 0.25,
            stagger: 0.1,
          },
          '<',
        )
        .play();
    } else if (stage === 'leaving' && prevStage === 'none') {
      setTransition(true);
      triggerRef?.kill();
      if (inView) {
        stageTl
          .to('#beauty_bg', {
            autoAlpha: 0,
            x: -1500,
            duration: 1,
            ease: 'power2.out',
          })
          .to('#salon_bg', {
            autoAlpha: 0,
            x: 1500,
            duration: 0.85,
            delay: -0.95,
            ease: 'power2.out',
          })
          .to('#beauty_bg span', {
            autoAlpha: 0,
            yPercent: 50,
            duration: 0.35,
            stagger: 0.15,
          })
          .to(
            '#salon_bg span',
            {
              autoAlpha: 0,
              yPercent: 70,
              duration: 0.35,
              delay: 0.15,
              stagger: 0.1,
            },
            '<',
          )
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

export default BgAnimations;
