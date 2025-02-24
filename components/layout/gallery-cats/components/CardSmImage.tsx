import Image from 'next/image';
import type { FC } from 'react';

interface CardSmImageProps {
  cardData: {
    title: string;
    thumb: { downloadLink?: string; previewLink?: string };
  };
}

const CardSmImage: FC<CardSmImageProps> = ({
  cardData: {
    title,
    thumb: { downloadLink, previewLink },
  },
}) => {
  return (
    <figure className="relative h-[280px] shrink-0">
      {previewLink && (
        <Image
          fill
          sizes="(min-width: 600px) 50vw, 100vw"
          loading="lazy"
          src={downloadLink || previewLink}
          alt={title}
          className="size-full self-center object-cover transition-transform duration-500 group-hover:scale-125"
        />
      )}
    </figure>
  );
};

export default CardSmImage;
