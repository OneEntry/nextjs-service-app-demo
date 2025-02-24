import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

import OfferCircle from './OfferCircle';
import OfferInfo from './OfferInfo';

interface OfferCardProps {
  dict: IAttributeValues;
  item: {
    title1: string;
    title2: string;
    backgroundImage: string;
    priceOff: number;
    icon: string;
    product: IProductEntity;
  };
}

/**
 * OfferCard section
 * @returns React component
 */
const OfferCard: FC<OfferCardProps> = ({ dict, item }) => {
  const { backgroundImage } = item;
  return (
    <div
      style={{
        backgroundImage: backgroundImage,
      }}
      className="offer group"
    >
      <div className="mx-auto flex h-auto w-full grow-0 flex-col items-center overflow-hidden rounded-[30px] pb-8">
        <OfferCircle item={item} dict={dict} />
        <OfferInfo item={item} dict={dict} />
      </div>
    </div>
  );
};

export default OfferCard;
