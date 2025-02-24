'use client';

import type { FC } from 'react';
import { useContext } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';

/**
 * Reset password button
 * @param title button title
 * @returns Reset password button
 */
const ResetPasswordButton: FC<{
  title: string;
}> = ({ title }) => {
  const { setOpen, setComponent } = useContext(OpenDrawerContext);

  return (
    <button
      onClick={() => {
        setOpen(true);
        setComponent('ForgotPasswordForm');
      }}
      type="button"
      className="w-auto text-lg font-bold text-cyan-400 underline"
    >
      {title}
    </button>
  );
};

export default ResetPasswordButton;
