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
  const ref = useRef<HTMLDivElement>(null);

  return (
    <TransitionRouter
      auto={true}
      leave={(next) => {
        if (!ref.current) {
          return;
        }
        const tl = gsap
          .timeline({
            duration: 0.85,
          })
          // .to(ref.current, {
          //   height: ref.current.clientHeight,
          //   duration: 0.5,
          // })
          .set(window, {
            scrollTo: 0,
          })
          .call(next, undefined, 0.85);
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
            height: ref.current.clientHeight,
          })
          .to(ref.current, {
            height: 'auto',
            duration: 0.85,
          })
          .call(next, undefined, 0.85);

        return () => {
          tl.kill();
        };
      }}
    >
      <div
        ref={ref}
        className="relative flex flex-col grow justify-between transition-transform duration-500"
      >
        {children}
      </div>
    </TransitionRouter>
  );
}
