import gsap from 'gsap';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IAccountsEntity } from 'oneentry/dist/payments/paymentsInterfaces';
import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  selectCartData,
  selectServiceId,
  setTabsState,
} from '@/app/store/reducers/CartSlice';
import { addPaymentMethod } from '@/app/store/reducers/OrderSlice';

import BookingCard from './BookingCard';
import ConfirmOrderButton from './ConfirmOrderButton';

/**
 * Payment method
 * @param account
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
const PaymentMethod: FC<{
  account: IAccountsEntity;
  dict: IAttributeValues;
}> = ({ account, dict }) => {
  const dispatch = useAppDispatch();

  const orderData = useAppSelector((state) => state.orderReducer.order);
  const isActive = orderData?.paymentAccountIdentifier === account.identifier;

  const serviceId = useAppSelector(selectServiceId);
  const servicesData = useAppSelector(selectCartData);

  // Destructure safely with default values to avoid potential undefined errors
  const {
    salon = {},
    service = {},
    master = {},
    product = {},
    date,
  } = servicesData[serviceId] || {};

  // Determine if the button should be active
  const isValid = Boolean(
    salon.id && service.id && master.id && product.id && date,
  );

  // Toggle PaymentMethod
  const handleTogglePaymentMethod = () => {
    if (isActive) {
      dispatch(addPaymentMethod(''));
    } else {
      dispatch(addPaymentMethod(account.identifier));
    }
  };

  // validate state
  const errors: {
    title: string;
    link: string;
  }[] = [];

  if (!isValid) {
    if (!salon.id) {
      errors.push({
        title: 'Select salon',
        link: 'salons',
      });
    }
    if (!service.id) {
      errors.push({
        title: 'Select service',
        link: 'services',
      });
    }
    if (!product.id) {
      errors.push({
        title: 'Select product',
        link: 'products',
      });
    }
    if (!master.id) {
      errors.push({
        title: 'Select master',
        link: 'masters',
      });
    }
    if (!date) {
      errors.push({
        title: 'Select date',
        link: 'calendar',
      });
    }
  }

  return (
    <div
      className={`relative mb-4 w-full flex-row items-center justify-between overflow-hidden rounded-3xl border border-solid bg-white p-4 text-slate-700 ${
        isActive ? 'min-h-16' : 'min-h-8 cursor-pointer'
      }`}
      onClick={() =>
        !isActive && dispatch(addPaymentMethod(account.identifier))
      }
    >
      {/* Description */}
      <div className="flex-col">
        <h2 className="text-lg font-bold">{account?.localizeInfos?.title}</h2>
        <p className="mb-4 text-base">
          Payment description {account?.localizeInfos?.title}
        </p>
        <button
          onClick={handleTogglePaymentMethod}
          className="absolute bottom-4 right-4 size-6 rounded-full bg-slate-100 text-center"
        >
          {isActive ? '-' : '+'}
        </button>
      </div>
      {isActive && (
        <div id="cartData" className="w-full">
          <BookingCard dict={dict} />
          {errors.map((error, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  gsap.to(window, {
                    duration: 0.5,
                    scrollTo: { y: '#' + error.link, offsetY: 200 },
                  });
                  dispatch(setTabsState({ key: error.link, value: true }));
                }}
                className="flex min-w-full text-red-500"
              >
                {error.title}
              </button>
            );
          })}
          <div className="flex justify-between gap-4 max-md:mb-8 max-sm:flex-wrap max-sm:gap-0">
            <ConfirmOrderButton
              dict={dict}
              account={account}
              isValid={isValid}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
