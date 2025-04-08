'use client';

import Link from 'next/link';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import StarsGroup from '@/components/shared/StarsGroup';

interface MasterRowProps {
  dict: IAttributeValues;
  master: IAdminEntity;
  currentId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serviceCategory: any;
}

/**
 * MasterRowData
 * @param dict
 * @param master
 * @param currentId
 * @param serviceCategory
 * @returns MasterRowData
 */
const MasterRowData: FC<MasterRowProps> = ({
  dict,
  master,
  currentId,
  serviceCategory,
}) => {
  const { check_profile_text } = dict;
  const { id, attributeValues } = master;
  const { master_name, master_rating, master_short_description } =
    attributeValues;

  const name = master_name?.value ?? '';
  const rating = master_rating?.value ?? 0;
  const desc = master_short_description?.value ?? '';

  const serviceCategoryName = serviceCategory.localizeInfos?.title || '';
  const link = `/masters/${id}?service=${serviceCategory.id || ''}`;

  return (
    <div className="mt-3 flex w-[calc(100%_-_135px)] flex-col justify-start">
      {/* Data */}
      <div className="flex justify-between gap-5">
        <div className="mb-2 flex flex-col">
          <h2 className="text-lg leading-5 text-neutral-600">{name}</h2>
          <p className="mb-1 text-xs font-bold text-fuchsia-500">
            {serviceCategoryName} master
          </p>
          <StarsGroup rating={rating} size={16} />
        </div>
        <input
          className="mt-2 size-4 shrink-0 self-start rounded-full text-fuchsia-500 focus:ring-0"
          type="radio"
          value={id}
          name="masters_group"
          id={`radio-${id}`}
          defaultChecked={currentId === id}
        />
      </div>
      {/* Description */}
      <div className="mb-3 flex flex-col gap-2.5">
        <div className="text-xs leading-3 text-gray-400">
          {desc.substring(0, 90)}
        </div>
        <Link
          href={link}
          className="flex text-xs font-bold text-neutral-600 underline hover:text-fuchsia-500 focus:outline-none"
        >
          {check_profile_text?.value}
        </Link>
      </div>
    </div>
  );
};

export default MasterRowData;
