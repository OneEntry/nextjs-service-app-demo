import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

interface CatalogCardTitleProps {
  item: IPagesEntity;
}

/**
 * CatalogCardTitle component
 * Displays the title of the catalog card.
 */
const CatalogCardTitle: FC<CatalogCardTitleProps> = ({ item }) => {
  const title = item.localizeInfos?.title || 'No Title Available';

  return (
    <div className="mx-auto items-center whitespace-nowrap uppercase max-md:text-sm">
      {title}
    </div>
  );
};

export default CatalogCardTitle;
