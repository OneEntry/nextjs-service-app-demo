'use client';

import { useContext } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';

/**
 * Mobile menu trigger button
 * @returns JSX.Element representing a mobile menu trigger button
 */
const MobileMenuTrigger = () => {
  const { setOpen, setComponent } = useContext(OpenDrawerContext);

  const handleClick = () => {
    setOpen(true);
    setComponent('MobileMenu');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Open menu"
      className="flex size-10 flex-col items-center justify-center gap-1 rounded-md transition-colors lg:hidden"
    >
      {[...Array(3)].map((_, index) => (
        <span key={index} className="block h-0.5 w-8 bg-gray-600"></span>
      ))}
    </button>
  );
};

export default MobileMenuTrigger;
