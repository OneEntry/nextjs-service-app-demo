/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { FC, FormEvent } from 'react';
import React, { useContext, useState } from 'react';

import { api } from '@/app/api';
import { useAppSelector } from '@/app/store/hooks';
import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import type { FormProps } from '@/app/types/global';
import FormAnimations from '@/components/forms/animations/FormAnimations';

import ErrorMessage from './inputs/ErrorMessage';
import FormInput from './inputs/FormInput';
import FormSubmitButton from './inputs/FormSubmitButton';

export const resetPasswordFormFields = [
  {
    fieldType: 'password',
    isVisible: true,
    localizeInfos: { title: 'Password' },
    placeholder: '•••••',
    marker: 'password_reg',
    required: true,
  },
  {
    fieldType: 'password',
    isVisible: true,
    localizeInfos: { title: 'Confirm password' },
    placeholder: '•••••',
    marker: 'password_confirm',
    required: true,
  },
];

/**
 * Reset password form
 * @param dict dictionary from server api
 * @returns Reset password form
 */
const ResetPasswordForm: FC<FormProps> = ({ dict }) => {
  const { email_reg, password_reg, password_confirm, otp_code } =
    useAppSelector((state) => state.formFieldsReducer.fields);
  const { setComponent, setAction } = useContext(OpenDrawerContext);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');

  const { new_password_desc, change_password_text } = dict;

  /**
   * Change password with API AuthProvider
   * @param e FormEvent
   */
  const onResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await api.AuthProvider.changePassword(
        'email',
        email_reg.value,
        1,
        otp_code.value.toString(),
        password_reg.value,
        password_confirm.value,
      );

      if (result) {
        setComponent('SignInForm');
        setAction('');
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormAnimations isLoading={isLoading}>
      <form
        name="resetPasswordForm"
        className="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-4 text-xl leading-5"
        onSubmit={onResetSubmit}
      >
        <div className="relative box-border flex shrink-0 flex-col gap-2.5">
          <p className="max-w-full text-xs text-gray-400">
            {new_password_desc?.value}
          </p>
        </div>
        <div className="relative mb-8 box-border flex shrink-0 flex-col gap-4">
          {resetPasswordFormFields.map((field, index) => (
            <FormInput
              key={index}
              index={index}
              {...field}
              listTitles={[]}
              position={0}
              type={''}
              validators={{}}
            />
          ))}
        </div>
        <FormSubmitButton
          title={change_password_text?.value}
          isLoading={isLoading}
          index={10}
        />
        {isError && <ErrorMessage error={isError} />}
      </form>
    </FormAnimations>
  );
};

export default ResetPasswordForm;
