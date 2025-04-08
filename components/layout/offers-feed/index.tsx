import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';
import { ServerProvider } from '@/app/store/providers/ServerProvider';

import OffersFeed from './components/OffersFeed';

interface OffersFeedProps {
  block: IBlockEntity;
}

/**
 * OffersFeedBlock section
 *
 * @returns React component
 */
const OffersFeedBlock: FC<OffersFeedProps> = async ({ block }) => {
  const [dict] = ServerProvider('dict');
  return (
    <section className="flex w-full justify-center bg-white py-10 pb-4">
      <div className="mx-auto mb-6 w-full max-w-[1400px] flex-col max-md:max-w-full max-md:px-5">
        <div className="flex w-full flex-col items-center justify-center">
          <TitleAnimations
            delay={0.25}
            className="mx-auto mb-12 flex w-auto flex-col gap-4"
          >
            <h2 className="title self-center text-4xl font-light uppercase leading-8 text-gray-600">
              {block?.localizeInfos?.title}
            </h2>
            <hr className="relative mb-2.5 h-px w-full max-w-[150px] self-center border-b border-solid border-b-gray-600" />
          </TitleAnimations>
          <OffersFeed dict={dict} block={block} />
        </div>
      </div>
    </section>
  );
};

export default OffersFeedBlock;
