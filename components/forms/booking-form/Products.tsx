/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import DropdownAnimations from './animations/DropdownAnimations';
import DropdownButton from './DropdownButton';
import ProductsList from './products/ProductsList';

interface ProductsProps {
  dict: IAttributeValues;
  salons: any;
}

/**
 * Products Component
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
const Products: FC<ProductsProps> = ({ dict, salons }) => {
  const tabKey = 'products';

  // Safely extract text value with optional chaining and provide a default
  const selectServiceText = dict.select_product?.value || 'Select Product';

  return (
    <DropdownAnimations
      id={tabKey}
      className="mb-4 flex w-full flex-col items-center"
      index={2}
      tabKey={tabKey}
    >
      <DropdownButton title={selectServiceText} tabKey={tabKey} />
      <ProductsList tabKey={tabKey} salons={salons} />
    </DropdownAnimations>
  );
};

export default Products;
