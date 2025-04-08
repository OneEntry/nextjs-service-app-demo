import Image from 'next/image';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

import StarsGroup from '@/components/shared/StarsGroup';

const SpecialistCardH: FC<{
  item: IAdminEntity;
}> = ({ item }) => {
  const { attributeValues } = item;
  const { master_image, master_name, specialization, master_rating } =
    attributeValues;
  const title = master_name?.value;
  const spec = specialization?.value?.[0]?.title;
  const rating = master_rating?.value;
  const imageSrc = master_image?.value?.[0]?.downloadLink;

  return (
    <div className="flex grow-0 gap-5">
      <figure className="flex">
        <Image
          width={200}
          height={240}
          src={imageSrc}
          className="h-[120px] w-[100px] rounded-2xl object-cover"
          alt={title}
        />
      </figure>
      <div className="flex w-auto grow flex-col text-base leading-8">
        <h2 className="text-lg leading-6 text-slate-400">{title}</h2>
        <p className="mb-2.5 text-xs font-bold leading-3 text-fuchsia-500">
          {spec}
        </p>
        <StarsGroup rating={rating} size={20} />
      </div>
    </div>
  );
};

export default SpecialistCardH;
