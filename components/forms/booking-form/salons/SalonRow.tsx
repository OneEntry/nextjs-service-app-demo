'use client';

import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

export type TabLayoutProps = {
  salon: IPagesEntity;
  currentId: number;
  disabled: boolean;
  index: number;
  addSalonToCart: (salon: IPagesEntity, disabled: boolean) => void;
};

const SalonRow: FC<TabLayoutProps> = ({
  salon,
  currentId,
  disabled,
  addSalonToCart,
}) => {
  const isSelected = currentId === salon?.id;
  const buttonClassName = `py-2 w-full focus:text-fuchsia-500 hover:text-fuchsia-500 ${disabled ? 'text-fuchsia-100 hover:text-fuchsia-100 focus:text-fuchsia-100' : isSelected ? 'text-fuchsia-500' : ''}`;

  return (
    <div className="dropdown-item flex border-b border-b-[#d9dae1]">
      <button
        onClick={() => !disabled && addSalonToCart(salon, disabled)}
        className={buttonClassName}
        disabled={disabled}
      >
        {salon.localizeInfos?.title || ''}
      </button>
    </div>
  );
};

export default SalonRow;
