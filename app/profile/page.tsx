import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

import { getAdminsInfo, getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import ProfilePage from '@/components/layout/profile-page';
import AuthError from '@/components/pages/AuthError';
import GradientLine from '@/components/shared/GradientLine';

const ProfilePageLayout: FC = async () => {
  const [dict] = ServerProvider('dict', await getDictionary());
  const { page, isError } = await getPageByUrl('profile');
  // masters
  const { admins } = await getAdminsInfo({ offset: 0, limit: 100 });
  const masters = admins?.filter(
    (master: IAdminEntity) => master.attributeValues?.master_name && master,
  );

  if (!page || isError) {
    return <AuthError dict={dict} />;
  }

  return (
    <>
      <GradientLine />
      <section className="relative mx-auto flex w-full max-w-[1440px] shrink-0 grow flex-col self-stretch p-5">
        <div className="flex w-full max-w-[1400px] flex-col max-md:max-w-full">
          <ProfilePage dict={dict} page={page} masters={masters} />
        </div>
      </section>
    </>
  );
};

export default ProfilePageLayout;
