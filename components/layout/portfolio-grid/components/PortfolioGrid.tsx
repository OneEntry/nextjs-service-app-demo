'use client';

import 'photoswipe/dist/photoswipe.css';

import type { FC } from 'react';
import { Gallery } from 'react-photoswipe-gallery';

import PortfolioCard from './PortfolioCard';

interface PortfolioGridProps {
  portfolioImages: string[];
}

const PortfolioGrid: FC<PortfolioGridProps> = ({ portfolioImages }) => (
  <Gallery>
    {portfolioImages.map((item, index) => (
      <PortfolioCard key={index} item={item} />
    ))}
  </Gallery>
);

export default PortfolioGrid;
