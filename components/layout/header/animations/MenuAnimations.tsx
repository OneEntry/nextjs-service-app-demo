'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';

interface MenuAnimationsProps {
  children: ReactNode;
  className: string;
}

const MenuAnimations: FC<MenuAnimationsProps> = ({ children, className }) => {
  const ref = useRef<HTMLUListElement>(null);
  // const [state, setState] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(false);
  // const [isHover, setHover] = useState(false);

  // useGSAP(() => {
  //   const currentRef = ref.current;
  //   if (!currentRef) {
  //     return;
  //   }
  //   const parentNode = currentRef.parentNode;

  //   const handleMouseEnter = () => {
  //     if (!isAnimating) {
  //       setState(true);
  //     }
  //   };

  //   const handleMouseLeave = () => {
  //     if (!isAnimating && !isHover) {
  //       setState(false);
  //     }
  //   };

  //   const handleSubmenuEnter = () => {
  //     setHover(true);
  //   };

  //   const handleSubmenuLeave = () => {
  //     if (!isAnimating) {
  //       setState(false);
  //       setHover(false);
  //     }
  //   };

  //   if (parentNode) {
  //     parentNode.addEventListener('mouseenter', handleMouseEnter);
  //     parentNode.addEventListener('mouseleave', handleMouseLeave);
  //     parentNode.addEventListener('click', handleMouseLeave);
  //   }
  //   currentRef.addEventListener('mouseleave', handleSubmenuEnter);
  //   currentRef.addEventListener('mouseleave', handleSubmenuLeave);

  //   return () => {
  //     if (parentNode) {
  //       parentNode.removeEventListener('mouseenter', handleMouseEnter);
  //       parentNode.removeEventListener('mouseleave', handleMouseLeave);
  //       parentNode.removeEventListener('click', handleMouseLeave);
  //     }
  //     currentRef.removeEventListener('mouseleave', handleSubmenuEnter);
  //     currentRef.removeEventListener('mouseleave', handleSubmenuLeave);
  //   };
  // }, [isAnimating]);

  // useGSAP(() => {
  //   const currentRef = ref.current;
  //   if (!currentRef) return;

  //   const items = currentRef.querySelectorAll('.menu-item');

  //   const stateTl = gsap.timeline({
  //     paused: true,
  //     onStart: () => setIsAnimating(true),
  //     onComplete: () => {
  //       setTimeout(() => setIsAnimating(false), 300);
  //     },
  //     onReverseComplete: () => setIsAnimating(false),
  //   });

  //   stateTl
  //     .from(currentRef, { autoAlpha: 0, height: 0 })
  //     .to(currentRef, { autoAlpha: 1, height: 'auto', duration: 0.25 })
  //     .fromTo(
  //       items,
  //       { autoAlpha: 0 },
  //       { autoAlpha: 1, stagger: 0.025, duration: 0.25, delay: -0.2 },
  //     );

  //   if (state) {
  //     stateTl.play();
  //   } else {
  //     stateTl.reverse(1);
  //   }

  //   return () => stateTl.kill();
  // }, [state]);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
};

export default MenuAnimations;
