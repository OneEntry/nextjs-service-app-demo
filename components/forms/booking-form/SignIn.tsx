'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { useContext } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { AuthContext } from '@/app/store/providers/AuthContext';
import { selectTabsState } from '@/app/store/reducers/CartSlice';
import { SignInForm } from '@/components/forms';

import DropdownButton from './DropdownButton';

interface SignInProps {
  dict: IAttributeValues;
}

/**
 * SignIn Component
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
const SignIn: FC<SignInProps> = ({ dict }) => {
  const tabKey = 'signin';
  // Safely extract text value with nullish coalescing operator
  const signText = dict.sign_text?.value ?? 'Sign In';

  // Use selector to get the current tab state
  const { isActive } = useAppSelector((state) =>
    selectTabsState(tabKey, state),
  );

  // Access authentication status from context
  const { isAuth } = useContext(AuthContext);

  // If the user is authenticated, do not render the component
  if (isAuth) return null;

  return (
    <div className="mb-4 flex w-full flex-col items-center">
      <DropdownButton title={signText} tabKey={tabKey} />
      {isActive && (
        <div className="w-full rounded-3xl bg-white p-8 px-14 max-sm:px-8">
          <SignInForm dict={dict} />
        </div>
      )}
    </div>
  );
};

export default SignIn;
