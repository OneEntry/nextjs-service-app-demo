import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import { type FC, memo } from 'react';

import Master from './components/Master';
import MasterImage from './components/MasterImage';
import MasterSalons from './components/MasterSalons';
import Title from './components/Title';

const MasterSingleLayout: FC<{
  master: IAdminEntity;
  service?: IPagesEntity;
  dict: IAttributeValues;
}> = ({ dict, master, service }) => {
  const { master_name, master_image, master_salon } = master.attributeValues;

  const imageSrc = master_image?.value?.[0]?.downloadLink;
  const name = master_name?.value ?? '';

  return (
    <section className="relative mx-auto box-border flex w-full max-w-[1440px] shrink-0 flex-col">
      <div className="flex w-full flex-col justify-center bg-white py-20 max-xl:px-16 max-md:max-w-full max-md:px-5 max-sm:py-10">
        <Title title={service?.localizeInfos.title || ''} />
        <div className="flex w-full gap-20 max-lg:gap-10 max-md:flex-col">
          <div className="flex w-[30%] grow flex-col max-md:mt-10 max-md:w-full max-sm:mt-5">
            <MasterImage imageSrc={imageSrc} alt={name} />
            <MasterSalons salons={master_salon} />
          </div>
          <div className="flex w-[70%] flex-col max-md:w-full">
            <Master master={master} service={service} dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(MasterSingleLayout);
