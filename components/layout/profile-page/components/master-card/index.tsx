'use client';

import Image from 'next/image';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import StarsGroup from '@/components/shared/StarsGroup';

import CardAnimations from '../../animations/CardAnimations';

interface ProfileHistoryProps {
  attributeValues: IAttributeValues;
}

const MasterCard: FC<ProfileHistoryProps> = ({ attributeValues }) => {
  const imgSrc = attributeValues?.master_image.value[0].downloadLink;
  const masterName = attributeValues?.master_name?.value;
  const masterRating = attributeValues?.master_rating?.value;

  return (
    <CardAnimations className="flex flex-col self-stretch" index={0}>
      {imgSrc && (
        <Image
          width={160}
          height={180}
          loading="lazy"
          src={imgSrc}
          className="aspect-[0.86] w-[160px] self-center rounded-2xl object-cover"
          alt={'Profile image of ' + masterName}
        />
      )}
      <h3 className="mt-4 text-xl font-medium leading-4 text-fuchsia-500">
        {masterName}
      </h3>
      <p className="mt-1 text-xs font-bold leading-8 text-neutral-600">
        {masterName} haircut
      </p>
      <div className="mb-2">
        <StarsGroup rating={masterRating} size={16} />
      </div>
    </CardAnimations>
  );
};

export default MasterCard;
