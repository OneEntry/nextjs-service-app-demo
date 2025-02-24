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

interface OfferInfoProps {
  item: {
    priceOff: number;
    product: IProductEntity;
  };
  dict: IAttributeValues;
}

/**
 * OfferInfo section
 *
 * @returns React component
 */
const OfferInfo: FC<OfferInfoProps> = ({ item, dict }) => {
  const router = useTransitionRouter();
  const dispatch = useAppDispatch();
  const serviceId = useAppSelector(selectServiceId);

  // Function to add service to cart and navigate to booking page
  const handleSelect = (product: IProductEntity) => {
    dispatch(
      addServiceToCart({
        id: serviceId,
        service: {} as IPagesEntity,
        product,
        salon: {} as IPagesEntity,
        master: {} as IAdminEntity,
        date: {} as Date,
      }),
    );
    router.push('/booking');
  };

  return (
    <div className="flex flex-col px-3.5">
      <p className="mb-5 text-6xl max-md:text-4xl">-{item.priceOff} %</p>
      <button
        onClick={() => handleSelect(item.product)}
        className="w-full rounded-md bg-white px-3.5 py-1.5 text-center text-base uppercase leading-5 tracking-[3px] text-zinc-800 transition-colors duration-300 hover:text-zinc-900 hover:shadow-md focus:outline-none"
      >
        {dict.select_txt?.value}
      </button>
    </div>
  );
};

export default OfferInfo;
