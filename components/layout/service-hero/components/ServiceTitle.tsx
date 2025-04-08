import parse from 'html-react-parser';
import type { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ServiceTitle: FC<{ page: any; titleRef: any }> = ({ page, titleRef }) => {
  const { service_hero_title } = page.attributeValues;
  const title = service_hero_title?.value;

  return (
    title && (
      <div
        ref={titleRef}
        className="mb-4 flex items-baseline justify-start text-[190px] leading-[220px] max-lg:text-[110px] max-lg:leading-4 max-md:text-9xl max-md:leading-4 max-sm:text-9xl"
      >
        {parse(title)}
      </div>
    )
  );
};

export default ServiceTitle;
