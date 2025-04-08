import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues, IError } from 'oneentry/dist/base/utils';
import type { IOrderByMarkerEntity } from 'oneentry/dist/orders/ordersInterfaces';
import { type FC, useEffect, useState } from 'react';

import { getPageById } from '@/app/api';
import AddressCard from '@/components/shared/AddressCard';
import { typeError } from '@/components/utils';

import CardAnimations from '../../animations/CardAnimations';
import OrderButtonsGroup from './components/OrderButtonsGroup';
import OrderDateTime from './components/OrderDateTime';
import OrderProductTitle from './components/OrderProductTitle';

interface OrderCardProps {
  dict: IAttributeValues;
  order: IOrderByMarkerEntity;
  master?: IAdminEntity;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRefetch: any;
  index: number;
}

async function fetchSalon(salonId: number) {
  try {
    const data = await getPageById(salonId);
    if (typeError(data)) {
      return { isError: true, error: data as IError };
    } else {
      return { isError: false, data: data };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
}

const OrderCard: FC<OrderCardProps> = ({
  dict,
  order,
  master,
  setRefetch,
  index,
}) => {
  const [salonAddress, setSalonAddress] = useState<string>('');
  const salonEntity = order.formData.find((el) => el.marker === 'order_salon');
  const salonId = salonEntity?.value[0].id;
  const salonTitle = salonEntity?.value[0].title || '';

  useEffect(() => {
    if (salonId) {
      fetchSalon(salonId).then((result) => {
        if (!result.isError && result.data) {
          setSalonAddress(
            result.data.page?.attributeValues.salon_address.value,
          );
        } else {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch salon data:', result.error);
        }
      });
    }
  }, [salonId]);

  return (
    <CardAnimations
      className="flex gap-5 rounded-2xl border border-solid border-fuchsia-500 px-4 py-3"
      index={index}
    >
      <div className="flex w-[65%] grow flex-col text-base leading-8">
        <div>
          <h4 className="text-neutral-600">{salonTitle}</h4>
          <AddressCard address={salonAddress} />
        </div>
        <OrderProductTitle order={order} />
        <hr className="h-px w-full self-center border-none bg-fuchsia-500" />
        <OrderDateTime dict={dict} order={order} />
      </div>
      <OrderButtonsGroup
        dict={dict}
        order={order}
        master={master}
        setRefetch={setRefetch}
      />
    </CardAnimations>
  );
};

export default OrderCard;
