import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC, Key } from 'react';

import Spinner from '@/components/shared/Spinner';

import GalleryCardSm from './components/GalleryCardSm';

/**
 * GalleryCatsGrid
 * Renders a grid of gallery cards based on the provided pages.
 */
const GalleryCatsGrid: FC<{ pages?: IPagesEntity[] }> = ({ pages }) => {
  if (!pages || pages.length < 1) {
    return <Spinner />;
  }

  return pages?.map((p: IPagesEntity, index: Key | number) => {
    return (
      <GalleryCardSm
        key={index}
        cardData={{
          title: p.localizeInfos?.title || '',
          href: '/gallery/' + p.pageUrl,
          thumb: p.attributeValues?.gallery_cat_thumb?.value[0],
        }}
        index={index as number}
      />
    );
  });
};

export default GalleryCatsGrid;
