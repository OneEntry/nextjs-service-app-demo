'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { FC } from 'react';
import { useRef } from 'react';

import { useAppSelector } from '@/app/store/hooks';

import LogoIcon from './LogoIcon';

/**
 * Loader
 */
const Loader: FC<{ className: string }> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // Loading animations
  useGSAP(() => {
    if (!ref.current || !readyState) {
      return;
    }

    // Paths
    const beautyPaths = ref.current.querySelectorAll('.beauty');
    const salonPaths = ref.current.querySelectorAll('.salon');

    // timelines
    const loaderTl = gsap.timeline({
      id: 'loaderTl',
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });

    // set paths attrs
    [...beautyPaths, ...salonPaths].map((path) => {
      const length = (path as SVGPathElement).getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    // beautyPaths
    loaderTl
      .to([...beautyPaths], {
        strokeDashoffset: 0,
        duration: 0.65,
        stagger: 0.15,
      })
      .to(
        [...salonPaths],
        {
          strokeDashoffset: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        '-=0.25',
      );

    loaderTl.play();

    return () => {
      loaderTl.kill();
    };
  }, [ref.current, readyState]);

  return (
    <div
      ref={ref}
      className={
        'w-full overflow-hidden flex justify-center items-center ' + className
      }
    >
      <LogoIcon className={''} fill={'none'} stroke={'#292A2C'} />
    </div>
  );
};

export default Loader;
