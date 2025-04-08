'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { ReactNode } from 'react';
import { useRef } from 'react';

const OffersAnimations = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        // scrub: true,
        toggleActions: 'restart reverse restart reverse',
        start: 'top +=50',
        end: 'center top',
      },
    });

    tl.to(ref?.current, {
      autoAlpha: 0.5,
      duration: 1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default OffersAnimations;
