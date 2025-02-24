'use client';

import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { type FC } from 'react';

interface ServicesRowProps {
  service: IPagesEntity;
  currentId: number;
  disabled: boolean;
  addCategoryToCart: (service: IPagesEntity) => void;
}

const ServicesRow: FC<ServicesRowProps> = ({
  service,
  currentId,
  disabled,
  addCategoryToCart,
}) => {
  const isSelected = currentId === service?.id;
  const buttonClassName = `dropdown-submenu-btn ${disabled ? 'text-fuchsia-100 hover:text-fuchsia-100 focus:text-fuchsia-100' : isSelected ? 'text-fuchsia-500' : ''}`;

  return (
    <li className="flex border-b border-b-[#d9dae1]">
      <button
        onClick={() => !disabled && addCategoryToCart(service)}
        className={buttonClassName}
        disabled={disabled}
      >
        {service.localizeInfos?.title || ''}
      </button>
    </li>
  );
};

export default ServicesRow;
