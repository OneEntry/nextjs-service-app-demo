import Link from 'next/link';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

interface CardData {
  name: string;
  link: string;
  spec: {
    title: string;
  };
}

interface CardInfoProps {
  dict: IAttributeValues;
  cardData: CardData;
}

const CardInfo: FC<CardInfoProps> = ({
  dict,
  cardData: { name, link, spec },
}) => {
  const checkProfileText = dict?.check_profile_text?.value || 'Check Profile';

  return (
    <div className="gallery-card-info absolute bottom-0 left-0 w-full bg-transparent">
      <div className="gallery-card-content flex size-full flex-col gap-1 px-8 py-6 max-sm:px-5">
        <div className="text-xl leading-5 max-md:text-lg max-sm:text-base">
          {name}
        </div>
        <div className="text-sm font-bold leading-4 max-sm:text-xs">
          {spec?.title}
        </div>
        <Link
          href={link || '/'}
          className="text-sm underline hover:text-fuchsia-500 focus:outline-none max-sm:text-xs"
        >
          {checkProfileText}
        </Link>
      </div>
      <div className="gallery-card-info-bg"></div>
    </div>
  );
};

export default CardInfo;
