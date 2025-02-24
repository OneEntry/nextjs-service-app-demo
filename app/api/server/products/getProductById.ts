import type { IError } from 'oneentry/dist/base/utils';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

/**
 * Get product by id.
 *
 * @param id Product id.
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns ProductEntity object
 */
export const getProductById = async (
  id: number,
): Promise<{
  isError: boolean;
  error?: IError;
  product?: IProductEntity;
}> => {
  try {
    const data = await api.Products.getProductById(id);

    if (typeError(data)) {
      return { isError: true, error: data };
    } else {
      return { isError: false, product: data };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
