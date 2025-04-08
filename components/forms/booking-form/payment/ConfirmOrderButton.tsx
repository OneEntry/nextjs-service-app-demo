import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IAccountsEntity } from 'oneentry/dist/payments/paymentsInterfaces';
import type { FC } from 'react';

import { useCreateOrder } from '@/app/api';
import SpinnerLoader from '@/components/shared/SpinnerLoader';

type ConfirmOrderButtonProps = {
  dict: IAttributeValues;
  account: IAccountsEntity;
  isValid: boolean;
};

/**
 * ConfirmOrderButton Component
 * @param dict
 * @param account
 * @param isValid
 * @returns ConfirmOrderButton
 */
const ConfirmOrderButton: FC<ConfirmOrderButtonProps> = ({
  dict,
  account,
  isValid,
}) => {
  const { isLoading, onConfirmOrder } = useCreateOrder();
  const { apply_text, pay_with_stripe_text } = dict;

  // Choose the button title based on payment method
  const title =
    account.identifier === 'cash'
      ? apply_text?.value || 'Apply'
      : pay_with_stripe_text?.value || 'Pay with Stripe';

  return (
    <button
      onClick={() => {
        onConfirmOrder();
      }}
      className="border-fuchsia-500hover:bg-fuchsia-600 relative mt-5 h-[50px] items-center justify-center rounded-[30px] bg-fuchsia-500 px-8 py-2 text-[17px] font-bold uppercase tracking-wide text-white transition-colors duration-300 focus-visible:outline-fuchsia-600 disabled:bg-[#a8a9b580] disabled:text-neutral-300 max-md:w-full"
      aria-label={title}
      disabled={!isValid}
    >
      {isLoading ? <SpinnerLoader /> : title}
    </button>
  );
};

export default ConfirmOrderButton;
