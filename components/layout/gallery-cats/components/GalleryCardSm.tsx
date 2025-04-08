import Link from 'next/link';
import type { FC } from 'react';

import CardAnimations from '@/app/animations/CardAnimations';

import CardSmImage from './CardSmImage';
import CardSmInfo from './CardSmInfo';

interface GalleryCardSmProps {
  cardData: {
    title: string;
    href: string;
    thumb: { downloadLink: string };
  };
  index: number;
}

const GalleryCardSm: FC<GalleryCardSmProps> = ({ cardData, index }) => {
  const { href } = cardData;
  return (
    <CardAnimations className={''} index={index}>
      <Link
        href={href}
        className="relative mb-1 flex flex-col overflow-hidden hover:text-fuchsia-500"
      >
        <CardSmImage cardData={cardData} />
        <CardSmInfo cardData={cardData} />
      </Link>
    </CardAnimations>
  );
};

export default GalleryCardSm;
