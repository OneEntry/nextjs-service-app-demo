'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

import LogoIcon from '@/components/shared/LogoIcon';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setReadyState } from '../store/reducers/AnimationsSlice';

/**
 * Intro animations
 *
 * @returns JSX.Element with animated ref
 */
const IntroAnimations = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // Intro animations
  useGSAP(() => {
    if (!ref.current || readyState) {
      return;
    }

    // Paths
    const beautyPaths = ref.current.querySelectorAll('.beauty');
    const salonPaths = ref.current.querySelectorAll('.salon');
    const introPaths = ref.current.querySelectorAll('#intro_mask path');

    gsap.set(document.body, {
      overflow: 'hidden',
    });

    // timelines
    const introTl = gsap.timeline({
      id: 'introTl',
      paused: true,
    });
    const loaderTl = gsap.timeline({
      id: 'introLoaderTl',
      smoothChildTiming: true,
    });
    const beautyTl = gsap.timeline({
      id: 'introBeautyTl',
      delay: -1,
      smoothChildTiming: true,
    });
    const salonTl = gsap.timeline({
      id: 'introSalonTl',
      delay: -0.25,
      smoothChildTiming: true,
      onComplete: () => {
        gsap.to(ref.current, {
          autoAlpha: 0,
        });
        gsap.to(document.body, {
          overflow: 'auto',
        });
        dispatch(setReadyState({ value: true }));
      },
    });
    const fadeTl = gsap.timeline({
      id: 'introFadeTl',
    });

    loaderTl
      .to(introPaths, {
        duration: 0.8,
        attr: { d: 'M0 502S175 272 500 272s500 230 500 230V0H0Z' },
        ease: 'power2.in',
      })
      .to(introPaths, {
        duration: 0.8,
        attr: { d: 'M0 2S175 1 500 1s500 1 500 1V0H0Z' },
        ease: 'power2.out',
      });

    // set paths state
    [...beautyPaths, ...salonPaths].map((path) => {
      const length = (path as SVGPathElement).getTotalLength();

      gsap.set(path, {
        fill: 'none',
        stroke: '#ffffff',
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // beautyPaths
    beautyTl
      .set([...beautyPaths], {
        stroke: '#292A2C',
      })
      .to([...beautyPaths], {
        strokeDashoffset: 0,
        duration: 0.5,
        stagger: 0.1,
      })
      .to([...beautyPaths], {
        fill: '#292A2C',
        stroke: 'none',
        duration: 0.5,
      });

    // salonPaths
    salonTl
      .set([...salonPaths], {
        stroke: '#292A2C',
      })
      .to([...salonPaths], {
        strokeDashoffset: 0,
        duration: 0.5,
        stagger: 0.1,
      })
      .to([...salonPaths], {
        fill: '#292A2C',
        stroke: 'none',
        duration: 0.5,
      });

    // fade-in
    fadeTl
      .set('.fade-in', {
        autoAlpha: 0,
      })
      .to(ref.current, {
        autoAlpha: 0,
        display: 'none',
        duration: 0.5,
      })
      .to('.fade-in', {
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.1,
      });

    introTl.add(loaderTl).add(beautyTl).add(salonTl).add(fadeTl).play();

    return () => {
      fadeTl.kill();
      loaderTl.kill();
      beautyTl.kill();
      salonTl.kill();
      introTl.kill();
    };
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="intro z-500 fixed left-0 top-0 size-full bg-white"
      >
        <svg id="intro_mask" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            fill="#f33de2"
            className="mask_path"
            d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
          />
        </svg>
        <div id="logo_wrapper" className="w-full">
          <LogoIcon
            className={'overflow-hidden max-w-[180px] fixed z-50'}
            fill={'none'}
            stroke={'#ffffff'}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroAnimations;
