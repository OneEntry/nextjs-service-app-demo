import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type {
  IOrderByMarkerEntity,
  IOrderData,
} from 'oneentry/dist/orders/ordersInterfaces';
import type { Dispatch, FC, SetStateAction } from 'react';

import { updateOrderByMarkerAndId } from '@/app/api';

interface SaveOrderButtonProps {
  orderData?: IOrderByMarkerEntity;
  dict: IAttributeValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefetch: any;
  setEditState: Dispatch<SetStateAction<IOrderByMarkerEntity | undefined>>;
}

/**
 * SaveOrderButton Component
 *
 * @param orderData - The order data to be saved.
 * @param dict - Dictionary for localized text values.
 * @returns JSX.Element
 */
const SaveOrderButton: FC<SaveOrderButtonProps> = ({
  orderData,
  setEditState,
  setRefetch,
}) => {
  const handleSaveOrder = async () => {
    if (!orderData) return;

    const formData = {
      ...orderData,
      products: orderData.products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
      })),
      statusIdentifier: 'completed',
    } as IOrderData;

    await updateOrderByMarkerAndId({
      marker: 'orders',
      id: orderData.id,
      data: formData,
    });
    setRefetch(true);
    setEditState(undefined);
  };

  return (
    <button
      onClick={handleSaveOrder}
      type="button"
      className="btn-o btn-o-primary btn-o-sm"
    >
      {'Save'}
    </button>
  );
};

export default SaveOrderButton;
