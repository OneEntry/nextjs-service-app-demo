import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import StarLgIcon from '@/components/icons/star-lg';

interface OfferCircleProps {
  item: {
    title1: string;
    title2: string;
    icon: boolean;
  };
  dict: IAttributeValues;
}

/**
 * OfferCircle section
 *
 * @returns React component
 */
const OfferCircle: FC<OfferCircleProps> = ({ item }) => {
  const { title1, title2, icon } = item;

  return (
    <div className="-mt-24 mb-5 size-[260px] justify-center rounded-full bg-gray-700 px-10 pb-10 pt-32 text-xl leading-8 transition-transform duration-500 group-hover:scale-110">
      <span className="whitespace-nowrap text-xl">{title1}</span> +{' '}
      <span className="whitespace-nowrap text-xl">{title2}</span>
      {icon && <StarLgIcon />}
    </div>
  );
};

export default OfferCircle;
