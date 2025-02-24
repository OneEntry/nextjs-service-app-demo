'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectCartData,
  selectServiceId,
  selectTabsState,
  setTabsData,
} from '@/app/store/reducers/CartSlice';

import NotFound from '../NotFound';
import MasterRow from './MasterRow';

interface MastersListProps {
  masters: IAdminEntity[];
  dict: IAttributeValues;
  tabKey: string;
}

const MastersList: FC<MastersListProps> = ({ masters, dict, tabKey }) => {
  const dispatch = useAppDispatch();
  const serviceId = useAppSelector(selectServiceId);
  const servicesData = useAppSelector(selectCartData);

  const serviceData = servicesData[serviceId] || {};
  const serviceCategoryName = serviceData.service?.localizeInfos?.title || '';
  const currentSalon = serviceData?.salon;
  const currentService = serviceData?.service;
  const currentProduct = serviceData?.product;

  // filter masters
  const filteredMasters = useMemo(() => {
    return masters.filter((master) => {
      const {
        services: { value: masterServices },
        master_salon: { value: masterSalon },
      } = master.attributeValues;
      // chek if master in Salon
      const inSalon =
        masterSalon !== '' &&
        masterSalon?.some(
          (s: { id: number }) =>
            s.id === Number(currentSalon?.id) || currentSalon?.id === undefined,
        );
      // chek if master in service
      const inService =
        masterServices !== '' &&
        masterServices?.some(
          (s: { parentId: number }) =>
            s.parentId === Number(currentService?.id) ||
            currentService?.id === undefined,
        );
      // chek if master in product
      const inProduct =
        masterServices !== '' &&
        masterServices?.some((s: { id: number | string; parentId: number }) => {
          let id = null;
          if (Number(s.id) > 0) {
            id = s.id;
          } else {
            const t = s.id as string;
            id = Number(t.replace('p-' + s.parentId + '-', ''));
          }
          return (
            id === Number(currentProduct?.id) ||
            currentProduct?.id === undefined
          );
        });
      return inSalon && inService && inProduct;
    });
  }, [currentProduct, currentSalon, currentService, masters]);

  // setTabsData
  useEffect(() => {
    if (filteredMasters) {
      dispatch(
        setTabsData({
          key: tabKey,
          value: filteredMasters,
        }),
      );
    }
  }, [dispatch, filteredMasters, tabKey]);

  // Use selector to get the current tab state
  const { isActive } = useAppSelector((state) =>
    selectTabsState(tabKey, state),
  );

  // if tab inactive
  if (!isActive) {
    return;
  }

  // Masters not found
  if (filteredMasters?.length === 0) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
        <NotFound message="Masters not found" />
      </div>
    );
  }

  // Add master to cart
  const addMasterToCart = (master: IAdminEntity) => {
    dispatch(
      addServiceToCart({
        id: serviceId,
        master,
      }),
    );
  };

  // render MastersList
  return (
    <div className="flex w-full flex-col rounded-3xl bg-white p-5 md:px-14">
      <fieldset id="masters_group" className="w-full">
        {filteredMasters?.map((master) => (
          <MasterRow
            key={master.id}
            dict={dict}
            master={master}
            currentId={Number(serviceData.master?.id || 0)}
            serviceCategoryName={serviceCategoryName}
            addMasterToCart={addMasterToCart}
          />
        ))}
      </fieldset>
    </div>
  );
};

export default MastersList;
