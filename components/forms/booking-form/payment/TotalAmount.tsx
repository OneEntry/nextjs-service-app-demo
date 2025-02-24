import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { selectCartTotal } from '@/app/store/reducers/CartSlice';
import { UsePrice } from '@/components/utils';

interface TotalAmountProps {
  dict: IAttributeValues;
}

/**
 * Total amount price of all products in cart
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
const TotalAmount: FC<TotalAmountProps> = ({ dict }) => {
  const total = useAppSelector(selectCartTotal);
  const title = dict?.order_info_total?.value || 'Total';
  return (
    <div className="mb-5 flex w-full flex-col gap-2.5 self-start leading-[94%]">
      <div className="relative box-border flex w-full shrink-0 flex-row justify-between self-stretch font-medium text-neutral-600">
        <span>{title}: </span>
        <span>
          <UsePrice amount={total || 0} />
        </span>
      </div>
    </div>
  );
};

export default TotalAmount;
