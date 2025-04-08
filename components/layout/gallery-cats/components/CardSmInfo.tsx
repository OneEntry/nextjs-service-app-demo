import type { FC } from 'react';

interface CardSmInfoProps {
  cardData: {
    title: string;
  };
}

const CardSmInfo: FC<CardSmInfoProps> = ({ cardData: { title } }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-transparent">
      <div className="gallery-card-content flex size-full flex-col gap-1 px-8 py-6">
        <h2 className="text-center uppercase text-white">{title}</h2>
      </div>
      <div className="gallery-card-info-bg"></div>
    </div>
  );
};

export default CardSmInfo;
