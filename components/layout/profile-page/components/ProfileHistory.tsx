'use client';

import { useSearchParams } from 'next/navigation';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IOrderByMarkerEntity } from 'oneentry/dist/orders/ordersInterfaces';
import type { Key } from 'react';
import { type FC, useCallback, useContext, useEffect, useState } from 'react';

import { getAllOrdersByMarker } from '@/app/api';
import { AuthContext } from '@/app/store/providers/AuthContext';
import OrderCard from '@/components/layout/profile-page/components/order-card';

import MasterCard from './master-card';

interface ProfileHistoryProps {
  dict: IAttributeValues;
  eventType: string;
  masters?: IAdminEntity[];
}

interface GroupedOrder {
  master: number;
  orders: IOrderByMarkerEntity[];
}

const ProfileHistory: FC<ProfileHistoryProps> = ({
  dict,
  eventType,
  masters,
}) => {
  const searchParams = useSearchParams();
  const { isAuth } = useContext(AuthContext);
  const [orders, setOrders] = useState<IOrderByMarkerEntity[]>([]);
  const [ordersData, setOrdersData] = useState<GroupedOrder[]>([]);
  const [refetch, setRefetch] = useState(false);

  const currentPage = Number(searchParams.get('page')) || 0;
  const pageLimit = 100;

  // get all orders by Marker
  const fetchOrders = useCallback(async () => {
    if (!isAuth) return;
    const { isError, error, orders } = await getAllOrdersByMarker({
      marker: 'orders',
      offset: currentPage * pageLimit,
      limit: pageLimit,
    });

    if (orders && !isError) {
      setOrders(orders.filter((order) => order.statusIdentifier === eventType));
    } else if (isError) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setRefetch(false);
  }, [currentPage, eventType, isAuth, pageLimit]);

  // fetchOrders
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, refetch]);

  // setOrdersData
  useEffect(() => {
    const groupedData = orders.reduce<Record<number, GroupedOrder>>(
      (acc, order) => {
        const masterId =
          order.formData.find((field) => field.marker === 'master')?.value[0]
            ?.value || 0;
        if (!acc[masterId]) {
          acc[masterId] = { master: masterId, orders: [] };
        }
        acc[masterId].orders.push(order);
        return acc;
      },
      {},
    );
    const sortedResult = Object.values(groupedData).sort(
      (a, b) => a.master - b.master,
    );
    setOrdersData(sortedResult);
  }, [orders]);

  // orders not found
  if (ordersData.length === 0) {
    return <div className="w-full text-xl">History not found</div>;
  }

  // render orders table
  return (
    <div className="w-full">
      {ordersData.map(({ master, orders }, i) => {
        const masterData = masters?.find(
          (m: IAdminEntity) => m.id === Number(master),
        );
        const { attributeValues } = masterData || ({} as IAdminEntity);

        return (
          <div
            key={i}
            className="mb-5 flex justify-between gap-5 max-md:max-w-full max-md:flex-wrap"
          >
            <MasterCard attributeValues={attributeValues} />
            <div className="mb-4 flex w-[calc(100%_-_160px)] flex-col gap-3">
              {orders?.map((order: IOrderByMarkerEntity, i: Key | number) => {
                return (
                  <OrderCard
                    key={i}
                    index={i as number}
                    dict={dict}
                    order={order}
                    master={masterData}
                    setRefetch={setRefetch}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileHistory;
