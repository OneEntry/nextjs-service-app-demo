import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import {
  getAdminsInfo,
  getChildPagesByParentUrl,
  getPageByUrl,
} from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import BookingForm from '@/components/forms/BookingForm';

const BookingPageLayout: FC = async () => {
  const [dict] = ServerProvider('dict', await getDictionary());
  // get page by Url
  const { page } = await getPageByUrl('booking');
  // salons
  const salonsData = await getChildPagesByParentUrl('salons');
  const salons = salonsData.pages;
  // services
  const servicesData = await getChildPagesByParentUrl('services');
  const services = servicesData.pages;
  // masters
  const { admins } = await getAdminsInfo({ offset: 0, limit: 100 });
  const masters = admins?.filter(
    (master: IAdminEntity) => master.attributeValues?.master_name && master,
  );

  return (
    <section className="flex flex-col justify-center bg-white">
      <div className="bg-gradient-2 flex w-full px-5 py-10 text-white">
        <div className="mx-auto flex w-full max-w-screen-xs flex-col">
          <h1 className="mb-6 self-center text-center text-2xl font-bold uppercase">
            {page?.localizeInfos?.title}
          </h1>
          <BookingForm
            salons={salons as IPagesEntity[]}
            services={services as IPagesEntity[]}
            masters={masters as IAdminEntity[]}
            dict={dict}
          />
        </div>
      </div>
    </section>
  );
};

export default BookingPageLayout;
