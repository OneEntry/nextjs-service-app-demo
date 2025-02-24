import parse from 'html-react-parser';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

const ServiceDescription: FC<{ page: IPagesEntity }> = ({ page }) => {
  const { service_hero_description } = page.attributeValues;
  const description = service_hero_description?.value[0].htmlValue;

  return (
    description && (
      <div className="text-7xl leading-[84px] tracking-wider max-lg:text-5xl max-md:mx-auto max-md:mt-10 max-md:text-4xl max-md:leading-10">
        {parse(description)}
      </div>
    )
  );
};

export default ServiceDescription;
