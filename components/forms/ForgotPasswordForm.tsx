/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAttributes, IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC, FormEvent } from 'react';
import { useContext, useState } from 'react';

import { api, useGetFormByMarkerQuery } from '@/app/api';
import { useAppSelector } from '@/app/store/hooks';
import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import FormAnimations from '@/components/forms/animations/FormAnimations';

import Loader from '../shared/Loader';
import ErrorMessage from './inputs/ErrorMessage';
import FormInput from './inputs/FormInput';
import FormSubmitButton from './inputs/FormSubmitButton';

interface ForgotPasswordFormProps {
  dict: IAttributeValues;
}

/**
 * ForgotPassword form
 * @param dict dictionary from server api
 * @returns ForgotPassword form
 */
export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ dict }) => {
  const { setComponent, setAction } = useContext(OpenDrawerContext);
  const [isError, setError] = useState<string>('');

  const { reset_descr, send_text } = dict;

  // Get form data with RTK from API
  const { data, isLoading } = useGetFormByMarkerQuery({ marker: 'reg' });
  const fields = useAppSelector((state) => state.formFieldsReducer.fields);

  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Generate verification code with API
      await api.AuthProvider.generateCode(
        'email',
        fields.email_reg.value,
        'generate_code',
      );
      // Open Verification form
      setComponent('VerificationForm');
      setAction('checkCode');
    } catch (error: any) {
      setError(error.message);
      if (error.statusCode === 400) {
        setTimeout(() => {
          setComponent('VerificationForm');
        }, 800);
      }
    }
  };

  if (!data || isLoading) {
    return <Loader />;
  }

  return (
    <FormAnimations isLoading={isLoading}>
      <form
        className="mx-auto flex min-h-[480px] max-w-[350px] flex-col gap-4 text-xl leading-5"
        onSubmit={handleSubmit}
      >
        <div className="relative box-border flex shrink-0 flex-col gap-2.5">
          <p className="text-xs text-gray-400 max-md:max-w-full">
            {reset_descr?.value}
          </p>
        </div>

        <div className="relative mb-8 box-border flex shrink-0 flex-col gap-4">
          {data.attributes
            .filter((field: IAttributes) => field.marker === 'email_reg')
            .map((field: IAttributes, index: number) => (
              <FormInput key={index} index={index} {...field} />
            ))}
        </div>

        <FormSubmitButton
          title={send_text?.value}
          isLoading={isLoading}
          index={10}
        />
        {isError && <ErrorMessage error={isError} />}
      </form>
    </FormAnimations>
  );
};

export default ForgotPasswordForm;
