import Image from 'next/image';
import type { FC } from 'react';

interface MasterImageProps {
  imageSrc: string;
  alt: string;
}

/**
 * MasterImage component to render an image with specified source and alt text.
 * @param imageSrc - Source URL of the image.
 * @param alt - Alternative text for the image.
 * @returns JSX.Element representing the MasterImage component or null if no image source is provided.
 */
const MasterImage: FC<MasterImageProps> = ({ imageSrc, alt }) => {
  if (!imageSrc) {
    return null;
  }

  return (
    <Image
      width={398}
      height={464}
      loading="lazy"
      src={imageSrc}
      alt={alt}
      className="aspect-[0.88] size-full object-cover"
    />
  );
};

export default MasterImage;
