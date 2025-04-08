/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { CSSProperties, FC, HTMLAttributes, Key } from 'react';
import { useState } from 'react';
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
  const [state, setState] = useState<boolean>(false);

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
        className: 'group arrow',
      }}
      backwardBtnProps={{
        children: <NavigationButton direction="left" />,
        style: {
          ...arrowStyle,
          left: 20,
        },
        className: 'group arrow',
      }}
      activeSlideIndex={currentIndex}
      onRequestChange={setCurrentIndex}
      itemsToShow={6}
      centerMode={true}
      speed={500}
      autoplay={state}
      autoplayDelay={2500}
      easing="ease-in-out"
      // preventScrollOnSwipe={true}
      responsiveProps={[
        { minWidth: 1360, itemsToShow: 6 },
        { minWidth: 1200, maxWidth: 1359, itemsToShow: 5 },
        { minWidth: 992, maxWidth: 1199, itemsToShow: 4 },
        { minWidth: 768, maxWidth: 992, itemsToShow: 3 },
        { maxWidth: 767, itemsToShow: 3 },
      ]}
      // persistentChangeCallbacks
    >
      {cards?.map((cardData: any, index: Key) => {
        return (
          <GalleryCard
            key={index}
            dict={dict}
            cardData={cardData}
            setState={setState}
            index={index as number}
            setCurrentIndex={setCurrentIndex}
          />
        );
      })}
    </Carousel>
  );
};

export default GalleryFeedCarousel;
