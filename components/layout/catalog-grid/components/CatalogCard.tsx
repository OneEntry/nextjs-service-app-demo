import { Link } from 'next-transition-router';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import CatalogCardIcon from './CatalogCardIcon';
import CatalogCardTitle from './CatalogCardTitle';

/**
 * CatalogCard component
 * Represents a card in the catalog.
 * @param item - The page entity data
 * @returns JSX.Element
 */
const CatalogCard: FC<{ item: IPagesEntity }> = ({ item }) => {
  const { localizeInfos, pageUrl } = item;

  return (
    <div className="group relative flex shrink-0 flex-col">
      <Link
        title={localizeInfos?.title}
        href={`/services/${pageUrl}`}
        className="services-catalog-card"
      >
        <CatalogCardIcon item={item} />
        <CatalogCardTitle item={item} />
      </Link>
    </div>
  );
};

export default CatalogCard;
