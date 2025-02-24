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
      className="btn-o btn-o-primary btn-o-lg w-full"
    >
      {title}
    </button>
  );
};

export default CreateAccountButton;
