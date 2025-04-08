'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { ReactNode, RefObject } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

const HeroAnimations = ({
  children,
  className,
  titleRef,
  descrRef,
  buttonRef,
  bgRef,
}: {
  children: ReactNode;
  className: string;
  titleRef?: RefObject<null>;
  descrRef?: RefObject<null>;
  buttonRef?: RefObject<null>;
  bgRef?: RefObject<null>;
}) => {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLDivElement>(null);
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );
  const [backTl, setBackTl] = useState<gsap.core.Timeline>();
  const [triggerTl, setTriggerTl] = useState<gsap.core.Timeline>();
  const [prevStage, setPrevStage] = useState<string>('');

  // triggerTl animations
  useGSAP(() => {
    if (!ref.current) {
      return;
    }

    // bgTl
    const bgTl = gsap.timeline({
      id: 'heroBgTl',
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        scrub: 5,
        toggleActions: 'play reverse restart reverse',
        start: '10% top',
        end: 'bottom center',
        // markers: true,
      },
    });
    // triggerTl
    const triggerTl = gsap.timeline({
      id: 'heroTriggerTl',
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        scrub: 3,
        toggleActions: 'play reverse restart reverse',
        start: '130px top',
        end: 'bottom center',
        // markers: true,
      },
    });
    setBackTl(bgTl);
    setTriggerTl(triggerTl);
    // triggerTl
    // title
    if (titleRef?.current) {
      triggerTl.fromTo(
        titleRef?.current,
        {
          y: '0',
          autoAlpha: 1,
          scale: 1,
        },
        {
          y: '-5vh',
          autoAlpha: 0.5,
          scale: 1.3,
          ease: 'none',
          duration: 2,
          id: 'title',
        },
      );
    }
    // descr
    if (descrRef?.current) {
      triggerTl.fromTo(
        descrRef?.current,
        {
          y: '0',
          autoAlpha: 1,
          scale: 1,
        },
        {
          y: '-10vh',
          autoAlpha: 0.5,
          scale: 0.8,
          ease: 'none',
          duration: 1.5,
          id: 'descr',
        },
        '-=1.5',
      );
    }
    // button
    if (buttonRef?.current) {
      triggerTl.to(
        buttonRef?.current,
        {
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.inOut',
          id: 'button',
        },
        '-=1.5',
      );
    }
    // bgTl
    if (bgRef?.current) {
      bgTl.fromTo(
        bgRef?.current,
        {
          autoAlpha: 1,
          scale: 1,
        },
        {
          autoAlpha: 0.5,
          scale: 1.2,
          ease: 'none',
          duration: 2,
          delay: 0.25,
          id: 'bg',
        },
      );
    }

    return () => {
      triggerTl.kill();
      bgTl.kill();
    };
  }, []);

  // heroStageTl
  useGSAP(() => {
    if (!ref.current || !readyState) {
      return;
    }

    const heroMask = ref.current.querySelectorAll('#hero_mask path');

    const first = stage === 'none' && prevStage === '';
    const enter = stage === 'entering' && prevStage === 'leaving';
    const leaving = stage === 'leaving' && prevStage === 'none';

    // stageTl
    const stageTl = gsap.timeline({
      id: 'heroStageTl',
      paused: true,
    });

    // loaderTl
    const loaderTl = gsap.timeline({
      id: 'heroLoaderTl',
      paused: true,
      onComplete: () => {
        stageTl.play();
      },
    });

    // if not leaving stage animate normal
    if (!leaving) {
      // bg
      if (bgRef?.current) {
        stageTl.fromTo(
          bgRef.current,
          {
            autoAlpha: 0.5,
            scale: 1.2,
          },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.85,
            id: 'bg',
          },
        );
      }
      // stageTl title
      if (titleRef?.current) {
        stageTl.fromTo(
          titleRef.current,
          {
            autoAlpha: 0,
            y: '-20vh',
          },
          {
            y: '0',
            autoAlpha: 1,
            duration: 0.65,
            id: 'title',
          },
          '-=0.5',
        );
      }
      // stageTl descr
      if (descrRef?.current) {
        stageTl.fromTo(
          descrRef.current,
          {
            autoAlpha: 0,
            y: '-20vh',
          },
          {
            y: '0',
            autoAlpha: 1,
            duration: 0.65,
            id: 'descr',
          },
          '-=0.5',
        );
      }
      // stageTl button
      if (buttonRef?.current) {
        stageTl.fromTo(
          buttonRef.current,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.35,
            ease: 'expo.inOut',
            id: 'button',
          },
          '-=0.5',
        );
      }
    } else {
      // bg
      if (bgRef?.current) {
        stageTl.to(bgRef.current, {
          autoAlpha: 0.5,
          scale: 1.2,
        });
      }
      // title
      if (titleRef?.current) {
        stageTl.to(
          titleRef.current,
          {
            autoAlpha: 0,
            y: '-20vh',
            duration: 0.65,
            id: 'title',
          },
          '-=0.5',
        );
      }
      // stageTl descr
      if (descrRef?.current) {
        stageTl.to(
          descrRef.current,
          {
            autoAlpha: 0,
            y: '-20vh',
          },
          '-=0.5',
        );
      }
      // stageTl button
      if (buttonRef?.current) {
        stageTl.to(
          buttonRef.current,
          {
            autoAlpha: 0,
          },
          '-=0.5',
        );
      }
    }

    // first loading
    if (first) {
      loaderTl
        .to(heroMask, {
          duration: 0.65,
          attr: { d: 'M0 502S175 272 500 272s500 230 500 230V0H0Z' },
          ease: 'power2.in',
        })
        .to(heroMask, {
          duration: 0.65,
          attr: { d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z' },
          ease: 'power2.out',
        })
        .play();
    }
    // enter stage
    else if (enter) {
      loaderTl
        .to(heroMask, {
          duration: 0.65,
          attr: { d: 'M0 502S175 272 500 272s500 230 500 230V0H0Z' },
          ease: 'power2.in',
        })
        .to(heroMask, {
          duration: 0.65,
          attr: { d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z' },
          ease: 'power2.out',
        })
        .play();
    }
    // leaving stage
    else if (leaving) {
      stageTl.play();
      backTl?.kill();
      triggerTl?.kill();

      if (bgRef?.current) {
        stageTl.to([bgRef.current, '.bg-gradient-1'], {
          autoAlpha: 0,
          duration: 0.65,
        });
      }
      loaderTl
        .set(heroMask, {
          attr: { d: 'M0 1005S175 995 500 995s500 5 500 5V0H0Z' },
        })
        .to(heroMask, {
          attr: { d: 'M0 502S175 272 500 272s500 230 500 230V0H0Z' },
          duration: 0.5,
          ease: 'power2.in',
        })
        .to(heroMask, {
          attr: { d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z' },
          duration: 0.5,
          ease: 'power2.out',
        })
        .reverse(1);
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
      loaderTl.kill();
    };
  }, [ref.current, stage, readyState]);

  return (
    <div ref={ref} className={className}>
      <svg id="hero_mask" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path
          fill="#ffffff"
          className="mask_path"
          d="M0 1005S175 995 500 995s500 5 500 5V0H0Z"
        />
      </svg>
      {children}
    </div>
  );
};

export default HeroAnimations;
