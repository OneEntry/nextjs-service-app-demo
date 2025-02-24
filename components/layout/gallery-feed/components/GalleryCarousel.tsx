/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { CSSProperties, FC, HTMLAttributes, Key } from 'react';
import { useEffect, useState } from 'react';
import Carousel from 'react-simply-carousel';

import NavigationButton from '@/components/shared/NavigationButton';

import GalleryCard from './GalleryCard';

/**
 * GalleryFeedCarousel section
 * @returns React component
 */
const GalleryFeedCarousel: FC<{ cards: any; dict: IAttributeValues }> = ({
  cards,
  dict,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesCount, setSlidesCount] = useState(6);
  const [state, setState] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currWidth = window.innerWidth;
      if (currWidth <= 1200) {
        setSlidesCount(5);
      }
      if (currWidth <= 991) {
        setSlidesCount(4);
      }
      if (currWidth <= 768) {
        setSlidesCount(3);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerProps = {
    style: {
      userSelect: 'none',
      flexFlow: 'nowrap',
    },
    className: 'w-full min-w-full no-wrap relative',
  } as HTMLAttributes<HTMLDivElement>;

  const arrowStyle = {
    minWidth: 30,
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
    zIndex: 45,
  } as CSSProperties;

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
        style: {
          ...arrowStyle,
          right: 20,
        },
        className: 'group',
      }}
      backwardBtnProps={{
        children: <NavigationButton direction="left" />,
        style: {
          ...arrowStyle,
          left: 20,
        },
        className: 'group',
      }}
      activeSlideIndex={currentIndex}
      onRequestChange={setCurrentIndex}
      itemsToShow={slidesCount}
      centerMode={true}
      speed={500}
      autoplay={!state}
      autoplayDelay={2500}
      easing="ease-in-out"
      preventScrollOnSwipe
    >
      {cards?.map((cardData: any, index: Key) => {
        return (
          <GalleryCard
            key={index}
            dict={dict}
            cardData={cardData}
            setState={setState}
          />
        );
      })}
    </Carousel>
  );
};

export default GalleryFeedCarousel;
