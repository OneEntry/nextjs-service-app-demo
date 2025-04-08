'use client';

import type { IProductEntity } from 'oneentry/dist/products/productsInterfaces';
import { type FC, useMemo } from 'react';

import TableRowAnimations from '../../products-table/animations/TableRowAnimations';
import OfferBadge from './OfferBadge';
import PriceDisplay from './PriceCell';
import ServicesCell from './ServicesCell';

interface OfferRowProps {
  product: IProductEntity;
  color: string;
  isLast: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick: any;
  index: number;
}

const OfferRow: FC<OfferRowProps> = ({
  product,
  handleClick,
  isLast,
  color,
  index,
}) => {
  const cn = useMemo(() => {
    const baseClass =
      'align-middle max-md:max-w-full max-md:flex-wrap cursor-pointer group ';
    const borderClass = isLast ? '' : 'border-b border-solid';
    const highlightClass = '';
    return `${baseClass} ${borderClass}${highlightClass}`;
  }, [isLast]);

  return (
    <TableRowAnimations
      className={cn}
      onClick={() => handleClick(product)}
      index={index}
    >
      {/* services */}
      <td className="w-[200px] py-1.5 pr-5 align-middle">
        <ServicesCell product={product} color={color} />
      </td>
      {/* badge */}
      <td className="pr-5 align-middle">
        <OfferBadge product={product} color={color} />
      </td>
      {/* prices */}
      <td className="py-1.5 pl-5 text-right align-middle">
        <PriceDisplay product={product} color={color} />
      </td>
    </TableRowAnimations>
  );
};

export default OfferRow;
