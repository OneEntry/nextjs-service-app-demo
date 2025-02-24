/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTransitionRouter } from 'next-transition-router';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import { getPageById, getProductById } from '@/app/api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectServiceId,
} from '@/app/store/reducers/CartSlice';
import ReviewsIcon from '@/components/icons/reviews';
import StarOpenIconLg from '@/components/icons/star-o-lg';

interface RepeatOrderProps {
  dict: IAttributeValues;
  orderData: any;
  master?: IAdminEntity;
}
const RepeatOrder: FC<RepeatOrderProps> = ({ dict, orderData, master }) => {
  const dispatch = useAppDispatch();
  const router = useTransitionRouter();
  const serviceId = useAppSelector(selectServiceId);
  const { book_again_text } = dict;

  const repeatOrderHandle = async () => {
    const salonEntity = orderData?.formData?.find(
      (field: { marker: string }) => field?.marker === 'order_salon',
    );
    const { page: salon } = await getPageById(salonEntity?.value?.[0]?.id);

    const productEntity = orderData?.products[0];
    const { product } = await getProductById(productEntity?.id);

    const serviceEntity = product?.productPages as Array<{ pageId: number }>;
    const { page: service } = await getPageById(serviceEntity?.[0]?.pageId);

    dispatch(
      addServiceToCart({
        id: serviceId,
        salon,
        service,
        product,
        master,
      }),
    );
    router.push('/booking');
  };

  return (
    <div className="my-auto flex w-full flex-col text-base font-bold tracking-wide text-fuchsia-500">
      <button
        className="btn-o btn-o-primary btn-o-sm mb-2"
        onClick={repeatOrderHandle}
      >
        {book_again_text?.value || 'Book again'}
      </button>
      <div className="flex gap-2 self-center">
        <StarOpenIconLg size={5} />
        <ReviewsIcon size={5} />
      </div>
    </div>
  );
};

export default RepeatOrder;
