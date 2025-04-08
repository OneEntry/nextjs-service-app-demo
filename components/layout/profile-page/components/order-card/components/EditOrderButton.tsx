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
      className="h-[40px] min-w-20 items-center justify-center rounded-3xl border border-solid border-fuchsia-500 bg-transparent p-1 text-base font-bold leading-6 tracking-wide text-fuchsia-500 transition-colors duration-300 hover:border-fuchsia-600 hover:text-fuchsia-600 focus-visible:text-fuchsia-600 focus-visible:outline-fuchsia-600 disabled:border-neutral-300 disabled:text-neutral-300"
    >
      {dict.edit_text?.value || 'Edit'}
    </button>
  );
};

export default EditOrderButton;
