'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { CSSProperties, FC, HTMLAttributes } from 'react';
import { useState } from 'react';
import Carousel from 'react-simply-carousel';

import NavigationButton from '@/components/shared/NavigationButton';

import FeedCard from './MastersFeedCard';

interface MastersFeedCarouselProps {
  masters: IAdminEntity[];
  dict: IAttributeValues;
}

/**
 * MastersFeedCarousel section
 * @returns React component
 */
const MastersFeedCarousel: FC<MastersFeedCarouselProps> = ({
  masters,
  dict,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [state, setState] = useState<boolean>(false);

  const containerProps: HTMLAttributes<HTMLDivElement> = {
    style: {
      userSelect: 'none',
      flexFlow: 'nowrap',
    },
    className: 'w-full min-w-full no-wrap',
  };

  const arrowStyle: CSSProperties = {
    minWidth: 30,
    alignSelf: 'center',
    position: 'absolute',
    top: '50%',
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
        style: { ...arrowStyle, right: 20 },
        className: 'group',
      }}
      backwardBtnProps={{
        children: <NavigationButton direction="left" />,
        style: { ...arrowStyle, left: 20 },
        className: 'group',
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
    >
      {masters.map((master, index) => (
        <FeedCard
          key={index}
          dict={dict}
          master={master}
          setState={setState}
          index={index}
          setCurrentIndex={setCurrentIndex}
        />
      ))}
    </Carousel>
  );
};

export default MastersFeedCarousel;
