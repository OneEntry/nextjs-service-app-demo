import { Link } from 'next-transition-router';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import CardAnimations from '../animations/CardAnimations';
import CatalogCardIcon from './CatalogCardIcon';
import CatalogCardTitle from './CatalogCardTitle';

/**
 * CatalogCard component
 * Represents a card in the catalog.
 * @param item - The page entity data
 * @returns JSX.Element
 */
const CatalogCard: FC<{ item: IPagesEntity; index: number }> = ({
  item,
  index,
}) => {
  const { localizeInfos, pageUrl } = item;

  return (
    <CardAnimations className={'relative flex shrink-0 flex-col'} index={index}>
      <Link
        title={localizeInfos?.title}
        href={`/services/${pageUrl}`}
        className="flex z-10 size-[230px] flex-col items-center justify-center gap-2 overflow-hidden rounded-full p-8 text-center text-xl text-neutral-600 hover:text-fuchsia-600 transition-colors duration-300 max-xl:size-[200px] max-md:size-[160px] max-md:p-6 max-sm:size-[140px] max-sm:p-5 max-xs:size-[130px]"
      >
        <CatalogCardIcon item={item} />
        <CatalogCardTitle item={item} />
      </Link>
    </CardAnimations>
  );
};

export default CatalogCard;
