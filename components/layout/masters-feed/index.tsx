import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import TitleAnimations from '@/app/animations/TitleAnimations';
import { getAdminsInfo } from '@/app/api';
import { ServerProvider } from '@/app/store/providers/ServerProvider';

import MastersFeedCarousel from './components/MastersCarousel';

/**
 * MastersFeed section
 * @returns React component
 */
const MastersFeed: FC<{ block: IBlockEntity }> = async ({ block }) => {
  const [dict] = ServerProvider('dict');
  const { admins } = await getAdminsInfo({ body: [], offset: 0, limit: 100 });

  const masters = (admins || []).filter((master): master is IAdminEntity =>
    Boolean(master.attributeValues?.services),
  );

  return (
    <section className="flex w-screen flex-col justify-center py-5">
      <div className="flex w-full flex-col bg-white">
        <TitleAnimations
          delay={0.25}
          className="mx-auto mb-12 flex w-auto flex-col gap-4"
        >
          <h2 className="title self-center text-4xl font-light uppercase leading-8 text-gray-600">
            {block.localizeInfos?.title || ''}
          </h2>
          <hr className="relative mb-2.5 h-px w-full max-w-[150px] self-center border-b border-solid border-b-gray-600" />
        </TitleAnimations>
        <MastersFeedCarousel masters={masters} dict={dict} />
      </div>
    </section>
  );
};

export default MastersFeed;
