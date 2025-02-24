import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IAccountsEntity } from 'oneentry/dist/payments/paymentsInterfaces';
import type { FC } from 'react';

import { useCreateOrder } from '@/app/api';
import Loader from '@/components/shared/Loader';

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
      className="btn btn-primary btn-md relative mt-5 px-12 max-md:w-full"
      aria-label={title}
      disabled={!isValid}
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
};

export default ConfirmOrderButton;
