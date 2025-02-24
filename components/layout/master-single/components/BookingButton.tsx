'use client';

import { useTransitionRouter } from 'next-transition-router';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectServiceId,
} from '@/app/store/reducers/CartSlice';

interface BookingButtonProps {
  master: IAdminEntity;
  service?: IPagesEntity;
  dict: IAttributeValues;
}

/**
 * BookingButton component to handle booking actions.
 * @param master - The selected master for the service.
 * @param service - The service to be booked.
 * @returns JSX.Element representing the BookingButton component.
 */
const BookingButton: FC<BookingButtonProps> = ({ service, master, dict }) => {
  const router = useTransitionRouter();
  const dispatch = useAppDispatch();
  const { book_online_text } = dict;
  // Get the current service ID from the store
  const serviceId = useAppSelector(selectServiceId);

  // Handle booking action
  const onApplyHandle = () => {
    if (service || master) {
      dispatch(
        addServiceToCart({
          id: serviceId,
          service: service || ({} as IPagesEntity),
          master,
          salon: {} as IPagesEntity,
          product: {} as IProductEntity,
        }),
      );
      router.push('/booking');
    }
  };

  return (
    <button
      onClick={onApplyHandle}
      className="btn-o btn-o-primary btn-o-md self-start uppercase"
    >
      {book_online_text?.value || 'BOOK ONLINE'}
    </button>
  );
};

export default BookingButton;
