/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';
import { useEffect, useMemo } from 'react';

import { useGetProductsByPageUrlQuery, useGetProductsQuery } from '@/app/api/';
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
import ProductRow from './ProductRow';

/**
 * ProductsList
 * @returns ProductsList
 */
const ProductsList: FC<{ tabKey: string }> = ({ tabKey }) => {
  const dispatch = useAppDispatch();

  const serviceId = useAppSelector(selectServiceId);
  const servicesData = useAppSelector(selectCartData);
  const mastersData = useAppSelector((state) =>
    selectTabsData('masters', state),
  );

  const serviceData = servicesData[serviceId] || {};
  const serviceUrl = serviceData.service?.pageUrl;
  const currentSalon = serviceData?.salon;

  const { data } = useGetProductsByPageUrlQuery({ url: serviceUrl || '' });
  const { data: allProducts } = useGetProductsQuery([]);

  // filter products
  const filteredProducts = useMemo(() => {
    const productsData = data?.items || allProducts?.items;
    if (!productsData) return [];
    // inMastersProducts
    const inMastersProducts = mastersData
      ?.flatMap((m: any) => m.attributeValues?.services?.value)
      .filter((m: any) => {
        if (m.id > 0) {
          return false;
        }
        return true;
      })
      .map((m: any) => Number(m.id?.replace('p-' + m.parentId + '-', '')));

    return productsData.filter((product) => {
      // check if product in salon
      const salons = product.attributeValues?.salons?.value || [];
      const inSalon = salons.some(
        (salon: { id: number }) =>
          salon.id === currentSalon?.id || currentSalon?.id === undefined,
      );
      const inMaster = inMastersProducts.some((pId: any) => pId === product.id);
      return inSalon && inMaster;
    });
  }, [mastersData, allProducts, data, currentSalon]);

  // setTabsData
  useEffect(() => {
    if (filteredProducts) {
      dispatch(
        setTabsData({
          key: tabKey,
          value: filteredProducts,
        }),
      );
    }
  }, [dispatch, filteredProducts, tabKey]);

  // Use selector to get the current tab state
  const { isActive } = useAppSelector((state) =>
    selectTabsState(tabKey, state),
  );

  // if tab inactive
  if (!isActive) {
    return;
  }

  // Products not found
  if (filteredProducts.length === 0) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
        <NotFound message="Products not found" />
      </div>
    );
  }

  // Add product to cart
  const addProductToCart = (product: IProductEntity) => {
    dispatch(
      addServiceToCart({
        id: serviceId,
        product,
      }),
    );
  };

  // render ProductsList
  return (
    <ul className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
      {filteredProducts?.map((product) => (
        <ProductRow
          key={product.id}
          product={product}
          currentId={serviceData.product?.id ?? -1}
          addProductToCart={addProductToCart}
        />
      ))}
    </ul>
  );
};

export default ProductsList;
