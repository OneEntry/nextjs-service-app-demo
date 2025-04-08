import Image from 'next/image';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

import Placeholder from '@/components/shared/Placeholder';

const MasterCardImage: FC<{
  master: IAdminEntity;
}> = ({ master }) => {
  const { attributeValues } = master;
  const imageSrc = attributeValues?.master_image?.value?.[0]?.downloadLink;
  const name = attributeValues?.master_name?.value;

  return imageSrc ? (
    <Image
      width={480}
      height={640}
      src={imageSrc}
      alt={name || 'Master Image'}
      loading="lazy"
      className="gallery-card-img relative h-[320px] w-full object-cover duration-500 group-hover:scale-125 group-hover:transition-transform"
    />
  ) : (
    <Placeholder />
  );
};

export default MasterCardImage;
