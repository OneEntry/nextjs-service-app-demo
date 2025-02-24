/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { FC } from 'react';

import { orderStates } from '@/components/data';

const OrderStateSelect: FC<{ orderState: any; setOrderState: any }> = ({
  orderState,
  setOrderState,
}) => {
  return (
    <select
      onChange={(e) => {
        setOrderState(e.target.value);
      }}
      defaultValue={orderState}
      className="mb-6 flex w-[160px] gap-5 border-none py-1.5 text-lg text-gray-400"
    >
      {orderStates.map((orderState, i) => {
        return (
          <option key={i} value={orderState.value}>
            {orderState.title}
          </option>
        );
      })}
    </select>
  );
};

export default OrderStateSelect;
