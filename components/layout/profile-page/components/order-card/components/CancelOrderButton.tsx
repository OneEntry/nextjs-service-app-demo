import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type {
  IOrderByMarkerEntity,
  IOrderData,
} from 'oneentry/dist/orders/ordersInterfaces';
import type { FC } from 'react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { updateOrderByMarkerAndId } from '@/app/api';

interface CancelOrderButtonProps {
  dict: IAttributeValues;
  orderData?: IOrderByMarkerEntity;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefetch: any;
}

/**
 * Cancel order button
 * @param orderData IOrderByMarkerEntity
 * @param dict
 *
 * @returns JSX.Element
 */
const CancelOrderButton: FC<CancelOrderButtonProps> = ({
  dict,
  orderData,
  setRefetch,
}) => {
  const { cancel_text } = dict;

  // Memoized cancel order handler
  const cancelOrderHandle = useCallback(async () => {
    if (!orderData) return;

    const { id, products } = orderData;
    const formData = {
      ...orderData,
      products: products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      statusIdentifier: 'canceled',
    } as IOrderData;

    await updateOrderByMarkerAndId({
      marker: 'orders',
      id,
      data: formData,
    });
    setRefetch(true);
    toast('Order canceled!');
  }, [orderData, setRefetch]);

  return (
    <button
      onClick={cancelOrderHandle}
      type="button"
      className="h-[40px] min-w-20 items-center justify-center rounded-3xl border border-solid border-neutral-400 bg-transparent p-1 text-base font-bold leading-6 tracking-wide text-neutral-400 transition-colors duration-300 hover:border-neutral-400 hover:text-neutral-400 focus-visible:text-neutral-400 focus-visible:outline-neutral-400 disabled:border-neutral-300 disabled:text-neutral-300"
    >
      {cancel_text?.value || 'Cancel'}
    </button>
  );
};

export default CancelOrderButton;
