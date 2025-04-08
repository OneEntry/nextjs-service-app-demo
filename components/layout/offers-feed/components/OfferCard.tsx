import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

import CardAnimations from '@/app/animations/CardAnimations';

import OfferCircle from './OfferCircle';
import OfferInfo from './OfferInfo';

interface OfferCardProps {
  dict: IAttributeValues;
  item: {
    title1: string;
    title2: string;
    backgroundImage: string;
    priceOff: number;
    icon: boolean;
    product: IProductEntity;
  };
  index: number;
}

/**
 * OfferCard section
 * @returns React component
 */
const OfferCard: FC<OfferCardProps> = ({ dict, item, index }) => {
  const { backgroundImage } = item;
  return (
    <CardAnimations
      style={{
        backgroundImage: backgroundImage,
      }}
      className="group flex h-full w-3/12 min-w-[200px] max-w-[220px] flex-col justify-center rounded-[30px] text-center font-bold uppercase text-white max-lg:w-[48%]"
      index={index}
    >
      <div className="mx-auto flex h-auto w-full grow-0 flex-col items-center overflow-hidden rounded-[30px] pb-8">
        <OfferCircle item={item} dict={dict} />
        <OfferInfo item={item} dict={dict} />
      </div>
    </CardAnimations>
  );
};

export default OfferCard;
