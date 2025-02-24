'use client';

import { gsap } from 'gsap';
import { TransitionRouter } from 'next-transition-router';
import type { ReactNode } from 'react';
import { useRef } from 'react';

/**
 * Transition provider - main 'stage' transition provider
 *
 * @param children children ReactNode
 * @returns TransitionRouter
 */
export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const ref = useRef(null);
  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        if (!ref.current) {
          return;
        }
        const tl = gsap
          .timeline()
          .to(window, {
            duration: 0.5,
            scrollTo: 0,
          })
          .to(ref.current, {
            height: (ref.current as HTMLDivElement).clientHeight,
            duration: 0.85,
            autoAlpha: 0,
            delay: -0.5,
          })
          .call(next, undefined, 0.75);
        return () => {
          tl.kill();
        };
      }}
      enter={(next) => {
        if (!ref.current) {
          return;
        }
        const tl = gsap
          .timeline()
          .set(ref.current, {
            height: (ref.current as HTMLDivElement).clientHeight,
          })
          .to(ref.current, {
            height: 'auto',
            autoAlpha: 1,
            duration: 0.45,
          })
          .call(next, undefined, 0.5);

        return () => {
          tl.kill();
        };
      }}
    >
      <div
        ref={ref}
        className="relative mt-20 grow transition-transform duration-500 sm:mt-24 lg:mt-32 xl:mt-32 2xl:mt-32"
      >
        {children}
      </div>
    </TransitionRouter>
  );
}
