import type { FC } from 'react';

import AddressCard from '@/components/shared/AddressCard';
import StarsGroup from '@/components/shared/StarsGroup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookingCardInfo: FC<{ salon: any; service: any; master: any }> = ({
  salon,
  service,
  master,
}) => {
  const masterName = master.attributeValues?.master_name?.value;
  const spec = service.localizeInfos?.title;
  const rating = master.attributeValues?.master_rating?.value;

  const salonTitle = salon.localizeInfos?.title || 'Any';
  const salonAddress = salon.attributeValues?.salon_address?.value || 'Any';

  return (
    <div className="mb-2.5 flex flex-col flex-wrap content-start">
      <h2 className="mb-0.5 text-lg leading-4 text-neutral-600">
        {masterName}
      </h2>
      <div className="mb-1 text-xs font-bold text-fuchsia-500">
        {spec} master
      </div>
      <StarsGroup rating={rating} size={16} />
      {salonTitle !== 'Any' && (
        <div className="mt-2 text-base">{salonTitle}</div>
      )}
      {salonAddress !== 'Any' && <AddressCard address={salonAddress} />}
      <hr className="relative mt-2 h-px w-full self-center border-b border-solid border-b-[#f587f7]" />
    </div>
  );
};

export default BookingCardInfo;
