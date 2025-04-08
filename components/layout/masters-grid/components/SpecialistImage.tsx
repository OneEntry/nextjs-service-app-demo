import Image from 'next/image';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

interface SpecialistImageProps {
  item: IAdminEntity;
}

/**
 * SpecialistImage
 * @param item
 * @returns SpecialistImage
 */
const SpecialistImage: FC<SpecialistImageProps> = ({ item }) => {
  const { master_image, master_name } = item.attributeValues;
  const title = master_name?.value || '';
  const imageSrc = master_image?.value?.[0]?.downloadLink;

  return (
    <figure className="relative flex h-[280px] w-full flex-col overflow-hidden rounded-2xl">
      {imageSrc && (
        <Image
          fill
          src={imageSrc}
          alt={title}
          loading="lazy"
          sizes="(min-width: 600px) 50vw, 100vw"
          className="aspect-[0.86] size-full object-cover transition-transform duration-500 group-hover:scale-125"
        />
      )}
    </figure>
  );
};

export default SpecialistImage;
