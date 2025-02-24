'use client';

import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { CSSProperties, FC, HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
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
  const [slidesCount, setSlidesCount] = useState(6);
  const [state, setState] = useState(false);

  useEffect(() => {
    const updateSlidesCount = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setSlidesCount(3);
      } else if (width <= 991) {
        setSlidesCount(4);
      } else if (width <= 1200) {
        setSlidesCount(5);
      } else {
        setSlidesCount(6);
      }
    };

    updateSlidesCount(); // Initial setup
    window.addEventListener('resize', updateSlidesCount);
    return () => window.removeEventListener('resize', updateSlidesCount);
  }, []);

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
      itemsToShow={slidesCount}
      centerMode={true}
      speed={500}
      autoplay={!state}
      autoplayDelay={2500}
      easing="ease-in-out"
      preventScrollOnSwipe
    >
      {masters.map((master, index) => (
        <FeedCard key={index} dict={dict} master={master} setState={setState} />
      ))}
    </Carousel>
  );
};

export default MastersFeedCarousel;
