/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAuthFormData } from 'oneentry/dist/auth-provider/authProvidersInterfaces';
import type { IAttributes } from 'oneentry/dist/base/utils';
import type { FormDataType } from 'oneentry/dist/formsData/formsDataInterfaces';
import type { FC, FormEvent } from 'react';
import { useCallback, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { api, useGetFormByMarkerQuery } from '@/app/api';
import { useAppSelector } from '@/app/store/hooks';
import { AuthContext } from '@/app/store/providers/AuthContext';
import type { FormProps } from '@/app/types/global';

import AuthError from '../pages/AuthError';
import SpinnerLoader from '../shared/SpinnerLoader';
import ErrorMessage from './inputs/ErrorMessage';
import FormInput from './inputs/FormInput';
import SubmitButton from './inputs/FormSubmitButton';

export type InputValue = {
  value: string;
  valid: boolean;
  [key: string]: unknown;
};

/**
 * User form
 * @param dict dictionary from server api
 * @returns User form
 */
const UserForm: FC<FormProps> = ({ dict }) => {
  const { isAuth, refreshUser, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isError, setError] = useState('');

  // Get form by marker with RTK
  const { data, isLoading, error } = useGetFormByMarkerQuery({
    marker: 'reg',
  });

  // get fields from formFieldsReducer
  const fields = useAppSelector((state) => state.formFieldsReducer.fields);

  const formData = useMemo(() => {
    return data?.attributes
      .filter((field: IAttributes) => {
        if (field.marker !== 'email_notification_reg') {
          return {
            marker: field.marker,
            value: fields[field.marker as keyof typeof fields]?.value,
            type: 'string',
          };
        }
      })
      .filter(Boolean) as IAuthFormData[];
  }, [data?.attributes, fields]);

  // Update user data
  const onUpdateUserData = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);

        if (user?.formIdentifier) {
          await api.Users.updateUser({
            formIdentifier: user.formIdentifier,
            formData,
            authData: [
              {
                marker: 'password_reg',
                value: fields['password_reg'].value,
              },
            ],
            notificationData: {
              email: fields['email_reg'].value,
              phonePush: [],
              phoneSMS: fields['phone_reg'].value,
            },
            state: {},
          });
        }

        refreshUser();
        setError('');
        toast('Data saved!');
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [fields, formData, refreshUser, user?.formIdentifier],
  );

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (!isAuth || error || !user?.formData) {
    return <AuthError dict={dict} />;
  }

  return (
    <form
      className="flex min-h-full w-full max-w-[430px] flex-col gap-4 text-xl leading-5"
      onSubmit={onUpdateUserData}
    >
      <div className="relative mb-4 box-border flex shrink-0 flex-col gap-4">
        {data?.attributes
          .filter(
            (field: { marker: string }) =>
              field.marker !== 'email_notification_reg',
          )
          .map((field: IAttributes, index: number) => {
            const fieldData =
              Array.isArray(user?.formData) &&
              (user.formData.find(
                (item) => item.marker === field.marker,
              ) as FormDataType[]);
            return (
              <FormInput key={index} index={index} {...field} {...fieldData} />
            );
          })}
      </div>
      <SubmitButton
        title={dict?.save_button_text?.value}
        isLoading={loading}
        index={10}
      />
      {isError && <ErrorMessage error={isError} />}
    </form>
  );
};

export default UserForm;
