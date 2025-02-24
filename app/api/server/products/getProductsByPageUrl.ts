import type { IError } from 'oneentry/dist/base/utils';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';

import { api } from '@/app/api';
import getSearchParams from '@/app/api/utils/getSearchParams';
import { typeError } from '@/components/utils';

/**
 * Get all products with pagination for the selected category.
 *
 * @param props
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns Array with ProductEntity objects
 */
export const getProductsByPageUrl = async (props: {
  limit: number;
  offset: number;
  params: {
    handle: string;
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
  const expandedFilters = getSearchParams(params.searchParams);

  try {
    const data = await api.Products.getProductsByPageUrl(
      params.handle,
      expandedFilters,
      'en_US',
      {
        sortOrder: 'DESC',
        sortKey: 'date',
        offset: offset,
        limit: limit,
      },
    );

    if (typeError(data)) {
      return { isError: true, error: data, total: 0 };
    } else {
      return { isError: false, products: data.items, total: data.total };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e, total: 0 };
  }
};
