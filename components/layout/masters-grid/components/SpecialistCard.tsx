import Link from 'next/link';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

import CardAnimations from '@/app/animations/CardAnimations';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import StarsGroup from '@/components/shared/StarsGroup';

import SpecialistImage from './SpecialistImage';

interface SpecialistCardProps {
  item: IAdminEntity;
  index: number;
  specialization: {
    id: string;
    title: string;
    pageUrl: string;
  };
}

/**
 * Specialist Card
 *
 * @param item
 * @param index
 * @param specialization
 * @returns SpecialistCard
 */
const SpecialistCard: FC<SpecialistCardProps> = async ({
  item,
  index,
  specialization,
}) => {
  const [dict] = ServerProvider('dict');
  const { check_profile_text } = dict;
  const { id, attributeValues } = item;
  const { master_name, master_rating } = attributeValues;
  const title = master_name?.value || '';
  const spec = specialization.title + ' master';
  const rating = master_rating?.value;
  const link = '/masters/' + id + '?service=' + specialization.id;

  return (
    <CardAnimations className="group relative w-[240px]" index={index}>
      <SpecialistImage item={item} />
      <div className="flex items-center justify-between gap-2 px-3 py-4">
        <div className="my-auto flex flex-col justify-between gap-2">
          <h3 className="text-nowrap text-base leading-4 text-neutral-600">
            {title}
          </h3>
          <p className="justify-center text-xs font-bold text-fuchsia-500">
            {spec}
          </p>
        </div>
        <div className="relative box-border flex shrink-0 flex-col gap-2.5 text-right">
          <StarsGroup rating={Number(rating)} size={14} />
          <Link
            href={link}
            className="self-end text-xs font-bold text-neutral-600 underline focus:outline-none group-hover:text-fuchsia-500"
          >
            {check_profile_text?.value}
          </Link>
        </div>
        <Link
          href={link}
          className="absolute left-0 top-0 size-full focus:outline-none"
          title={title}
        ></Link>
      </div>
    </CardAnimations>
  );
};

export default SpecialistCard;
