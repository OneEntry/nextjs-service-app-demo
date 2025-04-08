'use client';

import { useTransitionRouter } from 'next-transition-router';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

import { useGetPageByIdQuery } from '@/app/api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectServiceId,
  setTabsState,
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

  const { data: service } = useGetPageByIdQuery({
    id: item.product.attributeValues.services.value[0].parentId,
  });

  /**
   * Function to add service to cart and navigate to booking page
   * @param product
   */
  const handleSelect = (product: IProductEntity) => {
    dispatch(
      addServiceToCart({
        id: serviceId,
        service,
        product,
        salon: {} as IPagesEntity,
        master: {} as IAdminEntity,
        date: {} as Date,
      }),
    );
    dispatch(setTabsState({ key: 'services', value: true }));
    dispatch(setTabsState({ key: 'products', value: true }));
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
