'use client';

import type { CSSProperties, FC, HTMLAttributes } from 'react';
import { useState } from 'react';
import Carousel from 'react-simply-carousel';

import { reviewsData } from '@/components/data';
import NavigationButton from '@/components/shared/NavigationButton';

import ReviewSlide from './ReviewSlide';

/**
 * ReviewsCarousel
 * @returns React component
 */
const ReviewsCarousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerProps: HTMLAttributes<HTMLDivElement> = {
    style: {
      userSelect: 'none',
      flexFlow: 'nowrap',
    },
    className: 'w-full min-w-full justify-between no-wrap',
  };

  const arrowStyle: CSSProperties = {
    minWidth: 30,
    alignSelf: 'center',
    zIndex: 165,
  };

  return (
    <Carousel
      infinite
      showSlidesBeforeInit={false}
      containerProps={containerProps}
      activeSlideProps={{
        style: {},
      }}
      forwardBtnProps={{
        children: <NavigationButton direction="right" />,
        style: arrowStyle,
        className: 'group',
      }}
      backwardBtnProps={{
        children: <NavigationButton direction="left" />,
        style: arrowStyle,
        className: 'group',
      }}
      activeSlideIndex={currentIndex}
      onRequestChange={setCurrentIndex}
      itemsToShow={1}
      speed={400}
      centerMode
    >
      {reviewsData.map((item, idx) => (
        <ReviewSlide key={idx} item={item} />
      ))}
    </Carousel>
  );
};

export default ReviewsCarousel;
