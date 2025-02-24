import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC, Key } from 'react';

import { getChildPagesByParentUrl } from '@/app/api';

import CatalogCard from './CatalogCard';

/**
 * CatalogGrid component
 * Fetches and displays a grid of catalog cards.
 * @returns JSX.Element | null
 */
const CatalogGrid: FC = async () => {
  const { pages, isError } = await getChildPagesByParentUrl('services');
  if (!pages || isError) {
    return <div>Error loading pages.</div>;
  }

  return pages.map((page: IPagesEntity, i: Key) => {
    return <CatalogCard item={page} key={i} />;
  });
};

export default CatalogGrid;
