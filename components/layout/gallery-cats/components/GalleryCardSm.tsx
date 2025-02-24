import Link from 'next/link';
import type { FC } from 'react';

import CardSmImage from './CardSmImage';
import CardSmInfo from './CardSmInfo';

const GalleryCardSm: FC<{
  cardData: {
    title: string;
    href: string;
    thumb: { downloadLink: string };
  };
}> = ({ cardData }) => {
  const { href } = cardData;
  return (
    <Link
      href={href}
      className="group relative mb-1 flex flex-col overflow-hidden hover:text-fuchsia-500"
    >
      <CardSmImage cardData={cardData} />
      <CardSmInfo cardData={cardData} />
    </Link>
  );
};

export default GalleryCardSm;
