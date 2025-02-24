'use client';

import { useTransitionRouter } from 'next-transition-router';
import { useState } from 'react';

import { api } from '@/app/api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { removeAllServices } from '@/app/store/reducers/CartSlice';
import { removeOrder } from '@/app/store/reducers/OrderSlice';

/**
 * Custom hook to handle order creation and payment session
 * @returns Object containing order-related functions and state
 */
export const useCreateOrder = () => {
  const router = useTransitionRouter();
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.orderReducer.order);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * Create payment session with Payments API
   * @param id - Order ID for creating a session
   * @returns Promise resolving to payment state marker or void
   */
  const createSession = async (id: number) => {
    if (!id) return;

    setIsLoading(true);

    try {
      if (order?.paymentAccountIdentifier === 'cash') {
        router.push('/profile');
        return 'payment_success';
      }
      const { paymentUrl } = await api.Payments.createSession(id, 'session');
      if (paymentUrl) {
        router.push(paymentUrl);
        return 'payment_method';
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Confirm order and create it using Orders API
   * @returns Promise<void>
   */
  const onConfirmOrder = async (): Promise<void> => {
    if (!order?.formIdentifier || !order?.paymentAccountIdentifier) return;

    setIsLoading(true);

    try {
      // Prepare order data
      const orderFormData = order.formData.map(({ marker, type, value }) => ({
        marker,
        type,
        value,
      }));

      // Create order with Orders API
      const { id, paymentAccountIdentifier } = await api.Orders.createOrder(
        'orders',
        {
          ...order,
          formData: orderFormData,
          formIdentifier: order.formIdentifier,
          paymentAccountIdentifier: order.paymentAccountIdentifier,
        },
      );

      // removeAllServices from cart
      dispatch(removeAllServices());

      // Remove order from store
      dispatch(removeOrder());

      // Handle payment session based on payment method
      if (paymentAccountIdentifier !== 'cash') {
        await createSession(id);
      } else {
        router.push('/profile');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onConfirmOrder,
    createSession,
    isLoading,
    error,
  };
};
