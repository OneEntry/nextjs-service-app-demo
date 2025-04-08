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
  setTabsData,
} from '@/app/store/reducers/CartSlice';

import NotFound from '../NotFound';
import ProductRow from './ProductRow';

/**
 * ProductsList
 * @param tabKey
 * @returns ProductsList
 */
const ProductsList: FC<{ tabKey: string; salons: any }> = ({
  tabKey,
  salons,
}) => {
  const dispatch = useAppDispatch();

  const serviceId = useAppSelector(selectServiceId);
  const servicesData = useAppSelector(selectCartData);
  const serviceData = servicesData[serviceId];

  const { data } = useGetProductsByPageUrlQuery({
    url: serviceData.service?.pageUrl || '',
  });
  const { data: allProducts } = useGetProductsQuery({ body: [] });

  // filter products
  const filteredProducts = useMemo(() => {
    const productsData = data?.items || allProducts?.items;
    if (!productsData) return [];
    // inMastersProducts
    const inMastersProducts =
      serviceData?.master?.attributeValues?.services?.value
        .filter((m: any) => {
          if (m.id > 0) {
            return false;
          }
          return true;
        })
        .map((m: any) => Number(m.id?.replace('p-' + m.parentId + '-', '')));

    return productsData.filter((product) => {
      // check if product in salon
      const inSalon = salons.some((salon: any) => {
        if (
          salon.id === serviceData?.salon?.id ||
          serviceData?.salon?.id === undefined
        ) {
          const pIds = salon.attributeValues?.products.value
            ?.map((m: any) =>
              typeof m.id === 'string'
                ? Number(m.id?.replace('p-' + m.parentId + '-', ''))
                : m.id,
            )
            .find((pId: any) => pId === product.id);
          return pIds;
        }
      });

      // check if product in Master
      const inMaster =
        inMastersProducts?.length > 0
          ? inMastersProducts.some((pId: any) => pId === product.id)
          : true;

      return inSalon && inMaster;
    });
  }, [data, allProducts, serviceData, salons]);

  // Add tabs data to cartSlice
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

  // Add service to cart
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
    <ul className="dropdown-container flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
      {filteredProducts?.length > 0 ? (
        filteredProducts.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
            currentId={serviceData.product?.id ?? -1}
            index={index}
            addProductToCart={addProductToCart}
          />
        ))
      ) : (
        <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-white px-4 text-center text-sm leading-7 text-neutral-600">
          <NotFound message="Products not found" />
        </div>
      )}
    </ul>
  );
};

export default ProductsList;
