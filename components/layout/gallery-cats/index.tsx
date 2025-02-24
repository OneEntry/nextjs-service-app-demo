import type { IError } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC, Key } from 'react';

import GalleryCardSm from './components/GalleryCardSm';

/**
 * GalleryCatsGrid
 * Renders a grid of gallery cards based on the provided pages.
 */
const GalleryCatsGrid: FC<{ pages?: IPagesEntity[] | IError }> = ({
  pages,
}) => {
  return (
    <>
      {pages?.map((p: IPagesEntity, i: Key) => {
        const cardData = {
          title: p.localizeInfos?.title || '',
          href: '/gallery/' + p.pageUrl,
          thumb: p.attributeValues?.gallery_cat_thumb?.value[0],
        };
        return <GalleryCardSm key={i} cardData={cardData} />;
      })}
    </>
  );
};

export default GalleryCatsGrid;
