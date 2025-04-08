'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { useContext } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';

/**
 * SignIn button - open SignIn form
 * @param dict dictionary from server api
 * @returns SignIn button
 */
const SignInButton: FC<{ dict: IAttributeValues }> = ({ dict }) => {
  const { setOpen, setComponent } = useContext(OpenDrawerContext);
  const { log_in_text } = dict;

  return (
    <button
      onClick={() => {
        setOpen(true);
        setComponent('SignInForm');
      }}
      type="button"
      className="mx-auto w-auto items-center justify-center rounded-[30px] border border-solid border-fuchsia-500 bg-transparent px-3.5 py-1 text-base font-bold uppercase tracking-wide text-fuchsia-500 transition-colors duration-300 hover:border-fuchsia-600 hover:text-fuchsia-600 focus-visible:text-fuchsia-600 focus-visible:outline-fuchsia-600 disabled:border-neutral-300 disabled:bg-[#a8a9b580] disabled:text-neutral-300"
    >
      {log_in_text?.value}
    </button>
  );
};

export default SignInButton;
