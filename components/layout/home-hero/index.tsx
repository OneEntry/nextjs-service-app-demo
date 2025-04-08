'use client';

import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import { type FC, useRef } from 'react';

import HeroAnimations from '@/app/animations/HeroAnimations';

import HeroBgImage from './components/HeroBgImage';
import HeroButton from './components/HeroButton';
import HeroDescription from './components/HeroDescription';
import HeroTitle from './components/HeroTitle';

interface HomeHeroProps {
  block: IBlockEntity;
}

/**
 * HomeHero section component.
 *
 * @param block - The block data containing attributes for the section.
 * @returns JSX.Element representing the HomeHero section.
 */
const HomeHero: FC<HomeHeroProps> = ({ block }) => {
  const { attributeValues } = block;

  const titleRef = useRef(null);
  const descrRef = useRef(null);
  const buttonRef = useRef(null);
  const bgRef = useRef(null);

  return (
    <HeroAnimations
      titleRef={titleRef}
      descrRef={descrRef}
      buttonRef={buttonRef}
      bgRef={bgRef}
      className="relative flex flex-col justify-center overflow-hidden"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-center px-5 max-md:max-w-full max-md:px-5">
        <div className="relative mx-auto flex min-h-[675px] w-full max-w-[1440px] flex-row items-end justify-between pb-16 pl-12 pr-36 max-lg:min-h-[480px] max-lg:px-5 max-md:min-h-[480px] max-md:max-w-full max-md:flex-wrap max-sm:mr-auto">
          <div className="relative mt-auto flex flex-col text-left font-black text-white max-xl:mr-auto max-md:mt-10 max-sm:mx-auto">
            <HeroTitle attributeValues={attributeValues} titleRef={titleRef} />
            <HeroDescription
              attributeValues={attributeValues}
              descrRef={descrRef}
            />
          </div>
          <HeroButton attributeValues={attributeValues} buttonRef={buttonRef} />
        </div>
      </div>

      <HeroBgImage attributeValues={attributeValues} bgRef={bgRef} />
    </HeroAnimations>
  );
};

export default HomeHero;
