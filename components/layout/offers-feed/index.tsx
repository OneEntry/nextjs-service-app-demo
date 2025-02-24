import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import OffersFeed from './components/OffersFeed';

interface OffersFeedProps {
  dict: IAttributeValues;
  block: IBlockEntity;
}

/**
 * OffersFeedBlock section
 *
 * @returns React component
 */
const OffersFeedBlock: FC<OffersFeedProps> = ({ dict, block }) => {
  return (
    <section className="flex w-full justify-center bg-white py-10 pb-4">
      <div className="mx-auto mb-6 w-full max-w-[1400px] flex-col max-md:max-w-full max-md:px-5">
        <h2 className="mb-8 text-center text-4xl font-light uppercase text-gray-600">
          {block.localizeInfos.title}
        </h2>
        <div className="flex w-full items-center justify-center overflow-auto">
          <OffersFeed dict={dict} block={block} />
        </div>
      </div>
    </section>
  );
};

export default OffersFeedBlock;
