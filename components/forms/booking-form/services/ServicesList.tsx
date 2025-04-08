/* eslint-disable @typescript-eslint/no-unused-vars */
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
 * @param salons - List of salons entities
 * @returns Rendered list of ServicesRow components or NotFound
 */
const ServicesList: FC<ServicesListProps> = ({ tabKey, services }) => {
  const dispatch: any = useAppDispatch();

  // current service Id
  const serviceId = useAppSelector(selectServiceId);
  // services data in cartSlice
  const servicesData = useAppSelector(selectCartData);
  const serviceData = servicesData[serviceId];
  const salonData = serviceData.salon;
  const masterData = serviceData.master;

  // filter services
  const filteredServices = useMemo(() => {
    // inMastersProducts
    const inMasterServices =
      serviceData?.master?.attributeValues?.services?.value
        .filter((m: any) => {
          if (m.id > 0) {
            return true;
          }
          return false;
        })
        .map((s: any) => s.id);

    return services?.filter((service) => {
      const inSalon =
        salonData?.attributeValues?.services?.value?.some(
          (s: { id: number }) => service.id === s.id,
        ) || salonData?.id === undefined;

      const inMaster =
        inMasterServices?.length > 0
          ? inMasterServices.some((sId: number) => sId === service.id)
          : true;

      return inSalon && inMaster;
    });
  }, [services, serviceData, salonData]);

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

  // Services not found
  if (filteredServices?.length === 0) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
        <NotFound message="Services not found" />
      </div>
    );
  }

  // Add service to cart and reset master and product
  const addCategoryToCart = (
    service: IPagesEntity,
    disabled: boolean,
    master: any,
  ) => {
    if (disabled) {
      dispatch(
        addServiceToCart({
          id: serviceId,
          service,
          master: {} as IAdminEntity,
          product: {} as IProductEntity,
        }),
      );
    } else {
      dispatch(
        addServiceToCart({
          id: serviceId,
          service,
          master: master || ({} as IAdminEntity),
          product: {} as IProductEntity,
        }),
      );
    }
  };

  // render ServicesList
  return (
    <ul className="dropdown-container flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
      {services?.map((service: IPagesEntity, index: number) => {
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
            index={index}
            master={masterData}
          />
        );
      })}
    </ul>
  );
};

export default ServicesList;
