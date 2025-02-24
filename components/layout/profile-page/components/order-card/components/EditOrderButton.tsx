import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IOrderByMarkerEntity } from 'oneentry/dist/orders/ordersInterfaces';
import type { Dispatch, FC, SetStateAction } from 'react';

interface EditOrderButtonProps {
  orderData?: IOrderByMarkerEntity;
  dict: IAttributeValues;
  setEditState: Dispatch<SetStateAction<IOrderByMarkerEntity | undefined>>;
}

/**
 * Edit Order Button Component
 *
 * @param orderData - The order data to be edited.
 * @param dict - Dictionary for localized text values.
 * @returns JSX.Element
 */
const EditOrderButton: FC<EditOrderButtonProps> = ({
  orderData,
  dict,
  setEditState,
}) => {
  const handleEditOrder = () => {
    if (orderData) {
      setEditState(orderData);
    }
  };

  return (
    <button
      onClick={handleEditOrder}
      type="button"
      className="btn-o btn-o-primary btn-o-sm"
    >
      {dict.edit_text?.value || 'Edit'}
    </button>
  );
};

export default EditOrderButton;
