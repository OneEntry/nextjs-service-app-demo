/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import CardImage from './CardImage';
import CardInfo from './CardInfo';

interface CardDataProps {
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
  cardData: CardDataProps;
  setState: any;
}

const GalleryCard: FC<GalleryCardProps> = ({ dict, cardData, setState }) => (
  <div
    className="gallery-feed-card group"
    onPointerEnter={() => setState(true)}
    onPointerLeave={() => setState(false)}
  >
    <div className="relative flex w-full flex-col justify-center text-sm text-white">
      <CardImage cardData={cardData} />
      <CardInfo dict={dict} cardData={cardData} />
    </div>
  </div>
);

export default GalleryCard;
