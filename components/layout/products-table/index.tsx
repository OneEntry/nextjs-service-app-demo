'use client';

import { useTransitionRouter } from 'next-transition-router';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectServiceId,
} from '@/app/store/reducers/CartSlice';

import ProductRow from './components/ProductRow';
import SectionTitle from './components/SectionTitle';

interface ProductsTableProps {
  products: IProductEntity[];
  title: string;
  service: IPagesEntity;
}

const ProductsTable: FC<ProductsTableProps> = ({
  title,
  products,
  service,
}) => {
  const router = useTransitionRouter();
  const dispatch = useAppDispatch();
  const color = 'fuchsia-500';
  const filteredProducts = products.filter(
    (product) => product.attributeSetIdentifier !== 'service_set',
  );

  // Selectors
  const serviceId = useAppSelector(selectServiceId);

  // Handle click event
  const clickHandle = (product: IProductEntity) => {
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

  return (
    <section className="relative box-border flex shrink-0 flex-col">
      <SectionTitle title={title} />
      <div
        className={
          'rounded-xl px-9 max-sm:px-4 py-5 max-md:max-w-full border border-solid border-' +
          color
        }
      >
        {filteredProducts.length > 0 && (
          <table className="w-full">
            <tbody>
              {filteredProducts.map((product, index) => (
                <ProductRow
                  key={index}
                  product={product}
                  color={color}
                  clickHandle={clickHandle}
                  isLast={filteredProducts.length === index + 1}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default ProductsTable;
