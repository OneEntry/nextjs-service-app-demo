import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';

import ReviewsCarousel from './components/ReviewsCarousel';

/**
 * ReviewsCarousel Section
 * @returns React component
 */
const ReviewsCarouselLayout: FC<{ block: IBlockEntity }> = () => {
  const title = 'Reviews';

  return (
    <div className="flex flex-col items-center bg-white px-16 pb-20 pt-4 max-md:px-5">
      <TitleAnimations className={'mx-auto mb-10'}>
        <h2 className="title text-4xl font-light uppercase leading-7 text-gray-600">
          {title}
        </h2>
      </TitleAnimations>
      <ReviewsCarousel />
    </div>
  );
};

export default ReviewsCarouselLayout;
