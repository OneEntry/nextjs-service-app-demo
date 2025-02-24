/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import { visitData } from '@/components/data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderDateTime: FC<{ dict: IAttributeValues; order: any }> = ({
  dict,
  order,
}) => {
  const { services } = visitData;
  return (
    <div className="mt-2 flex gap-5 whitespace-nowrap">
      <time dateTime={services[0].date} className="text-neutral-600 underline">
        {services[0].date}
      </time>
      <time
        dateTime={services[0].time}
        className="flex-auto font-medium text-fuchsia-500"
      >
        {services[0].time}
      </time>
    </div>
  );
};

export default OrderDateTime;
