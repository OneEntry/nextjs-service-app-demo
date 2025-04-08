/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import CardAnimations from '@/app/animations/CarouselCardAnimations';

import CardImage from './CardImage';
import CardInfo from './CardInfo';

interface CardDataProps {
  name: string;
  link: string;
  img: string;
  thumb: string;
  preview: any;
  spec: {
    title: string;
  };
}

interface GalleryCardProps {
  dict: IAttributeValues;
  cardData: CardDataProps;
  setState: any;
  index: number;
  setCurrentIndex: any;
}

const GalleryCard: FC<GalleryCardProps> = ({
  dict,
  cardData,
  setState,
  index,
  // setCurrentIndex,
}) => (
  <div
    className="group relative flex h-[320px] max-md:h-[280px] min-w-[16.5vw] flex-col overflow-hidden max-2xl:min-w-[20vw] max-xl:min-w-[25vw] max-lg:min-w-[25vw] max-md:min-h-[260px] max-md:min-w-[33.3333vw] max-xs:min-h-[240px] max-xs:min-w-[50vw]"
    onPointerEnter={() => setState(true)}
    onPointerLeave={() => setState(false)}
    // onClick={() => setCurrentIndex(index)}
  >
    <CardAnimations
      className="relative flex w-full flex-col justify-center text-sm text-white"
      index={index}
      setState={setState}
    >
      <figure className="relative flex h-[320px] max-md:h-[280px] w-full flex-col overflow-hidden bg-slate-100">
        <CardImage cardData={cardData} />
      </figure>
      <div className="gallery-card-info absolute bottom-0 left-0 w-full bg-transparent">
        <CardInfo dict={dict} cardData={cardData} />
        <div className="gallery-card-info-bg"></div>
      </div>
    </CardAnimations>
  </div>
);

export default GalleryCard;
