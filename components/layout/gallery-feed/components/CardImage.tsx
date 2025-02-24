import Image from 'next/image';
import type { FC } from 'react';

interface CardImageProps {
  cardData: {
    name: string;
    img: string;
  };
}

const CardImage: FC<CardImageProps> = ({ cardData: { name, img } }) => {
  return (
    <figure className="relative flex min-h-[320px] w-full flex-col overflow-hidden">
      {img && (
        <Image
          width={320}
          height={480}
          src={img}
          alt={name}
          className="gallery-card-img relative h-[320px] w-full object-cover duration-500 group-hover:scale-125 group-hover:transition-transform"
        />
      )}
    </figure>
  );
};

export default CardImage;
