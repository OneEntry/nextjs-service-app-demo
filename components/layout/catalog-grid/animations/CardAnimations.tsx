'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useTransitionState } from 'next-transition-router';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';

interface CardAnimationsProps {
  children: ReactNode;
  className: string;
  index: number;
  style?: React.CSSProperties;
}

const addGroupClass = (element: HTMLDivElement | null) => {
  element?.classList.add('group');
};

/**
 * Card animations
 *
 * @param children - children ReactNode
 * @param className - card wrapper className
 * @param index - index of element in array for stagger
 * @param style -
 * @see {@link https://gsap.com/cheatsheet/ gsap cheatsheet}
 * @returns card with animations
 */
const CardAnimations: FC<CardAnimationsProps> = ({
  children,
  className,
  index,
  style,
}) => {
  const { stage } = useTransitionState();
  const ref = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [prevStage, setPrevStage] = useState('');
  const [inView, setInView] = useState<boolean>(false);
  const [triggerRef, setTriggerRef] = useState<gsap.core.Timeline>();

  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  // triggerTl
  useGSAP(() => {
    if (!readyState || !circleRef.current) return;

    const triggerTl = gsap.timeline({
      id: 'CatalogCardTriggerTl',
      paused: true,
      scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'restart reverse restart reverse',
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => setInView(self.isActive),
      },
      onComplete: () => addGroupClass(ref.current),
      onReverseComplete: () => addGroupClass(ref.current),
    });

    setTriggerRef(triggerTl);

    const paths = ref.current?.querySelectorAll('path') || [];
    const title = ref.current?.querySelectorAll('.title span') || [];

    [...paths].forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        fill: 'none',
        stroke: '#525252',
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    const circleLength = Math.round(circleRef.current.getTotalLength());
    triggerTl
      .set(title, { autoAlpha: 0, xPercent: 100 })
      .set(circleRef.current, {
        strokeDashoffset: circleLength,
        strokeDasharray: circleLength,
      })
      .fromTo(
        ref.current,
        { autoAlpha: 0, scale: 0, yPercent: 50 },
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
          delay: index / 10,
          duration: 0.85,
        },
      )
      .to([circleRef.current, paths], {
        strokeDashoffset: 0,
        duration: 1.25,
        delay: index / 10,
      })
      .to(
        paths,
        { stroke: 'none', fill: '#525252', delay: -index / 10 },
        '-=0.85',
      )
      .to(
        title,
        { autoAlpha: 1, xPercent: 0, delay: -0.5, duration: 1, stagger: 0.1 },
        '-=0.45',
      )
      .set(paths, { clearProps: 'fill, stroke' });

    return () => triggerTl.kill();
  }, [readyState]);

  // stageTl
  useGSAP(() => {
    const stageTl = gsap.timeline({
      id: 'CatalogCardStageTl',
      onComplete: () => addGroupClass(ref.current),
    });

    if (stage === 'leaving' && prevStage === 'none') {
      triggerRef?.kill();
      if (inView && circleRef.current) {
        const circleLength = Math.round(circleRef.current.getTotalLength());
        stageTl
          .set(circleRef.current, {
            strokeDashoffset: 0,
            strokeDasharray: circleLength,
          })
          .to(circleRef.current, {
            strokeDashoffset: circleLength,
            duration: 0.65,
            delay: index / 10,
          })
          .to(ref.current, {
            scale: 0,
            autoAlpha: 0,
            duration: 0.5,
            delay: -0.35,
          });
      }
    }

    setPrevStage(stage);

    return () => stageTl.kill();
  }, [stage, readyState, triggerRef, inView]);

  return (
    <div className={className} style={style} ref={ref}>
      {children}
      <svg
        width="230"
        height="230"
        viewBox="0 0 230 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 max-w-full h-auto z-0 stroke-[#525252] group-hover:stroke-fuchsia-500"
      >
        <circle ref={circleRef} cx="115" cy="115" r="114" />
      </svg>
    </div>
  );
};

export default CardAnimations;
