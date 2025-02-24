'use client';

import Image from 'next/image';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

/**
 * MasterRowImage
 * @param master
 * @returns MasterRowImage
 */
const MasterRowImage: FC<{ master: IAdminEntity }> = ({ master }) => {
  const { attributeValues } = master;
  const { master_name, master_image } = attributeValues;

  const name = master_name?.value ?? '';
  const imageSrc = master_image?.value[0]?.downloadLink ?? '';

  return (
    <div className="relative flex h-full min-h-[160px] w-[135px]">
      {imageSrc && (
        <Image
          height={160}
          width={135}
          sizes="(min-width: 480px) 50vw, 100vw"
          src={imageSrc}
          className="h-full min-h-full w-[135px] rounded-2xl object-cover"
          alt={name}
        />
      )}
    </div>
  );
};

export default MasterRowImage;
