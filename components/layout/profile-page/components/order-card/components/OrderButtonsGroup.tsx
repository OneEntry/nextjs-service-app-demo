import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IOrderByMarkerEntity } from 'oneentry/dist/orders/ordersInterfaces';
import { type FC, useState } from 'react';

import CancelOrderButton from './CancelOrderButton';
import EditOrderButton from './EditOrderButton';
import OrderStatus from './OrderStatus';
import RepeatOrder from './RepeatOrder';
import SaveOrderButton from './SaveOrderButton';

interface OrderCardProps {
  dict: IAttributeValues;
  order: IOrderByMarkerEntity;
  master?: IAdminEntity;
  setRefetch: boolean;
}

const OrderButtonsGroup: FC<OrderCardProps> = ({
  dict,
  order,
  master,
  setRefetch,
}) => {
  const { statusIdentifier } = order;
  const [editState, setEditState] = useState<IOrderByMarkerEntity>();

  return (
    <div
      className={`flex w-[30%] flex-col gap-3 text-base font-bold tracking-wide`}
    >
      {statusIdentifier === 'upcoming' ? (
        <>
          {editState ? (
            <SaveOrderButton
              dict={dict}
              orderData={editState}
              setEditState={setEditState}
              setRefetch={setRefetch}
            />
          ) : (
            <EditOrderButton
              dict={dict}
              orderData={order}
              setEditState={setEditState}
            />
          )}
          <CancelOrderButton
            dict={dict}
            orderData={order}
            setRefetch={setRefetch}
          />
        </>
      ) : statusIdentifier === 'canceled' ? (
        <OrderStatus statusIdentifier={statusIdentifier} />
      ) : (
        <RepeatOrder dict={dict} orderData={order} master={master} />
      )}
    </div>
  );
};

export default OrderButtonsGroup;
