/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { FC } from 'react';

interface HeroTitleProps {
  attributeValues: any;
  titleRef: any;
}

/**
 * HeroTitle section component.
 *
 * @param attributeValues
 * @param titleRef
 * @returns JSX.Element representing the HeroTitle
 */
const HeroTitle: FC<HeroTitleProps> = ({ attributeValues, titleRef }) => {
  const { title } = attributeValues;

  return (
    <h1
      ref={titleRef}
      className="mb-4 flex items-baseline justify-start text-[210px] leading-[220px] max-lg:text-[110px] max-lg:leading-[120px] max-md:text-9xl max-md:leading-[130px] max-sm:text-9xl"
    >
      {title?.value} <span className="text-8xl leading-[70px]">%</span>
    </h1>
  );
};

export default HeroTitle;
