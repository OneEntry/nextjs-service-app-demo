// OrderStatus
import type { FC } from 'react';

const OrderStatus: FC<{ statusIdentifier: string }> = ({
  statusIdentifier,
}) => {
  return (
    <div className="btn-o btn-o-gray btn-o-sm w-full px-4 py-2 text-center uppercase">
      {statusIdentifier}
    </div>
  );
};

export default OrderStatus;
