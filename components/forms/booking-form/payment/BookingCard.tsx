import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import {
  selectCartData,
  selectServiceId,
} from '@/app/store/reducers/CartSlice';

import BookingCardDate from './BookingCardDate';
import BookingCardImage from './BookingCardImage';
import BookingCardInfo from './BookingCardInfo';
import TotalAmount from './TotalAmount';

const BookingCard: FC<{ dict: IAttributeValues }> = ({ dict }) => {
  const serviceId = useAppSelector(selectServiceId);
  const servicesData = useAppSelector(selectCartData);
  if (!servicesData) {
    return;
  }

  const { salon, service, master, product, date } = servicesData[serviceId];
  const spec = service.localizeInfos?.title;
  const serviceTitle = product.localizeInfos?.title;

  return (
    <div className="flex w-full flex-col items-end self-stretch rounded-2xl border border-solid border-[#f587f7] p-3.5">
      <div className="flex w-full justify-start gap-5 self-stretch">
        <div className="flex w-4/12 flex-col">
          <BookingCardImage master={master} />
        </div>
        <div className="flex w-8/12 flex-col">
          <BookingCardInfo salon={salon} service={service} master={master} />
          <div className="mb-1 text-base">
            {spec} - {serviceTitle}
          </div>
          <BookingCardDate date={date} />
          <TotalAmount dict={dict} />
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
