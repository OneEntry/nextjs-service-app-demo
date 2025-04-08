'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { type FC } from 'react';

import DropdownAnimations from './animations/DropdownAnimations';
import DropdownButton from './DropdownButton';
import SalonsList from './salons/SalonsList';

interface SalonsProps {
  dict: IAttributeValues;
  salons: IPagesEntity[];
}

/**
 * Salons Component
 * @param salons
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
const Salons: FC<SalonsProps> = ({ dict, salons }) => {
  const tabKey = 'salons';
  // Extracting text value safely with optional chaining
  const selectSalonText = dict.select_salon_text?.value || 'Select Salon';

  return (
    <DropdownAnimations
      id={tabKey}
      index={0}
      className="mb-4 flex w-full flex-col items-center"
      tabKey={tabKey}
    >
      <DropdownButton title={selectSalonText} tabKey={tabKey} />
      <SalonsList salons={salons} tabKey={tabKey} />
    </DropdownAnimations>
  );
};

export default Salons;
