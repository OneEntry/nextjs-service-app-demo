'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { type FC } from 'react';

import { useGetFormByMarkerQuery } from '@/app/api';

import Calendar from './booking-form/Calendar';
import Masters from './booking-form/Masters';
import Payment from './booking-form/Payment';
import Products from './booking-form/Products';
import Salons from './booking-form/Salons';
import Services from './booking-form/Services';
import SignIn from './booking-form/SignIn';

interface BookingFormProps {
  salons: IPagesEntity[];
  services: IPagesEntity[];
  masters: IAdminEntity[];
  dict: IAttributeValues;
}

const BookingForm: FC<BookingFormProps> = ({
  salons,
  services,
  masters,
  dict,
}) => {
  // Fetch form data by marker using RTK query
  const { data } = useGetFormByMarkerQuery({
    marker: 'order',
  });
  if (!data) return;

  return (
    <>
      <Salons dict={dict} salons={salons} />
      <Services dict={dict} services={services} salons={salons} />
      <Products dict={dict} />
      <Masters dict={dict} masters={masters} />
      <Calendar dict={dict} formData={data} />
      <SignIn dict={dict} />
      <Payment dict={dict} />
    </>
  );
};

export default BookingForm;
