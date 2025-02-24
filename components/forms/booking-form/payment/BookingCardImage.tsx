import Image from 'next/image';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

const BookingCardImage: FC<{ master: IAdminEntity }> = ({ master }) => {
  const imageSrc = master.attributeValues?.master_image?.value[0]?.downloadLink;
  const masterName = master.attributeValues?.master_name?.value;

  return (
    <figure className="relative mb-4 flex h-[160px] w-full flex-col items-center justify-center self-start overflow-hidden rounded-2xl">
      {imageSrc && (
        <Image
          fill
          sizes="(min-width: 600px) 50vw, 100vw"
          loading="lazy"
          src={imageSrc}
          className="size-full object-cover"
          alt={masterName}
        />
      )}
    </figure>
  );
};

export default BookingCardImage;
