import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import GalleryCardAnimations from '@/app/animations/GalleryCardAnimations';

import CardInfo from './CardInfo';
import GalleryCardImage from './GalleryCardImage';

interface GalleryCardProps {
  dict: IAttributeValues;
  cardData: {
    name: string;
    link: string;
    img: string;
    size: { width: number; height: number };
    thumb: string;
    preview: string;
    spec: {
      title: string;
    };
  };
  index: number;
}

const GalleryCard: FC<GalleryCardProps> = ({ dict, cardData, index }) => (
  <GalleryCardAnimations
    className="group relative flex min-h-[320px] flex-col overflow-hidden max-md:min-h-[260px] max-xs:min-h-[240px] max-xs:min-w-[50vw]"
    index={index}
  >
    <div className="group relative flex w-full flex-col justify-center text-sm text-white">
      <figure className="relative flex min-h-[320px] w-full flex-col overflow-hidden bg-slate-100">
        <GalleryCardImage cardData={cardData} index={index} />
      </figure>
      <div className="gallery-card-info absolute bottom-0 left-0 w-full bg-transparent">
        <CardInfo dict={dict} cardData={cardData} />
        <div className="gallery-card-info-bg"></div>
      </div>
    </div>
  </GalleryCardAnimations>
);

export default GalleryCard;
