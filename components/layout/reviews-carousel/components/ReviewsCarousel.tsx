'use client';

import type { CSSProperties, FC, HTMLAttributes } from 'react';
import { useState } from 'react';
import Carousel from 'react-simply-carousel';

import { reviewsData } from '@/components/data';
import NavigationButton from '@/components/shared/NavigationButton';

import ReviewsAnimations from '../animations/ReviewsAnimations';
import ReviewSlide from './ReviewSlide';

/**
 * ReviewsCarousel
 * @returns React component
 */
const ReviewsCarousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<boolean>(true);

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
    <ReviewsAnimations className="slider relative flex w-full max-w-[1440px]">
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
          className: 'group arrow',
        }}
        backwardBtnProps={{
          children: <NavigationButton direction="left" />,
          style: arrowStyle,
          className: 'group arrow',
        }}
        activeSlideIndex={currentIndex}
        onRequestChange={setCurrentIndex}
        itemsToShow={1}
        speed={400}
        autoplay={state}
        autoplayDelay={2500}
        easing="ease-in-out"
        // preventScrollOnSwipe={true}
        centerMode={true}
      >
        {reviewsData.map((item, idx) => (
          <ReviewSlide setState={setState} key={idx} item={item} />
        ))}
      </Carousel>
    </ReviewsAnimations>
  );
};

export default ReviewsCarousel;
