/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import type { IAttributes } from 'oneentry/dist/base/utils';
import type { FC, FormEvent, Key } from 'react';
import { useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { logInUser, useGetFormByMarkerQuery } from '@/app/api';
import { useAppSelector } from '@/app/store/hooks';
import { AuthContext } from '@/app/store/providers/AuthContext';
import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import type { FormProps } from '@/app/types/global';
import FormAnimations from '@/components/forms/animations/FormAnimations';
import FormFieldAnimations from '@/components/forms/animations/FormFieldAnimations';

import CreateAccountButton from './inputs/CreateAccountButton';
import ErrorMessage from './inputs/ErrorMessage';
import FormInput from './inputs/FormInput';
import FormSubmitButton from './inputs/FormSubmitButton';
import ResetPasswordButton from './inputs/ResetPasswordButton';

/**
 * SignIn form
 * @param dict dictionary from server api
 * @returns SignIn form
 */
const SignInForm: FC<FormProps> = ({ dict }) => {
  const { authenticate } = useContext(AuthContext);
  const { setOpen } = useContext(OpenDrawerContext);

  const [tab, setTab] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    reset_password_text,
    forgot_password_text,
    create_account_text,
    sign_in_text,
    email_text,
    phone_text,
  } = dict;

  // Get form by marker with RTK
  const { data, isLoading } = useGetFormByMarkerQuery({ marker: 'reg' });

  // get fields from formFieldsReducer
  const { email_reg, password_reg } = useAppSelector(
    (state) => state.formFieldsReducer.fields,
  );

  // sort fields by position
  const formFields = useMemo(
    () =>
      data?.attributes
        .slice()
        .sort(
          (a: { position: number }, b: { position: number }) =>
            a.position - b.position,
        ),
    [data],
  );

  // SignIn with API AuthProvider
  const onSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email_reg || !password_reg) return;

    try {
      setLoading(true);
      const result = await logInUser({
        method: tab,
        login: email_reg.value,
        password: password_reg.value,
      });

      if (result?.error) {
        throw new Error(
          result.error.includes('accessToken')
            ? result.error
            : 'User not activated.',
        );
      }

      setOpen(false);
      authenticate();
      setError('');
      toast('You signed in!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAnimations isLoading={isLoading || !formFields}>
      <form
        className="relative mx-auto mb-6 mt-2 box-border flex shrink-0 flex-col gap-3"
        onSubmit={onSignIn}
      >
        <div className="relative box-border flex shrink-0 flex-col gap-2.5">
          <FormFieldAnimations
            index={1}
            className="max-w-full text-xs text-gray-400"
          >
            {['email', 'phone'].map((type) => (
              <button
                key={type}
                onClick={() => setTab(type)}
                className={tab === type ? 'font-bold' : ''}
              >
                {dict[`${type}_text`]?.value}
              </button>
            ))}
          </FormFieldAnimations>
        </div>

        <div className="relative mb-4 box-border flex shrink-0 flex-col gap-4">
          {formFields?.map((field: any, index: number) => {
            if (
              field.marker === `${tab}_reg` ||
              field.marker === 'password_reg'
            ) {
              return <FormInput key={index} index={index + 2} {...field} />;
            }
            return null;
          })}
        </div>

        <FormSubmitButton
          index={5}
          title={sign_in_text?.value}
          isLoading={loading}
        />

        <FormFieldAnimations
          index={6}
          className="mx-auto mb-10 flex justify-between gap-5"
        >
          <div className="w-auto basis-auto text-lg text-gray-400 transition-colors duration-300 hover:text-cyan-400">
            {forgot_password_text?.value}
          </div>
          <ResetPasswordButton title={reset_password_text?.value} />
        </FormFieldAnimations>

        <FormFieldAnimations index={7} className="w-full">
          <CreateAccountButton title={create_account_text?.value} />
        </FormFieldAnimations>

        {error && <ErrorMessage error={error} />}
      </form>
    </FormAnimations>
  );
};

export default SignInForm;
