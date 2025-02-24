/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { ISignUpData } from 'oneentry/dist/auth-provider/authProvidersInterfaces';
import type { IAttributes } from 'oneentry/dist/base/utils';
import type { FC, FormEvent } from 'react';
import { useCallback, useContext, useMemo, useState } from 'react';

import { api, logInUser, useGetFormByMarkerQuery } from '@/app/api';
import { useAppSelector } from '@/app/store/hooks';
import { AuthContext } from '@/app/store/providers/AuthContext';
import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import type { FormProps } from '@/app/types/global';
import FormAnimations from '@/components/forms/animations/FormAnimations';
import { typeError } from '@/components/utils';

import ErrorMessage from './inputs/ErrorMessage';
import FormInput from './inputs/FormInput';
import SubmitButton from './inputs/FormSubmitButton';

/**
 * SignUp form
 * @param dict dictionary from server api
 * @returns SignUp form
 */
const SignUpForm: FC<FormProps> = ({ dict }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { authenticate } = useContext(AuthContext);
  const { setOpen, setComponent, setAction } = useContext(OpenDrawerContext);

  const { sign_up_text, sign_in_text, create_account_desc } = dict;

  // Get form by marker with RTK
  const { data, isLoading } = useGetFormByMarkerQuery({ marker: 'reg' });

  // Get fields from formFieldsReducer
  const fields = useAppSelector((state) => state.formFieldsReducer.fields);

  // Memoized form fields for better performance
  const formFields = useMemo(
    () => ['email_reg', 'name_reg', 'phone_reg', 'password_reg'],
    [],
  );

  // Check if user can submit form
  const canSubmit = useMemo(
    () => formFields.every((field) => fields[field]?.valid),
    [fields, formFields],
  );

  // Prepare formData
  const formData = useMemo(
    () =>
      formFields.map((field) => ({
        marker: field,
        type: 'string',
        value: fields[field]?.value || '',
      })),
    [fields, formFields],
  );

  // Handle sign up
  const onSignUp = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!canSubmit) return;

      const data: ISignUpData = {
        formIdentifier: 'reg',
        authData: [
          { marker: 'email_reg', value: fields.email_reg.value },
          { marker: 'password_reg', value: fields.password_reg.value },
        ],
        formData,
        notificationData: {
          email: fields.email_reg.value,
          phonePush: [fields.phone_reg.value],
          phoneSMS: fields.phone_reg.value,
        },
      };

      setLoading(true);

      try {
        const res = await api.AuthProvider.signUp('email', data);

        if (res?.isActive) {
          await logInUser({
            method: 'email',
            login: res.identifier,
            password: fields.password_reg.value,
          });
          authenticate();
          setOpen(false);
        } else if (res && (!res.isActive || typeError(res))) {
          setOpen(true);
          setComponent('VerificationForm');
          setAction('activateUser');
        }

        setError(typeError(res) ? `Error ${res.status}` : '');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields, formData, canSubmit],
  );

  return (
    <FormAnimations isLoading={isLoading}>
      <form
        onSubmit={onSignUp}
        className="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-4 text-xl leading-5"
      >
        <div className="relative box-border flex shrink-0 flex-col gap-2.5">
          <p className="text-xs text-gray-400 max-md:max-w-full">
            <button
              onClick={() => setComponent('SignInForm')}
              className="underline"
            >
              {sign_in_text?.value}
            </button>{' '}
            {create_account_desc?.value}
          </p>
        </div>

        <div className="relative mb-4 box-border flex shrink-0 flex-col gap-4">
          {data?.attributes.map(
            (field: IAttributes, index: number) =>
              field.marker !== 'email_notification_reg' && (
                <FormInput key={index} index={index} {...field} />
              ),
          )}
        </div>
        <SubmitButton
          title={sign_up_text?.value}
          isLoading={loading || isLoading}
          index={10}
        />
        {error && <ErrorMessage error={error} />}
      </form>
    </FormAnimations>
  );
};

export default SignUpForm;
