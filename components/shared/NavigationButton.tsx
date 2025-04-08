import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useRef } from 'react';

import ArrowLeftIcon from '@/components/icons/arrow-left';
import ArrowRightIcon from '@/components/icons/arrow-right';

interface NavigationButtonProps {
  direction: 'left' | 'right';
}

/**
 * Carousel navigation button
 *
 * @param direction - left|right
 *
 * @returns icon for button
 */
// eslint-disable-next-line react/prop-types
const NavigationButton: React.FC<NavigationButtonProps> = ({ direction }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) {
      return;
    }

    const tl = gsap.timeline({
      id: 'carouselTriggerTl',
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        // scrub: 3,
        toggleActions: 'play reverse restart reverse',
        start: 'top bottom',
        end: 'bottom top',
        invalidateOnRefresh: true,
        // markers: true,
      },
      delay: 1,
    });

    tl.fromTo(
      ref.current,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      },
    );

    return () => {
      tl.kill();
    };
  }, []);

  return direction === 'left' ? (
    <ArrowLeftIcon ref={ref} />
  ) : (
    <ArrowRightIcon ref={ref} />
  );
};

export default NavigationButton;
