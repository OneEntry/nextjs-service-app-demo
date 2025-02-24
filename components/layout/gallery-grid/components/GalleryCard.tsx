import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import CardImage from './CardImage';
import CardInfo from './CardInfo';

interface GalleryCardDataProps {
  name: string;
  link: string;
  img: string;
  thumb: string;
  spec: {
    title: string;
  };
}

interface GalleryCardProps {
  dict: IAttributeValues;
  cardData: GalleryCardDataProps;
}

const GalleryCard: FC<GalleryCardProps> = ({ dict, cardData }) => (
  <div className="gallery-card group">
    <div className="relative flex w-full flex-col justify-center text-sm text-white">
      <figure className="relative flex min-h-[320px] w-full flex-col overflow-hidden">
        <CardImage cardData={cardData} />
      </figure>
      <div className="gallery-card-info absolute bottom-0 left-0 w-full bg-transparent">
        <CardInfo dict={dict} cardData={cardData} />
        <div className="gallery-card-info-bg"></div>
      </div>
    </div>
  </div>
);

export default GalleryCard;
