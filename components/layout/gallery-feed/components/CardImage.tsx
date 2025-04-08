// import Image from 'next/image';
import type { FC } from 'react';

import Image from '@/components/shared/Image';

interface CardImageProps {
  cardData: {
    name: string;
    thumb: string;
    preview: string;
  };
}

const CardImage: FC<CardImageProps> = ({
  cardData: { name, thumb, preview },
}) => {
  if (!thumb) {
    return null;
  }

  return (
    <Image
      src={thumb}
      alt={name}
      loading="lazy"
      placeholder="blur"
      blurDataURL={preview}
      className="gallery-card-img relative h-[320px] w-full object-cover duration-500 group-hover:scale-125 group-hover:transition-transform"
    />
  );
};

export default CardImage;
