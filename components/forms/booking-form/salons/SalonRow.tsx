'use client';

import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

export type TabLayoutProps = {
  salon: IPagesEntity;
  currentId: number;
  disabled: boolean;
  addSalonToCart: (salon: IPagesEntity, disabled: boolean) => void;
};

const SalonRow: FC<TabLayoutProps> = ({
  salon,
  currentId,
  disabled,
  addSalonToCart,
}) => {
  const isSelected = currentId === salon?.id;
  const buttonClassName = `dropdown-submenu-btn ${disabled ? 'text-fuchsia-100 hover:text-fuchsia-100 focus:text-fuchsia-100' : isSelected ? 'text-fuchsia-500' : ''}`;

  return (
    <li className="flex border-b border-b-[#d9dae1]">
      <button
        onClick={() => !disabled && addSalonToCart(salon, disabled)}
        className={buttonClassName}
        disabled={disabled}
      >
        {salon.localizeInfos?.title || ''}
      </button>
    </li>
  );
};

export default SalonRow;
