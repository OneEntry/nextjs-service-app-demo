import Image from 'next/image';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

/**
 * BanerImage component.
 *
 * @param props.block - The block data containing attributes for the section.
 * @returns JSX.Element
 */
const BanerImage: FC<{
  block: IBlockEntity;
}> = ({ block }) => {
  const { bg_image } = block.attributeValues;

  const bgImageUrl = bg_image?.value[0]?.downloadLink ?? '';

  return (
    bgImageUrl && (
      <Image
        fill
        loading="lazy"
        src={bgImageUrl}
        sizes="(min-width: 600px) 50vw, 100vw"
        className="absolute inset-0 size-full object-cover"
        alt="Background image"
        id="baner_image"
      />
    )
  );
};

export default BanerImage;
