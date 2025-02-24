'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { useContext } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import * as forms from '@/components/forms';
import ModalAnimations from '@/components/layout/modal/animations/ModalAnimations';

import CloseModal from './components/CloseModal';
import ModalBackdrop from './components/ModalBackdrop';

const useTitleData = ({
  dict,
  component,
}: {
  dict: IAttributeValues;
  component: string;
}) => {
  const {
    sign_in_text,
    sign_up_text,
    reset_password_text,
    forgot_password_text,
    verification,
  } = dict;

  const titlesData = [
    {
      component: 'CalendarForm',
      value: 'Calendar',
    },
    {
      component: 'ForgotPasswordForm',
      value: forgot_password_text?.value,
    },
    {
      component: 'ResetPasswordForm',
      value: reset_password_text?.value,
    },
    {
      component: 'SignInForm',
      value: sign_in_text?.value,
    },
    {
      component: 'SignUpForm',
      value: sign_up_text?.value,
    },
    {
      component: 'VerificationForm',
      value: verification?.value,
    },
  ];
  const title = titlesData.find((t) => t.component === component);

  return title?.value;
};

/**
 * Forms modal component
 * @param dict dictionary from server api
 * @returns Modal with form component
 */
const Modal: FC<{ dict: IAttributeValues }> = ({ dict }) => {
  const { component } = useContext(OpenDrawerContext);

  // select form component by component name
  const Form: FC<{ className: string; dict: IAttributeValues }> =
    forms[component as keyof typeof forms] || null;

  const title = useTitleData({ dict, component });

  if (!Form) {
    return null;
  }

  return (
    <ModalAnimations component={component}>
      <div
        id="modalBody"
        className="z-500 fixed left-1/2 top-1/2 flex size-full max-w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-auto bg-white p-6 px-16 pt-32 shadow-xl max-sm:px-8 sm:px-16 md:overflow-hidden md:rounded-3xl lg:h-auto lg:w-[550px] lg:p-10 lg:px-24 lg:pt-32 xl:px-24"
      >
        <header className="bg-gradient-2 absolute left-0 top-0 flex w-full items-start gap-5 px-16 py-6 pr-6 text-4xl leading-8 text-white max-sm:px-8 lg:pl-24">
          <div className="mt-8 flex-auto self-end text-[32px] leading-10 max-sm:mt-0 xl:text-[42px]">
            {title}
          </div>
          <CloseModal />
        </header>
        <Form className={''} dict={dict} />
      </div>
      <ModalBackdrop />
    </ModalAnimations>
  );
};

export default Modal;
