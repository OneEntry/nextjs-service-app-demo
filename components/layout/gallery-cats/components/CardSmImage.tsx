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
    <figure className="relative h-[280px] shrink-0 bg-slate-100">
      {(downloadLink || previewLink) && (
        <Image
          width={320}
          height={480}
          loading="lazy"
          src={(previewLink as string) || (downloadLink as string)}
          alt={title}
          className="size-full self-center h-[320px] object-cover transition-transform duration-500 group-hover:scale-125"
        />
      )}
    </figure>
  );
};

export default CardSmImage;
