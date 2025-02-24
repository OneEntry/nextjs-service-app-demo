'use client';

import type { FC } from 'react';
import { useContext } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';

/**
 * Close modal button
 *
 * @returns Close modal button
 */
const CloseModal: FC = () => {
  const { setTransition } = useContext(OpenDrawerContext);

  return (
    <button
      onClick={() => setTransition('close')}
      className="flex size-[50px] items-center justify-center rounded-full border border-solid border-white transition-transform hover:rotate-180"
      aria-label="Close"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.21 1.23a1.6 1.6 0 012.24 0l5.54 5.55 5.54-5.55a1.6 1.6 0 112.26 2.24L11.23 9.02l5.54 5.54a1.6 1.6 0 01-2.24 2.26l-5.54-5.54-5.54 5.54a1.6 1.6 0 01-2.26-2.24l5.54-5.54-5.54-5.54a1.6 1.6 0 010-2.24z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
      </svg>
    </button>
  );
};

export default CloseModal;
