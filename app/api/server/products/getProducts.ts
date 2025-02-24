import type { IError } from 'oneentry/dist/base/utils';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';

import { api } from '@/app/api';
import getSearchParams from '@/app/api/utils/getSearchParams';
import { typeError } from '@/components/utils';

/**
 * Get all products with pagination and filter.
 *
 * @param props
 * @see {@link https://oneentry.cloud/instructions/npm/ OneEntry docs}
 *
 * @returns Array with ProductEntity objects
 */
export const getProducts = async (props: {
  limit: number;
  offset: number;
  params?: {
    handle?: string;
    searchParams?: {
      search?: string;
      in_stock?: string;
      color?: string;
      minPrice?: string;
      maxPrice?: string;
    };
  };
}): Promise<{
  isError: boolean;
  error?: IError;
  products?: IProductEntity[];
  total: number;
}> => {
  const { limit, offset, params } = props;
  const expandedFilters = getSearchParams(params?.searchParams, params?.handle);

  try {
    const data = await api.Products.getProducts(expandedFilters, 'en_US', {
      sortOrder: 'ASC',
      sortKey: 'date',
      offset: offset,
      limit: limit,
    });
    if (typeError(data)) {
      return { isError: true, error: data, total: 0 };
    } else {
      return {
        isError: false,
        products: data.items,
        total: data.total,
      };
    }
  } catch (error) {
    return {
      isError: true,
      error: error as IError,
      total: 0,
    };
  }
};
