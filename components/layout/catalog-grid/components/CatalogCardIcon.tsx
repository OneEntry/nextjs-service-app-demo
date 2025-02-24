import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import * as icons from '@/components/icons/catalog/index';

interface CatalogCardIconProps {
  item: IPagesEntity;
}

/**
 * CatalogCardIcon component
 * Displays the appropriate icon based on the page URL.
 */
const CatalogCardIcon: FC<CatalogCardIconProps> = ({ item }) => {
  const { pageUrl } = item;

  // Safely access the icon using the pageUrl
  const IconComponent = icons[pageUrl as keyof typeof icons];

  return (
    <div className="mx-auto size-24 max-md:size-20 max-sm:size-16">
      {IconComponent ? <IconComponent /> : ''}
    </div>
  );
};

export default CatalogCardIcon;
