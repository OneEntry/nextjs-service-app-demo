/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGSAP } from '@gsap/react';
import { useTransitionState } from 'next-transition-router';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ResizeObserver } from 'resize-observer';

import { useAppSelector } from '../store/hooks';

export const resizer = () => {
  if (typeof window !== 'undefined') {
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (ScrollTrigger) {
      ScrollTrigger.refresh(true);
      ScrollTrigger.normalizeScroll(true);
    }
  }
};

const resizeObserver = new ResizeObserver(() => {
  resizer();
});

/**
 * SmoothScroll component
 */
const SmoothScroll = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { stage } = useTransitionState();
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  const readyState = useAppSelector(
    (state) => state.animationsSlice.readyState,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const r = content.current && resizeObserver.observe(content.current);

  useGSAP(() => {
    if (!viewport.current || !content.current || !readyState || !isClient) {
      return;
    }

    const initSmoothScroll = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

      gsap.registerPlugin(ScrollTrigger);

      const smoothOnScroll = (
        viewport: any,
        content: any,
        smoothness: number,
      ) => {
        content = gsap.utils.toArray(content)[0];

        gsap.set(viewport, {
          overflow: 'hidden',
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        });
        gsap.set(content, {
          overflow: 'visible',
          width: '100%',
        });

        const getProp = gsap.getProperty(content);
        const setProp = gsap.quickSetter(content, 'y', 'px');
        const setScroll = ScrollTrigger.getScrollFunc(window);
        const removeScroll = () => (content.style.overflow = 'visible');
        const killScrub = (trigger: globalThis.ScrollTrigger) => {
          const scrub = trigger.getTween
            ? trigger.getTween()
            : trigger.animation && gsap.getTweensOf(trigger.animation)[0];
          scrub?.pause();
          trigger.animation?.progress(trigger.progress);
        };
        let height: number;
        let isProxyScrolling: boolean;

        function refreshHeight() {
          height = content.clientHeight;
          content.style.overflow = 'visible';
          document.body.style.height = height + 'px';
          return height - document.documentElement.clientHeight;
        }

        ScrollTrigger.addEventListener('refresh', () => {
          removeScroll();
          requestAnimationFrame(removeScroll);
        });
        ScrollTrigger.defaults({
          scroller: content,
        });
        ScrollTrigger.prototype.update = (p) => p;
        ScrollTrigger.scrollerProxy(content, {
          scrollTop(value) {
            if (arguments.length && value) {
              isProxyScrolling = true;
              setProp(-value);
              setScroll(value);
              return;
            }
            return -getProp('y');
          },
          scrollHeight: () => document.body.scrollHeight,
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
        });

        return ScrollTrigger.create({
          id: 'smoothScroll',
          animation: gsap.fromTo(
            content,
            {
              y: 0,
            },
            {
              y: () => document.documentElement.clientHeight - height,
              ease: 'none',
              onUpdate: ScrollTrigger.update,
            },
          ),
          scroller: window,
          invalidateOnRefresh: true,
          start: 0,
          end: refreshHeight,
          refreshPriority: -999,
          scrub: smoothness,
          onUpdate: (self) => {
            if (isProxyScrolling) {
              killScrub(self);
              isProxyScrolling = false;
            }
          },
          onRefresh: killScrub,
        });
      };

      window.addEventListener('resize', () => resizer());
      window.addEventListener('orientationchange', () => resizer());

      const st = smoothOnScroll(viewport.current, content.current, 2);

      return () => {
        st.kill();
        window.removeEventListener('resize', () => resizer());
        window.removeEventListener('orientationchange', () => resizer());
        resizeObserver.unobserve(content.current as HTMLDivElement);
      };
    };

    initSmoothScroll();
  }, [viewport, content, stage, readyState, r, isClient]);

  return (
    <div id="viewport" ref={viewport}>
      <div id="content" ref={content}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;
