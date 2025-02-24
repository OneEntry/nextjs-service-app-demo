import type { IError } from 'oneentry/dist/base/utils';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

/**
 * Get all related product page objects with API.Products
 *
 * @param id Product page identifier for which to find relationship.
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns  Array with ProductEntity objects
 */
export const getRelatedProductsById = async (
  id: number,
): Promise<{
  isError: boolean;
  error?: IError;
  products?: IProductEntity[];
  total: number;
}> => {
  try {
    const data = await api.Products.getRelatedProductsById(id);

    if (typeError(data)) {
      return { isError: true, error: data as IError, total: 0 };
    } else {
      return {
        isError: false,
        products: data.items,
        total: data.total,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e, total: 0 };
  }
};
