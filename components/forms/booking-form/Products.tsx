'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import DropdownButton from './DropdownButton';
import ProductsList from './products/ProductsList';

interface ProductsProps {
  dict: IAttributeValues;
}

/**
 * Products Component
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Products: FC<ProductsProps> = ({ dict }) => {
  const tabKey = 'products';

  // !!! Safely extract text value with optional chaining and provide a default
  const selectServiceText = 'Select Product';

  return (
    <div id={tabKey} className="mb-4 flex w-full flex-col items-center">
      <DropdownButton title={selectServiceText} tabKey={tabKey} />
      <ProductsList tabKey={tabKey} />
    </div>
  );
};

export default Products;
