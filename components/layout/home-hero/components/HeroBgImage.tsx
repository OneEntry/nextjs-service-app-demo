/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import type { FC } from 'react';

// import getLqipPreview from '@/components/hooks/getLqipPreview';

interface BgImageProps {
  attributeValues: any;
  bgRef: any;
}

/**
 * HeroBgImage component.
 *
 * @param attributeValues - The block data containing attributes for the section.
 * @param bgRef
 * @returns JSX.Element representing the BgImage
 */
const HeroBgImage: FC<BgImageProps> = ({ attributeValues, bgRef }) => {
  const { title, bg_image } = attributeValues;

  const heroImage = bg_image?.value[0]?.downloadLink ?? '';

  // const preview = await getLqipPreview(
  //   bg_image?.value[0]?.previewLink || bg_image?.value[0]?.downloadLink,
  // );

  return (
    <div className="bg-wrapper bg-gradient-1 absolute inset-0 size-full">
      {heroImage && (
        <Image
          fill
          ref={bgRef}
          alt={title?.value || 'Hero image'}
          src={heroImage}
          sizes="(min-width: 1600px) 50vw, 100vw"
          // placeholder="blur"
          // blurDataURL={preview}
          fetchPriority="high"
          className="inset-0 mx-auto size-full max-w-[2000px] object-cover"
        />
      )}
    </div>
  );
};

export default HeroBgImage;
