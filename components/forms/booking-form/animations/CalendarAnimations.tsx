'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { FC, ReactNode } from 'react';
import { useRef } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { selectTabsState } from '@/app/store/reducers/CartSlice';

interface CalendarAnimationsProps {
  children: ReactNode;
  className: string;
  tabKey: string;
}

/**
 * Calendar animations
 * @param children children ReactNode
 * @param className CSS className of ref element
 *
 * @returns Calendar animations
 */
const CalendarAnimations: FC<CalendarAnimationsProps> = ({
  children,
  className,
  tabKey,
}) => {
  // const { stage } = useTransitionState();
  const ref = useRef(null);
  // const [prevStage, setPrevStage] = useState('');
  // const [inView, setInView] = useState<boolean>(false);
  // const [triggerRef, setTriggerRef] = useState<gsap.core.Timeline>();

  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // get the current tab state
  const { isActive } = useAppSelector((state) =>
    selectTabsState(tabKey, state),
  );

  // Form transition animations
  useGSAP(() => {
    if (!readyState) {
      return;
    }

    const tl = gsap.timeline({
      paused: true,
    });

    tl.fromTo(
      [
        '.react-calendar__month-view__weekdays__weekday abbr',
        '.react-calendar button',
      ],
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        delay: 0.15,
        stagger: 0.01,
      },
    );

    if (isActive) {
      tl.play();
    }

    if (!isActive) {
      tl.reverse(3);
    }

    return () => {
      tl.kill();
    };
  }, [isActive, readyState]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default CalendarAnimations;
