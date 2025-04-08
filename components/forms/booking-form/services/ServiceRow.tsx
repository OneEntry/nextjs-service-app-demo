/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { type FC } from 'react';

interface ServicesRowProps {
  service: IPagesEntity;
  currentId: number;
  disabled: boolean;
  index: number;
  addCategoryToCart: (
    service: IPagesEntity,
    disabled: boolean,
    master: any,
  ) => void;
  master: any;
}

const ServicesRow: FC<ServicesRowProps> = ({
  service,
  currentId,
  disabled,
  master,
  addCategoryToCart,
}) => {
  const isSelected = currentId === service?.id;
  const buttonClassName = `py-2 w-full focus:text-fuchsia-500 hover:text-fuchsia-500 ${disabled ? 'text-fuchsia-100 hover:text-fuchsia-100 focus:text-fuchsia-100' : isSelected ? 'text-fuchsia-500' : ''}`;

  return (
    <div className="dropdown-item flex border-b border-b-[#d9dae1]">
      <button
        onClick={() => addCategoryToCart(service, disabled, master)}
        className={buttonClassName}
        // disabled={disabled}
      >
        {service.localizeInfos?.title || ''}
      </button>
    </div>
  );
};

export default ServicesRow;
