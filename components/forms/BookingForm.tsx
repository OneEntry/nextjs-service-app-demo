import dynamic from 'next/dynamic';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { type FC } from 'react';

import { getAdminsInfo, getChildPagesByParentUrl } from '@/app/api';

const Salons = dynamic(() => import('./booking-form/Salons'), {
  ssr: true,
});
const Services = dynamic(() => import('./booking-form/Services'), {
  ssr: true,
});
const Products = dynamic(() => import('./booking-form/Products'), {
  ssr: true,
});
const Masters = dynamic(() => import('./booking-form/Masters'), {
  ssr: true,
});
const Calendar = dynamic(() => import('./booking-form/Calendar'), {
  ssr: true,
});
const SignIn = dynamic(() => import('./booking-form/SignIn'), {
  ssr: true,
});
const Payment = dynamic(() => import('./booking-form/Payment'), {
  ssr: true,
});

interface BookingFormProps {
  dict: IAttributeValues;
}

/**
 * BookingForm
 *
 * @param dict - dictionary from server api
 * @returns
 */
const BookingForm: FC<BookingFormProps> = async ({ dict }) => {
  // get salons
  const { pages: salons } = await getChildPagesByParentUrl('salons');
  // get services
  const { pages: services } = await getChildPagesByParentUrl('services');
  // get masters
  const { admins } = await getAdminsInfo({ body: [], offset: 0, limit: 100 });
  // filter masters
  const masters = admins?.filter(
    (master: IAdminEntity) => master.attributeValues?.master_name && master,
  );

  return (
    <>
      <Salons dict={dict} salons={salons as IPagesEntity[]} />
      <Services
        dict={dict}
        services={services as IPagesEntity[]}
        salons={salons as IPagesEntity[]}
      />
      <Products dict={dict} salons={salons} />
      <Masters dict={dict} masters={masters as IAdminEntity[]} />
      <Calendar dict={dict} />
      <SignIn dict={dict} />
      <Payment dict={dict} />
    </>
  );
};

export default BookingForm;
