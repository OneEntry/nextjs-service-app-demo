'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import MasterRowData from './MasterRowData';
import MasterRowImage from './MasterRowImage';

interface MasterRowProps {
  dict: IAttributeValues;
  master: IAdminEntity;
  serviceCategoryName: string;
  currentId: number;
  addMasterToCart: (master: IAdminEntity) => void;
}

/**
 * MasterRow
 * @param dict
 * @param master
 * @param serviceCategoryName
 * @param currentId
 * @param addMasterToCart
 * @returns MasterRow
 */
const MasterRow: FC<MasterRowProps> = ({
  dict,
  master,
  serviceCategoryName,
  currentId,
  addMasterToCart,
}) => {
  return (
    <label
      htmlFor={`radio-${master.id}`}
      onClick={() => addMasterToCart(master)}
      className="card-label flex w-full cursor-pointer items-start justify-between gap-5 rounded-2xl border border-transparent pr-2.5 transition-colors duration-300 hover:border-fuchsia-500"
    >
      <MasterRowImage master={master} />
      <MasterRowData
        dict={dict}
        master={master}
        serviceCategoryName={serviceCategoryName}
        currentId={currentId}
      />
    </label>
  );
};

export default MasterRow;
