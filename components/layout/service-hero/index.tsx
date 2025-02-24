import type { FC } from 'react';

import ServiceDescription from './components/ServiceDescription';
import ServiceImage from './components/ServiceImage';
import ServiceTitle from './components/ServiceTitle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServiceHero: FC<{ page: any }> = ({ page }) => {
  const { service_hero_bg } = page.attributeValues;
  const heroImage = service_hero_bg?.value[0]?.downloadLink;

  return (
    <section className="flex flex-col justify-center">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-center px-5 max-md:px-5">
        <div className="relative mx-auto flex min-h-[390px] w-full max-w-[1440px] flex-row items-end justify-between py-8 pl-12 pr-36 max-lg:min-h-[280px] max-lg:px-5 max-md:min-h-[280px] max-md:max-w-full max-md:flex-wrap max-sm:mr-auto">
          <div className="relative mt-auto flex flex-col text-left font-bold text-white max-xl:mr-auto max-md:mt-10 max-sm:mx-auto">
            <ServiceTitle page={page} />
            <ServiceDescription page={page} />
          </div>
        </div>
      </div>

      {heroImage && <ServiceImage page={page} />}
    </section>
  );
};

export default ServiceHero;
