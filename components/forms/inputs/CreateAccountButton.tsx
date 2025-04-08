'use client';

import type { FC } from 'react';
import { useContext } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';

interface CreateAccountButtonProps {
  title: string;
}

/**
 * Create account button
 * @param title
 *
 * @returns Create account button
 */
const CreateAccountButton: FC<CreateAccountButtonProps> = ({ title }) => {
  const { setOpen, setComponent } = useContext(OpenDrawerContext);

  return (
    <button
      onClick={() => {
        setOpen(true);
        setComponent('SignUpForm');
      }}
      type="button"
      className="w-full items-center justify-center rounded-[30px] border border-solid border-fuchsia-500 bg-transparent px-10 py-4 text-xl font-bold uppercase tracking-wide text-fuchsia-500 transition-colors duration-300 hover:border-fuchsia-600 hover:text-fuchsia-600 focus-visible:text-fuchsia-600 focus-visible:outline-fuchsia-600 disabled:border-neutral-300 disabled:text-neutral-300 max-sm:px-5"
    >
      {title}
    </button>
  );
};

export default CreateAccountButton;
