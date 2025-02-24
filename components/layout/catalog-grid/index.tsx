import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import CatalogGrid from './components/CatalogGrid';

/**
 * CatalogSection section
 * @returns React component
 */
const CatalogSection: FC<{ block: IBlockEntity }> = async ({ block }) => {
  const title = block?.localizeInfos?.title;

  return (
    <section className="relative flex shrink-0 flex-col">
      <div className="relative mx-auto flex w-full max-w-[1200px] shrink-0 grow flex-col self-stretch">
        {/* title */}
        <div className="mx-auto mb-10 flex w-auto flex-col gap-4">
          <h2 className="text-center text-4xl font-light uppercase text-gray-600">
            {title}
          </h2>
          <hr className="relative mb-2.5 h-px w-full self-center border-b border-solid border-b-gray-600" />
        </div>
        {/* pages */}
        <div className="relative z-10 flex shrink-0 flex-row flex-wrap justify-center gap-12">
          <CatalogGrid />
        </div>
      </div>
      {/* section-bg */}
      <div className="section-bg text-center text-[24rem] uppercase leading-[14rem] text-gray-50">
        <div className="font-bold">Beauty</div>
        <div className="font-light">Salon</div>
      </div>
    </section>
  );
};

export default CatalogSection;
