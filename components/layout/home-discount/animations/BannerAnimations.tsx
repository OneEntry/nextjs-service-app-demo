'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

const BannerAnimations = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLDivElement>(null);
  const [prevStage, setPrevStage] = useState<string>('');
  const [inView, setInView] = useState<boolean>(false);
  const [triggerRef, setTriggerRef] = useState<gsap.core.Timeline>();
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  useGSAP(() => {
    if (!ref.current) {
      return;
    }
    const title = ref.current?.querySelector('#baner_title');
    const image = ref.current?.querySelector('#baner_image');
    const link = ref.current?.querySelector('#baner_link');
    const descr = ref.current?.querySelector('#baner_descr');
    const phone = ref.current?.querySelector('#baner_phone');

    const triggerTl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        // scrub: true,
        toggleActions: 'restart reverse restart reverse',
        start: 'center bottom',
        end: 'bottom top',
        onToggle: (self) => {
          setInView(self.isActive);
        },
      },
    });

    setTriggerRef(triggerTl);

    triggerTl
      .fromTo(
        ref.current,
        {
          autoAlpha: 0,
          yPercent: 50,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.5,
        },
      )
      .fromTo(
        image,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.5,
          delay: -0.25,
        },
      )
      .fromTo(
        [title, link, descr, phone],
        {
          autoAlpha: 0,
          yPercent: 100,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.5,
          stagger: 0.25,
          delay: -0.25,
        },
      );

    return () => {
      triggerTl.kill();
    };
  }, [ref.current]);

  // stageTl
  useGSAP(() => {
    const stageTl = gsap.timeline();

    if (stage === 'leaving' && prevStage === 'none') {
      triggerRef?.kill();
      if (inView) {
        stageTl.to(ref.current, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power1.inOut',
        });
      }
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage, readyState, triggerRef, inView]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default BannerAnimations;
