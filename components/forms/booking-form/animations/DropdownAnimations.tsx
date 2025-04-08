'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { selectTabsState } from '@/app/store/reducers/CartSlice';

interface DropdownAnimationsProps {
  children: ReactNode;
  className: string;
  id: string;
  index: number;
  tabKey: string;
}

/**
 * DropdownAnimations
 * @param children children ReactNode
 * @param className CSS className of ref element
 *
 * @returns DropdownAnimations
 */
const DropdownAnimations: FC<DropdownAnimationsProps> = ({
  children,
  className,
  id,
  index,
  tabKey,
}) => {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLDivElement>(null);
  const [prevStage, setPrevStage] = useState<string>('');

  // get the current tab state
  const { isActive } = useAppSelector((state) =>
    selectTabsState(tabKey, state),
  );

  // stageTl
  useGSAP(() => {
    const stageTl = gsap.timeline({
      paused: true,
    });

    // leaving stage
    if (stage === 'leaving' && prevStage === 'none') {
      stageTl
        .to(ref.current, {
          autoAlpha: 0,
          duration: 0.25,
          delay: index / 10,
        })
        .play();
    }

    setPrevStage(stage);

    return () => {
      stageTl.kill();
    };
  }, [stage]);

  // toggle state transitions
  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
    });

    const container =
      ref.current?.querySelectorAll('.dropdown-container') || [];
    const items = ref.current?.querySelectorAll('.dropdown-item') || [];

    if (container) {
      tl.fromTo(
        container,
        {
          height: 0,
        },
        {
          height: 'auto',
          duration: 0.5,
        },
      );
    }
    if (items) {
      tl.fromTo(
        items,
        {
          autoAlpha: 0,
          yPercent: 10,
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.5,
          stagger: 0.05,
        },
      );
    }

    if (isActive) {
      tl.play();
    }
    if (!isActive && prevStage !== '') {
      tl.reverse(3);
    }

    return () => {
      tl.kill();
    };
  }, [isActive]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
};

export default DropdownAnimations;
