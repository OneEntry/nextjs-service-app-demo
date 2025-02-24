'use client';

import { useTransitionRouter } from 'next-transition-router';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { Key } from 'react';
import { type FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectServiceId,
} from '@/app/store/reducers/CartSlice';

import OfferRow from './components/OfferRow';
import SectionTitle from './components/SectionTitle';

const OffersTable: FC<{
  products: IProductEntity[];
  service: IPagesEntity;
}> = ({ products, service }) => {
  const router = useTransitionRouter();
  const dispatch = useAppDispatch();
  const title = 'SPECIAL OFFERS';
  const [offersData, setOffersData] = useState([]);

  // offersData
  useEffect(() => {
    if (!products) {
      return;
    }
    const m = products.filter(
      (product) => product.attributeSetIdentifier === 'service_set',
    );
    setOffersData(m as []);
  }, [products]);

  // colors
  const tableColors = [
    ...new Set(
      offersData?.map((product: IProductEntity) => {
        return product.attributeValues?.offer_type?.value[0]?.extended?.value;
      }),
    ),
  ];

  // onApplyHandle add product and service to cart and reset salon and master
  const serviceId = useAppSelector(selectServiceId);
  const handleClick = (product: IProductEntity) => {
    dispatch(
      addServiceToCart({
        id: serviceId,
        product,
        service,
        salon: {} as IPagesEntity,
        master: {} as IAdminEntity,
      }),
    );
    router.push('/booking');
  };

  return tableColors.map((color: string, idx: Key) => {
    const offers = offersData?.filter((offer: IProductEntity) => {
      if (
        offer.attributeValues?.offer_type?.value[0]?.extended?.value === color
      ) {
        return offer;
      }
    });
    return (
      <section
        key={color + idx}
        className="relative box-border flex shrink-0 flex-col"
      >
        <SectionTitle title={title} color={color} />
        <div
          className={
            'rounded-xl border border-solid px-9 py-5 max-md:max-w-full max-sm:px-5'
          }
          style={{ borderColor: color }}
        >
          <table className="w-full">
            <tbody>
              {offers.map((product: IProductEntity, i: number) => {
                return (
                  <OfferRow
                    key={i}
                    product={product}
                    color={color}
                    handleClick={handleClick}
                    isLast={offers.length === i + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  });
};

export default OffersTable;
