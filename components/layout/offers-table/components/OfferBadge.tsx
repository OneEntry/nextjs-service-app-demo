import parse from 'html-react-parser';
import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import type { FC } from 'react';

import BadgeIcon from '@/components/icons/badge';

const OfferBadge: FC<{ product: IProductEntity; color: string }> = ({
  product: { attributeValues },
  color,
}) => {
  const badge = attributeValues?.type?.value?.[0]?.title;
  if (!badge) {
    return;
  }

  return (
    <div className="flex flex-row items-center">
      <BadgeIcon color={color} />
      <div
        className={
          'size-11 justify-center self-center rounded-full px-1 py-2.5 text-center text-xs font-medium leading-3 text-white '
        }
        style={{ backgroundColor: color }}
      >
        {badge && parse(badge)}
      </div>
    </div>
  );
};

export default OfferBadge;
