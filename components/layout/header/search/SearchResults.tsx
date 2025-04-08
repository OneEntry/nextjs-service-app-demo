/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { Dispatch, FC } from 'react';
import React, { useEffect, useState } from 'react';

import { getPageById } from '@/app/api';
import { useSearchProducts } from '@/app/api/hooks/useSearchProducts';
import Spinner from '@/components/shared/Spinner';

import CloseSearch from './CloseSearch';
import ProductRow from './ProductRow';

interface SearchResultsProps {
  searchValue: string;
  state: boolean;
  setState: Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Search results
 * @param searchValue
 * @param state
 * @param setState
 *
 * @returns JSX.Element
 */
const SearchResults: FC<SearchResultsProps> = ({
  searchValue,
  state,
  setState,
}) => {
  const [pages, setPages] = useState<{
    [key: number]: {
      page?: IPagesEntity;
    };
  }>({});
  const { loading, products } = useSearchProducts({
    name: searchValue,
  });

  useEffect(() => {
    const fetchPages = async () => {
      const pagesData: {
        [key: number]: {
          page?: IPagesEntity;
        };
      } = {};
      await Promise.all(
        products.map(async (product: any) => {
          if (product.productPages.length > 0) {
            const pageData = await getPageById(product.productPages[0].pageId);
            pagesData[product.id] = pageData;
          }
        }),
      );
      setPages(pagesData);
    };

    if (products.length > 0) {
      fetchPages();
    }
  }, [products]);

  if (loading) {
    return <Spinner />;
  }

  if (!state) {
    return null;
  }

  return (
    <div className="absolute left-0 top-full z-30 mt-px flex w-full flex-col gap-1 rounded-2xl bg-white p-5 shadow-lg">
      <CloseSearch setState={setState} />
      {products.length > 0 ? (
        products.map((product: IProductEntity, i: number) => {
          const { id, attributeSetIdentifier } = product;

          // Skip rendering for 'service_product' type
          if (attributeSetIdentifier === 'service_product') {
            return null;
          }

          return (
            <div key={id + i} className="flex w-full">
              <ProductRow
                pageData={pages[id]?.page}
                product={product}
                setState={setState}
              />
            </div>
          );
        })
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchResults;
