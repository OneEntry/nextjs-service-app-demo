'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { ReactNode } from 'react';
import { useRef } from 'react';

const ReviewsAnimations = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) {
      return;
    }
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'restart reverse restart reverse',
        start: 'top bottom',
        end: 'bottom top',
        // markers: true,
      },
    });

    const arrows = ref.current.querySelectorAll('.arrow');
    const items = ref.current.querySelectorAll('.slide');

    if (arrows) {
      tl.fromTo(
        arrows,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.25,
        },
      );
    }

    if (items) {
      tl.fromTo(
        items,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.15,
        },
      );
    }

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

export default ReviewsAnimations;
