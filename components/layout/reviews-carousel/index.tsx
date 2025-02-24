import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import ReviewsCarousel from './components/ReviewsCarousel';

/**
 * ReviewsCarousel Section
 * @returns React component
 */
const ReviewsCarouselLayout: FC<{ block: IBlockEntity }> = () => {
  const title = 'Reviews';

  return (
    <section className="flex flex-col items-center bg-white px-16 pb-20 pt-4 max-md:px-5">
      <h2 className="mb-10 text-4xl font-light uppercase leading-7 text-gray-600">
        {title}
      </h2>
      <div className="slider relative flex w-full max-w-[1440px]">
        <ReviewsCarousel />
      </div>
    </section>
  );
};

export default ReviewsCarouselLayout;
