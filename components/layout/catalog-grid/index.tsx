import parse from 'html-react-parser';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import { type FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';
import wrapCharactersInSpan from '@/components/hooks/wrapCharactersInSpan';

import BgAnimations from './animations/BgAnimations';
import CatalogGrid from './components/CatalogGrid';

/**
 * CatalogSection section
 * @returns React component
 */
const CatalogSection: FC<{ block: IBlockEntity }> = ({ block }) => {
  const title = block?.localizeInfos?.title;

  const title1 = wrapCharactersInSpan('Beauty');
  const title2 = wrapCharactersInSpan('Salon');

  return (
    <section className="relative flex shrink-0 flex-col">
      <div className="relative mx-auto flex w-full max-w-[1200px] shrink-0 grow flex-col self-stretch">
        {/* title */}
        <TitleAnimations className="mx-auto mb-10 flex w-auto flex-col gap-4">
          <h2 className="title text-center text-4xl font-light uppercase text-gray-600">
            {title}
          </h2>
          <hr className="relative mb-2.5 h-px w-full max-w-[150px] self-center border-b border-solid border-b-gray-600" />
        </TitleAnimations>
        {/* pages */}
        <div className="relative z-10 flex shrink-0 flex-row flex-wrap justify-center gap-12">
          <CatalogGrid />
        </div>
      </div>
      {/* section-bg */}
      <BgAnimations className="section-bg text-center text-[24rem] uppercase leading-[14rem] text-gray-50">
        <div id="beauty_bg" className="font-bold">
          {parse(title1)}
        </div>
        <div id="salon_bg" className="font-light">
          {parse(title2)}
        </div>
      </BgAnimations>
    </section>
  );
};

export default CatalogSection;
