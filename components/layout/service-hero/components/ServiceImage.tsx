import Image from 'next/image';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

const ServiceImage: FC<{ page: IPagesEntity }> = ({ page }) => {
  const { service_hero_bg } = page.attributeValues;
  const heroImage = service_hero_bg?.value[0]?.downloadLink;

  return (
    <div className="bg-wrapper bg-gradient-1 absolute inset-0 size-full">
      <Image
        fill
        src={heroImage}
        sizes="(min-width: 1200px) 50vw, 100vw"
        priority
        className="inset-0 mx-auto size-full max-w-[2000px] object-cover"
        alt={page.localizeInfos?.title}
      />
    </div>
  );
};

export default ServiceImage;
