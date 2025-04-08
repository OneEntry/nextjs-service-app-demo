// OrderStatus
import type { FC } from 'react';

const OrderStatus: FC<{ statusIdentifier: string }> = ({
  statusIdentifier,
}) => {
  return (
    <div className="h-[34px] w-full min-w-20 items-center justify-center rounded-3xl border border-solid border-neutral-400 bg-transparent p-1 text-center text-base font-bold uppercase leading-6 tracking-wide text-neutral-400 transition-colors duration-300 hover:border-neutral-400 hover:text-neutral-400 focus-visible:text-neutral-400 focus-visible:outline-neutral-400 disabled:border-neutral-300 disabled:text-neutral-300">
      {statusIdentifier}
    </div>
  );
};

export default OrderStatus;
