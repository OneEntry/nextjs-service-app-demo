import type { FC } from 'react';

import LocationIcon from '@/components/icons/location';

interface Salon {
  title: string;
}

interface MasterSalonsProps {
  salons: { value: Salon[] };
}

/**
 * MasterSalons component to display a list of salons.
 * @param salons - An object containing an array of salon objects.
 * @returns JSX.Element representing the MasterSalons component.
 */
const MasterSalons: FC<MasterSalonsProps> = ({ salons }) => {
  if (!salons) {
    return null;
  }

  return salons.value.map((salon, index) => (
    <address key={index} className="flex gap-3.5 not-italic max-sm:gap-2.5">
      <LocationIcon size={5} />
      <span className="my-auto flex-auto leading-5 text-gray-700">
        {salon.title}
      </span>
    </address>
  ));
};

export default MasterSalons;
