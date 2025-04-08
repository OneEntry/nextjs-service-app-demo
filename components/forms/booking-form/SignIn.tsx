'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { useContext } from 'react';

import { AuthContext } from '@/app/store/providers/AuthContext';
import { SignInForm } from '@/components/forms';

import DropdownAnimations from './animations/DropdownAnimations';
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

  // Access authentication status from context
  const { isAuth } = useContext(AuthContext);

  // If the user is authenticated, do not render the component
  if (isAuth) return null;

  return (
    <DropdownAnimations
      className="mb-4 flex w-full flex-col items-center"
      id={tabKey}
      index={5}
      tabKey={tabKey}
    >
      <DropdownButton title={signText} tabKey={tabKey} />
      <div className="dropdown-container w-full rounded-3xl bg-white">
        <SignInForm
          className={'p-8 px-14 max-sm:px-8'}
          dict={dict}
          isActive={false}
        />
      </div>
    </DropdownAnimations>
  );
};

export default SignIn;
