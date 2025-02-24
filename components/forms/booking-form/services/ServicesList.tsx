/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectCartData,
  selectServiceId,
  selectTabsData,
  selectTabsState,
  setTabsData,
} from '@/app/store/reducers/CartSlice';

import NotFound from '../NotFound';
import ServicesRow from './ServiceRow';

interface ServicesListProps {
  tabKey: string;
  services: IPagesEntity[];
  salons: IPagesEntity[];
}

/**
 * Services list Component
 *
 * @param tabKey
 * @param services - List of service entities
 * @returns Rendered list of ServicesRow components or NotFound
 */
const ServicesList: FC<ServicesListProps> = ({ tabKey, services }) => {
  const dispatch = useAppDispatch();

  // tab state
  const { isActive } = useAppSelector((state) =>
    selectTabsState(tabKey, state),
  );
  // current service Id
  const serviceId = useAppSelector(selectServiceId);
  // services data in cartSlice
  const servicesData = useAppSelector(selectCartData);
  const serviceData = servicesData[serviceId];
  const salonData = serviceData.salon;

  // filter services
  const filteredServices = useMemo(() => {
    if (!services) {
      return;
    }
    const inSalon = services?.filter((service) => {
      return salonData?.attributeValues?.services?.value?.some(
        (s: { id: number }) => service.id === s.id,
      );
    });

    return inSalon;
  }, [services, salonData]);

  // set filteredServices to TabsData
  useEffect(() => {
    if (filteredServices) {
      dispatch(
        setTabsData({
          key: tabKey,
          value: filteredServices,
        }),
      );
    }
  }, [dispatch, filteredServices, tabKey]);

  // if tab inactive
  if (!isActive) {
    return;
  }

  // Services not found
  if (filteredServices?.length === 0) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
        <NotFound message="Services not found" />
      </div>
    );
  }

  // Add service to cart and reset master and product
  const addCategoryToCart = (service: IPagesEntity) => {
    dispatch(
      addServiceToCart({
        id: serviceId,
        service,
        master: {} as IAdminEntity,
        product: {} as IProductEntity,
      }),
    );
  };

  // render ServicesList
  return (
    <ul className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
      {services?.map((service) => {
        const isActive =
          filteredServices?.some(
            (filteredService) => filteredService.id === service.id,
          ) || false;

        return (
          <ServicesRow
            key={service.id}
            service={service}
            currentId={serviceData.service?.id}
            disabled={!isActive}
            addCategoryToCart={addCategoryToCart}
          />
        );
      })}
    </ul>
  );
};

export default ServicesList;
