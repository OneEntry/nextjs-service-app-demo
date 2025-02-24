/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAttributes } from 'oneentry/dist/base/utils';
import type { FC, FormEvent } from 'react';
import { useState } from 'react';

import { api, useGetFormByMarkerQuery } from '@/app/api';
import { useAppSelector } from '@/app/store/hooks';

import Loader from '../shared/Loader';
import ErrorMessage from './inputs/ErrorMessage';
import FormCaptcha from './inputs/FormCaptcha';
import FormInput from './inputs/FormInput';
import FormSubmitButton from './inputs/FormSubmitButton';

/**
 * ContactUs form
 * @param className CSS className of ref element
 * @returns ContactUs form
 */
const ContactUsForm: FC<{ className: string }> = ({ className }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Get form by marker with RTK
  const { data, isLoading } = useGetFormByMarkerQuery({ marker: 'contact_us' });

  // Get fields from formFieldsReducer
  const fieldsData = useAppSelector((state) => state.formFieldsReducer.fields);

  // Sort fields by position
  const formFields = data?.attributes
    .slice()
    .sort(
      (a: { position: number }, b: { position: number }) =>
        a.position - b.position,
    );

  // Submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formFields || !token) return;

    const transformedFormData = formFields.map(
      (field: { marker: any; type: any }) => {
        const { marker } = field;
        const value = fieldsData[marker as keyof typeof fieldsData]?.value;

        switch (marker) {
          case 'spam':
          case 'send':
            return { marker, type: 'string', value: 'test' };
          case 'list':
            return { marker, type: 'list', value: [{ title: value, value }] };
          case 'text':
            return {
              marker,
              type: 'text',
              value: [{ htmlValue: value, plainValue: value }],
            };
          default:
            return { marker, type: 'string', value };
        }
      },
    );

    try {
      setLoading(true);
      await api.FormData.postFormsData({
        formIdentifier: 'contact_us',
        formData: transformedFormData,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      className={`flex min-h-full w-full max-w-[430px] flex-col gap-4 text-xl leading-5 ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="relative mb-4 box-border flex shrink-0 flex-col gap-4">
        {formFields?.map((field: IAttributes, index: number) => {
          switch (field.type) {
            case 'button':
              return (
                <FormSubmitButton
                  key={index}
                  title={field.localizeInfos.title}
                  isLoading={loading}
                  index={10}
                />
              );
            case 'spam':
              return (
                <div key={index}>
                  <FormCaptcha
                    setToken={setToken}
                    setIsCaptcha={() => {}}
                    captchaKey={field.settings?.captchaKey || ''}
                  />
                </div>
              );
            default:
              return <FormInput key={index} index={index} {...field} />;
          }
        })}
      </div>

      {error && <ErrorMessage error={error} />}
    </form>
  );
};

export default ContactUsForm;
