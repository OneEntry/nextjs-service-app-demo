import parse from 'html-react-parser';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import wrapCharactersInSpan from '@/components/hooks/wrapCharactersInSpan';

interface CatalogCardTitleProps {
  item: IPagesEntity;
}

/**
 * CatalogCardTitle component
 * Displays the title of the catalog card.
 */
const CatalogCardTitle: FC<CatalogCardTitleProps> = ({ item }) => {
  // const title = item.localizeInfos?.title || 'No Title Available';

  const title = wrapCharactersInSpan(
    item.localizeInfos?.title || 'No Title Available',
  );

  return (
    <div className="title mx-auto items-center whitespace-nowrap uppercase max-md:text-sm">
      {parse(title)}
    </div>
  );
};

export default CatalogCardTitle;
