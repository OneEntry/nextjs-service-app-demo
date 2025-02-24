/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

interface MasterCardInfoProps {
  dict: IAttributeValues;
  master: IAdminEntity;
}

const MasterCardInfo: FC<MasterCardInfoProps> = ({ dict, master }) => {
  const { id, attributeValues } = master;
  const name = attributeValues.master_name?.value;
  const services = attributeValues.services?.value;
  const specialization =
    (services !== '' && services?.find((el: any) => el.id > 0)) || [];
  const checkProfileText = dict.check_profile_text?.value;

  if (!specialization) {
    return;
  }
  return (
    <div className="gallery-card-info absolute bottom-0 left-0 w-full bg-transparent">
      <div className="gallery-card-content flex size-full flex-col gap-1 px-8 py-6 max-sm:px-5">
        <div className="text-xl leading-5 max-md:text-lg max-sm:text-base">
          {name}
        </div>
        <div className="text-sm font-bold leading-4 max-sm:text-xs">
          {specialization.title}
        </div>
        <Link
          href={`/masters/${id}?service=${specialization.id}`}
          className="text-sm underline hover:text-fuchsia-500 focus:outline-none max-sm:text-xs"
        >
          {checkProfileText}
        </Link>
      </div>
      <div className="gallery-card-info-bg"></div>
    </div>
  );
};

export default MasterCardInfo;
