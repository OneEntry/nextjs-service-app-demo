import type { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderProductTitle: FC<{ order: any }> = ({ order }) => {
  return (
    <p className="mb-2.5 mt-1.5 text-neutral-600">{order.products[0].title}</p>
  );
};

export default OrderProductTitle;
