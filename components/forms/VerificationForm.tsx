/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useTransitionRouter } from 'next-transition-router';
import type { FC, FormEvent } from 'react';
import { useCallback, useContext, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

import { api, logInUser } from '@/app/api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { AuthContext } from '@/app/store/providers/AuthContext';
import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import { addField } from '@/app/store/reducers/FormFieldsSlice';
import type { FormProps } from '@/app/types/global';
import FormAnimations from '@/components/forms/animations/FormAnimations';

import ErrorMessage from './inputs/ErrorMessage';
import FormSubmitButton from './inputs/FormSubmitButton';

/**
 * VerificationForm component
 * @param dict - Dictionary from server API
 * @returns JSX element for verification form
 */
const VerificationForm: FC<FormProps> = ({ dict }) => {
  const router = useTransitionRouter();
  const dispatch = useAppDispatch();
  const { authenticate } = useContext(AuthContext);
  const { setOpen, setComponent, action } = useContext(OpenDrawerContext);

  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const { enter_otp_code, resend_text, receive_otp_text, verify_now_text } =
    dict;
  const fields = useAppSelector((state) => state.formFieldsReducer.fields);

  useEffect(() => {
    if (otp) {
      dispatch(addField({ otp_code: { valid: true, value: otp } }));
    }
  }, [otp, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleVerification = async () => {
    try {
      if (action !== 'activateUser') {
        // !!! checkCode
        const result = await api.AuthProvider.checkCode(
          'email',
          fields.email_reg.value,
          // eventIdentifier,
          'auth',
          otp,
        );
        if (result) setComponent('ResetPasswordForm');
      } else {
        // activateUser
        const result = await api.AuthProvider.activateUser(
          'email',
          fields.email_reg.value,
          otp,
        );
        if (result) {
          await logInUser({
            method: 'email',
            login: fields.email_reg.value,
            password: fields.password_reg.value,
          });
          authenticate();
          router.push('/profile');
          setOpen(false);
        } else {
          throw new Error('Activation failed');
        }
      }
    } catch (e: any) {
      setError(e.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandle = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (otp.length === 6) {
        setLoading(true);
        setError('');
        await handleVerification();
      }
    },
    [otp, handleVerification],
  );

  const onResendHandle = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      await api.AuthProvider.generateCode(
        'email',
        fields.email_reg.value,
        'generate_code',
      );
    } catch (e: any) {
      setError(e.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [fields.email_reg.value]);

  return (
    <FormAnimations className={''} isLoading={isLoading} isActive={true}>
      <form
        className="mx-auto flex min-h-full w-full max-w-[430px] flex-col gap-4 text-xl leading-5"
        onSubmit={onSubmitHandle}
      >
        <div className="relative mb-5 box-border flex shrink-0 flex-col gap-2.5">
          <p className="text-xs text-gray-400 max-md:max-w-full">
            {enter_otp_code?.value}
          </p>
        </div>

        <div className="relative mb-8 box-border flex shrink-0 flex-col gap-6">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            containerStyle="grid max-w-full grid-cols-6 justify-between gap-2 max-md:gap-2"
            inputStyle="relative box-border flex h-[70px] min-w-[14%] flex-col rounded border border-solid border-neutral-100 bg-neutral-100 p-2.5 text-center text-2xl font-medium text-neutral-600"
          />
          <div className="self-end text-xs text-fuchsia-500 max-md:mr-2.5">
            <span className="text-gray-400">{receive_otp_text?.value} </span>
            <button
              className="font-bold text-fuchsia-500"
              type="button"
              onClick={onResendHandle}
            >
              {resend_text?.value}
            </button>
          </div>
        </div>

        <FormSubmitButton
          title={verify_now_text?.value}
          isLoading={isLoading}
          index={0}
        />
        {error && <ErrorMessage error={error} />}
      </form>
    </FormAnimations>
  );
};

export default VerificationForm;
