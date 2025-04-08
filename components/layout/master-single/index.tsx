import { notFound } from 'next/navigation';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import { type FC, memo } from 'react';

import { getAdminsInfo, getPageById } from '@/app/api';

import MasterAnimations from './animations/MasterAnimations';
import Master from './components/Master';
import MasterImage from './components/MasterImage';
import MasterSalons from './components/MasterSalons';
import Title from './components/Title';

const MasterSingleLayout: FC<{
  handle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchData: any;
}> = async ({ handle, searchData }) => {
  // masters
  const { admins } = await getAdminsInfo({ body: [], offset: 0, limit: 100 });
  const master = admins?.find(
    (admin: IAdminEntity) => admin.id === Number(handle),
  );

  // if no data in searchParams get first master service id
  const sId =
    searchData?.service || master?.attributeValues.services.value[0].id;

  const { page: service, isError } = await getPageById(sId as number);

  if (!master || !service || isError) {
    return notFound();
  }
  const { master_name, master_image, master_salon } = master.attributeValues;

  const imageSrc = master_image?.value?.[0]?.downloadLink;
  const name = master_name?.value ?? '';

  return (
    <section className="relative mx-auto box-border flex w-full max-w-[1440px] shrink-0 flex-col">
      <div className="flex w-full flex-col justify-center bg-white px-5 py-20 max-md:max-w-full max-sm:py-10">
        <Title title={service?.localizeInfos.title || ''} />
        <MasterAnimations className="flex w-full gap-20 max-lg:gap-10 max-md:flex-col">
          <div className="flex w-[30%] grow flex-col max-md:mt-10 max-md:w-full max-sm:mt-5">
            <figure className="item mb-8 overflow-hidden rounded-3xl bg-slate-100 max-sm:h-64">
              <MasterImage imageSrc={imageSrc} alt={name} />
            </figure>
            <div className="item flex flex-wrap justify-between gap-2.5 px-4 text-xl leading-8 text-neutral-600">
              <MasterSalons salons={master_salon} />
            </div>
          </div>
          <div className="flex w-[70%] flex-col max-md:w-full">
            <Master master={master} service={service} />
          </div>
        </MasterAnimations>
      </div>
    </section>
  );
};

export default memo(MasterSingleLayout);
