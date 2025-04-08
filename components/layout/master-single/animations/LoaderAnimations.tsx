'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';

interface MasterAnimationsProps {
  children: ReactNode;
  className: string;
}

/**
 * LoaderAnimations animations
 * @param children children ReactNode
 * @param className card wrapper className
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const LoaderAnimations: FC<MasterAnimationsProps> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // stage tl
  useGSAP(() => {
    if (!ref.current) {
      return;
    }
    const items = ref.current?.querySelectorAll('.item') || [];

    const stageTl = gsap.timeline();

    stageTl.fromTo(
      [...items],
      {
        autoAlpha: 0,
        scaleX: 0,
        transformOrigin: 'left center',
      },
      {
        autoAlpha: 1,
        scaleX: 1,
        duration: 0.35,
        stagger: 0.1,
      },
    );

    return () => {
      stageTl.kill();
    };
  }, [ref.current]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default LoaderAnimations;
