'use client';

import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';
import { useMemo } from 'react';

import ProductBadge from './ProductBadge';
import ProductPrice from './ProductPrice';
import ProductTitle from './ProductTitle';

const ProductRow: FC<{
  product: IProductEntity;
  color: string;
  isLast: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clickHandle: any;
}> = ({ product, color, isLast, clickHandle }) => {
  // Memoized className for the row
  const rowClass = useMemo(() => {
    const baseClass =
      'align-middle max-md:max-w-full max-md:flex-wrap cursor-pointer group ';
    const borderClass = isLast ? '' : 'border-b border-solid';
    return `${baseClass} ${borderClass}`;
  }, [isLast]);

  // render products table
  return (
    <tr className={rowClass} onClick={() => clickHandle(product)}>
      <td className="w-[200px] py-1.5 pr-5 align-middle text-lg text-neutral-600 group-hover:text-fuchsia-500">
        <ProductTitle product={product} />
      </td>
      <td className="pr-5 align-middle">
        <ProductBadge product={product} color={color} />
      </td>
      <td
        className={
          'whitespace-nowrap py-1.5 pl-5 text-right align-middle text-lg font-bold leading-8 text-' +
          color
        }
      >
        <ProductPrice product={product} />
      </td>
    </tr>
  );
};

export default ProductRow;
