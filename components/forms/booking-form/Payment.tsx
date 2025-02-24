'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { useContext, useEffect, useMemo } from 'react';

import { useGetAccountsQuery } from '@/app/api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { AuthContext } from '@/app/store/providers/AuthContext';
import {
  selectCartData,
  selectServiceId,
  selectTabsState,
} from '@/app/store/reducers/CartSlice';
import {
  addData,
  addProducts,
  createOrder,
} from '@/app/store/reducers/OrderSlice';
import AuthError from '@/components/pages/AuthError';
import Loader from '@/components/shared/Loader';

import DropdownButton from './DropdownButton';
import PaymentMethod from './payment/PaymentMethod';

/**
 * Payment
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
const Payment: FC<{
  dict: IAttributeValues;
}> = ({ dict }) => {
  const tabKey = 'payment';
  const dispatch = useAppDispatch();
  const { isAuth } = useContext(AuthContext);
  const tabsState = useAppSelector((state) => selectTabsState(tabKey, state));

  // serviceId
  const serviceId = useAppSelector(selectServiceId);

  // Payment methods in orderSlice
  const paymentMethods = useAppSelector(
    (state) => state.orderReducer.paymentMethods,
  );

  // Products data in orderSlice
  const cartData = useAppSelector(selectCartData);

  // servicesData
  const servicesData = useAppSelector(
    (state) => state.cartReducer.servicesData,
  );

  // Products in orderSlice
  const productsInOrder = useMemo(() => {
    return [
      ...cartData.map((item) => {
        return {
          productId: item.product.id,
          quantity: 1,
        };
      }, []),
    ];
  }, [cartData]);

  // Get all payment accounts as an array
  const { data, error, isLoading } = useGetAccountsQuery({});

  // Allowed payment methods
  const whitelistMethods = useMemo(() => {
    if (data) {
      return data.filter((method) => {
        const index = paymentMethods?.findIndex(
          (whitelistMethod) => method.identifier === whitelistMethod.identifier,
        );
        if (index !== -1) {
          return method;
        }
      });
    }
    return [];
  }, [data, paymentMethods]);

  // Create order in orderSlice on init component
  useEffect(() => {
    dispatch(
      createOrder({
        formData: [],
        products: productsInOrder,
        formIdentifier: 'order',
        paymentAccountIdentifier: 'cash',
      }),
    );
  }, [dispatch, productsInOrder]);

  // add products to orderSlice
  useEffect(() => {
    if (productsInOrder) {
      dispatch(addProducts(productsInOrder));
    }
  }, [dispatch, productsInOrder]);

  // add data to orderSlice for create order on change servicesData
  useEffect(() => {
    const master = servicesData[serviceId].master;
    const salon = servicesData[serviceId].salon;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const date = servicesData[serviceId].date as Date;

    // add master to orderSlice
    if (master) {
      dispatch(
        addData({
          marker: 'master',
          type: 'list',
          value: [
            {
              title: master?.attributeValues?.master_name?.value,
              value: master?.id?.toString(),
            },
          ],
          valid: true,
        }),
      );
    }

    // add salon to orderSlice
    if (salon) {
      dispatch(
        addData({
          marker: 'order_salon',
          type: 'entity',
          value: [
            {
              id: salon.id,
              title: salon.localizeInfos?.title,
              value: salon.id,
              parentId: salon.parentId,
              depth: salon.depth,
            },
          ],
          valid: true,
        }),
      );
    }

    // add interval to orderSlice
    // if (date) {
    //   dispatch(
    //     addData({
    //       marker: 'interval',
    //       type: 'timeInterval',
    //       value: {
    //         fullDate: new Date(date).toISOString(),
    //         formattedValue: new Date(date).toDateString() + ' 00:00',
    //         formatString: 'YYYY-MM-DD',
    //       },
    //       // value: {},
    //     }),
    //   );
    // }
  }, [dispatch, serviceId, servicesData]);

  // Auth Error
  if (error) {
    return <AuthError dict={dict} />;
  }

  // Loader
  if ((cartData.length < 1 && isLoading) || isLoading) {
    return <Loader />;
  }

  return (
    isAuth && (
      <div className="mb-5 flex w-full flex-col gap-4">
        <DropdownButton title={'Payment'} tabKey={tabKey} />
        {tabsState.isActive &&
          whitelistMethods.map((item, index) => {
            return <PaymentMethod key={index} account={item} dict={dict} />;
          })}
      </div>
    )
  );
};

export default Payment;
