'use client';

import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import { useEffect, useState } from 'react';

import { api } from '@/app/api';

/**
 * Search products with Products API
 * @param name product name
 * @returns Array with ProductEntity objects
 */
export const useSearchProducts = ({ name }: { name: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductEntity[]>([]);
  const [refetch, setRefetch] = useState(false);

  // search products on data change
  useEffect(() => {
    if (!name) {
      return;
    }
    (async () => {
      setLoading(true);
      const result = await api.Products.searchProduct(name);
      setProducts(result as IProductEntity[]);
      setLoading(false);
    })();
  }, [refetch, name]);

  return {
    loading,
    products,
    refetch() {
      setRefetch(!refetch);
    },
  };
};
