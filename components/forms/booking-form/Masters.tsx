'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import DropdownAnimations from './animations/DropdownAnimations';
import DropdownButton from './DropdownButton';
import MastersList from './masters/MastersList';

interface MastersLayoutProps {
  masters: IAdminEntity[];
  dict: IAttributeValues;
}

/**
 * MastersLayout Component
 * @param dict dictionary for localization from server api
 * @param masters - containing masters data
 * @returns JSX.Element
 */
const MastersLayout: FC<MastersLayoutProps> = ({ masters, dict }) => {
  const tabKey = 'masters';
  // Safely extract text value with optional chaining and provide a default
  const selectMasterText = dict.select_master_text?.value ?? 'Select Master';

  return (
    <DropdownAnimations
      id={tabKey}
      className="mb-4 flex w-full flex-col items-center"
      index={3}
      tabKey={tabKey}
    >
      <DropdownButton title={selectMasterText} tabKey={tabKey} />
      <MastersList dict={dict} masters={masters} tabKey={tabKey} />
    </DropdownAnimations>
  );
};

export default MastersLayout;
