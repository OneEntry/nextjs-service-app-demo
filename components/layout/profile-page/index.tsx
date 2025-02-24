'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';
import { useContext, useState } from 'react';

import { AuthContext } from '@/app/store/providers/AuthContext';
import { UserForm } from '@/components/forms';
import AuthError from '@/components/pages/AuthError';

import OrderStateSelect from './components/OrderStateSelect';
import ProfileHistory from './components/ProfileHistory';

interface ProfilePageProps {
  dict: IAttributeValues;
  page: IPagesEntity;
  masters?: IAdminEntity[];
}

const ProfilePageLayout: FC<ProfilePageProps> = ({ dict, page, masters }) => {
  const { isAuth, user } = useContext(AuthContext);
  const [orderState, setOrderState] = useState<string>('upcoming');
  const historyOfVisitsText =
    dict.history_of_visits_text?.value || 'History of visits';

  // Handle unauthenticated state or missing page/user data
  if (!page || !isAuth || !user?.formData) {
    return <AuthError dict={dict} />;
  }

  return (
    <div className="my-10 flex justify-between gap-6 max-lg:flex-col max-lg:gap-20 max-md:gap-12">
      {/* User Information Section */}
      <section className="flex w-4/12 flex-col max-lg:w-full">
        <h1 className="mb-8 text-4xl font-light capitalize">
          {page.localizeInfos?.title}
        </h1>
        <UserForm dict={dict} />
      </section>

      {/* Order History Section */}
      <section className="flex w-6/12 flex-col max-lg:w-full">
        <div className="relative box-border flex shrink-0 flex-col">
          <h2 className="mb-8 text-4xl font-light text-fuchsia-500">
            {historyOfVisitsText}
          </h2>
          <OrderStateSelect
            orderState={orderState}
            setOrderState={setOrderState}
          />
          <ProfileHistory
            dict={dict}
            eventType={orderState}
            masters={masters}
          />
        </div>
      </section>
    </div>
  );
};

export default ProfilePageLayout;
