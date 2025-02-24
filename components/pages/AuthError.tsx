'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import SignInButton from '../shared/SignInButton';

/**
 * AuthError page
 * @param dict
 *
 * @returns AuthError page
 */
const AuthError: FC<{ dict: IAttributeValues }> = ({ dict }) => {
  // const { auth_required_text } = dict;

  return (
    <div className="flex w-full flex-col items-center px-5 py-24">
      <h1 className="mb-6 text-6xl text-slate-700">401</h1>
      <p className="mb-6 text-2xl text-slate-700">
        {/* {auth_required_text?.value} */}
        ERROR
      </p>
      <SignInButton dict={dict} />
    </div>
  );
};

export default AuthError;
