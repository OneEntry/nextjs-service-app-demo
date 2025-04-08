import type { IError } from 'oneentry/dist/base/utils';
import type { IOrderByMarkerEntity } from 'oneentry/dist/orders/ordersInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

interface HandleProps {
  marker: string;
  offset: number;
  limit: number;
}
/**
 * Getting all orders from the orders storage object created by the user
 *
 * @description This method requires user authorization. For more information about configuring the authorization module, see the documentation in the configuration settings section of the SDK.
 *
 * @param marker The text identifier of the order storage object
 * @param limit Limit parameter. Default 30
 * @param offset Offset parameter. Default 0
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns All user orders
 */
export const getAllOrdersByMarker = async ({
  marker,
  offset,
  limit,
}: HandleProps): Promise<{
  isError: boolean;
  error?: IError;
  orders?: IOrderByMarkerEntity[];
  total: number;
}> => {
  try {
    const data = await api.Orders.getAllOrdersByMarker(
      marker,
      'en_US',
      offset,
      limit,
    );

    if (typeError(data)) {
      return { isError: true, error: data, total: 0 };
    } else {
      return { isError: false, orders: data.items, total: data.total };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e, total: 0 };
  }
};
