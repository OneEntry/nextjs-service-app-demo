import Image from 'next/image';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

interface OfferCircleProps {
  item: {
    title1: string;
    title2: string;
    icon: string;
  };
  dict: IAttributeValues;
}

/**
 * OfferCircle section
 *
 * @returns React component
 */
const OfferCircle: FC<OfferCircleProps> = ({ item, dict }) => {
  const { title1, title2, icon } = item;
  const altText = dict.select_txt?.value || 'Icon';

  return (
    <div className="offer-circle">
      <span className="whitespace-nowrap text-xl">{title1}</span> +{' '}
      <span className="whitespace-nowrap text-xl">{title2}</span>
      {icon && (
        <Image
          width={32}
          height={32}
          src={icon}
          alt={altText}
          className="mx-auto mt-3.5 size-8 w-14 self-center"
        />
      )}
    </div>
  );
};

export default OfferCircle;
