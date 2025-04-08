/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import parse from 'html-react-parser';
import type { FC } from 'react';

interface HeroDescriptionProps {
  attributeValues: any;
  descrRef: any;
}

/**
 * HeroDescription component.
 *
 * @param block - The block data containing attributes for the section.
 * @param descrRef
 * @returns JSX.Element representing the HeroDescription
 */
const HeroDescription: FC<HeroDescriptionProps> = ({
  attributeValues,
  descrRef,
}) => {
  const { text } = attributeValues;

  const description = text?.value[0]?.htmlValue ?? '';

  return (
    description && (
      <div
        ref={descrRef}
        className="overflow-hidden text-7xl leading-[84px] tracking-wider max-lg:text-5xl max-md:mx-auto max-md:mt-10 max-md:text-4xl max-md:leading-10"
      >
        {parse(description)}
      </div>
    )
  );
};

export default HeroDescription;
