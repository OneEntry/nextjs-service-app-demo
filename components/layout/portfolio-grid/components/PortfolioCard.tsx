import type { FC } from 'react';

import PortfolioCardImage from './PortfolioCardImage';

interface PortfolioCardProps {
  item: {
    img: string;
    thumb: string;
    preview: string;
    alt: string;
  };
  index: number;
}

const PortfolioCard: FC<PortfolioCardProps> = ({ item }) => {
  return (
    <div className="group relative flex min-h-[320px] cursor-pointer flex-col overflow-hidden max-md:min-h-[260px] max-xs:min-h-[240px] max-xs:min-w-[50vw]">
      <PortfolioCardImage item={item} />
    </div>
  );
};

export default PortfolioCard;
