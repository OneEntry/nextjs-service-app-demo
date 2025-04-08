/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import { type FC, useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectCartData,
  selectServiceId,
  selectTabsData,
  setTabsData,
} from '@/app/store/reducers/CartSlice';

import NotFound from '../NotFound';
import SalonRow from './SalonRow';

export type TabLayoutProps = {
  salons: IPagesEntity[];
  tabKey: string;
};

/**
 * SalonsList
 * @param salons
 * @returns SalonsList
 */
const SalonsList: FC<TabLayoutProps> = ({ salons, tabKey }) => {
  const dispatch = useAppDispatch();

  // servicesData in cart
  const serviceId = useAppSelector(selectServiceId);
  const servicesData = useAppSelector(selectCartData);
  const mastersData = useAppSelector((state) =>
    selectTabsData('masters', state),
  );

  // filter salons
  const filteredSalons = useMemo(() => {
    if (!salons) {
      return;
    }
    const serviceData = servicesData[serviceId];
    const currentMaster = serviceData?.master;
    const masterSalons = currentMaster?.attributeValues?.master_salon?.value;
    const currentProduct = serviceData?.product;

    return salons?.filter((salon) => {
      // check if salons has master
      const inMastersSalons = mastersData?.flatMap((master: any) => {
        return master.attributeValues.master_salon.value.some(
          (v: any) => v.id === salon.id,
        );
      });
      // check if currently selected master(in cartSlice) in salon
      const inCurrentMaster = masterSalons?.some(
        (masterSalon: { id: number }) => {
          return masterSalon.id === salon.id || currentMaster.id === undefined;
        },
      );
      // check if currently selected product(in cartSlice) in salon
      const inProduct = currentProduct?.attributeValues?.salons?.value?.find(
        (s: { id: number }) => s.id === salon.id,
      );
      return (
        (inCurrentMaster || inCurrentMaster === undefined) &&
        (inProduct || currentProduct.id === undefined) &&
        (inMastersSalons || !mastersData)
      );
    });
  }, [serviceId, mastersData, salons, servicesData]);

  // set filteredSalons to TabsData
  useEffect(() => {
    if (filteredSalons) {
      dispatch(
        setTabsData({
          key: tabKey,
          value: filteredSalons,
        }),
      );
    }
  }, [dispatch, filteredSalons, tabKey]);

  // Salons not found
  if (filteredSalons?.length === 0) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
        <NotFound message={'Salons not found'} />
      </div>
    );
  }

  // add salon ToCart, reset other data if selected salon disabled
  const addSalonToCart = (salon: IPagesEntity, disabled: boolean) => {
    const payload = {
      id: serviceId,
      salon,
      ...(disabled && {
        service: {} as IPagesEntity,
        master: {} as IAdminEntity,
        product: {} as IProductEntity,
      }),
    };
    dispatch(addServiceToCart(payload));
  };

  // render salons list
  return (
    <ul className="dropdown-container flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
      {salons?.map((salon, index) => {
        const isActive =
          filteredSalons?.some(
            (filteredSalon) => filteredSalon.id === salon.id,
          ) || false;

        return (
          <SalonRow
            key={salon.id}
            salon={salon}
            currentId={servicesData[serviceId]?.salon?.id ?? 0}
            disabled={!isActive}
            addSalonToCart={addSalonToCart}
            index={index}
          />
        );
      })}
    </ul>
  );
};

export default SalonsList;
