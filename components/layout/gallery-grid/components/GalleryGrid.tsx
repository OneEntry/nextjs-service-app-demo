'use client';

import 'photoswipe/dist/photoswipe.css';

import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { Gallery } from 'react-photoswipe-gallery';

import { shuffleArray } from '@/components/utils';

import GalleryCard from './GalleryCard';

interface GalleryGridProps {
  dict: IAttributeValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cardsData: any[];
}

/**
 * GalleryGrid section
 * @returns GalleryGrid
 */
const GalleryGrid: FC<GalleryGridProps> = ({ cardsData, dict }) => {
  return (
    <Gallery>
      {shuffleArray(cardsData.flat())?.map((cardData, index) => (
        <GalleryCard
          key={index}
          index={index}
          dict={dict}
          cardData={cardData}
        />
      ))}
    </Gallery>
  );
};

export default GalleryGrid;
