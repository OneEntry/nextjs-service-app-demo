'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect } from 'react';

/**
 * Register GSAP plugins
 *
 * @returns void
 */
const RegisterGSAP = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  return null;
};

export default RegisterGSAP;
