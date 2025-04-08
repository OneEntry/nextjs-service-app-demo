import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import { getBlockByMarker } from '@/app/api';
import { gradients } from '@/components/data';

import OffersAnimations from '../animations/OffersAnimations';
import OfferCard from './OfferCard';

interface OffersFeedProps {
  dict: IAttributeValues;
  block: IBlockEntity;
}

/**
 * OffersFeed section
 *
 * @returns React component
 */
const OffersFeed: FC<OffersFeedProps> = async ({ dict, block }) => {
  const data = await getBlockByMarker(block.identifier);
  if (!data.block) return null;

  const offersData = data.block.similarProducts?.items.map((offer, i) => {
    const salePrice = offer.attributeValues.sale.value || 0;
    const priceOff = ((salePrice - (offer?.price || 0)) / salePrice) * 100;
    const icon =
      offer.attributeValues.offer_type?.value[0]?.value === 'party_star'
        ? true
        : false;

    return {
      title1: offer.attributeValues.services?.value[0]?.title || '',
      title2: offer.attributeValues.services?.value[1]?.title || '',
      backgroundImage: gradients[i] || '',
      priceOff: Math.round(priceOff),
      icon,
      product: offer,
    };
  });

  return (
    <div className="flex w-full items-center justify-center">
      <OffersAnimations className="mx-auto flex w-full max-w-[1060px] flex-row flex-nowrap justify-between gap-4 overflow-x-auto overflow-y-hidden max-xl:gap-14 max-md:gap-8">
        {offersData?.map((item, index) => (
          <OfferCard
            key={index}
            index={index as number}
            item={item}
            dict={dict}
          />
        ))}
      </OffersAnimations>
    </div>
  );
};

export default OffersFeed;
