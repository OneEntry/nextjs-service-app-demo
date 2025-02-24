import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';
import type { FC } from 'react';

import { getAdminsInfo } from '@/app/api';
import { ServerProvider } from '@/app/store/providers/ServerProvider';

import FeedCarousel from './components/MastersCarousel';

/**
 * MastersFeed section
 * @returns React component
 */
const MastersFeed: FC<{ block: IBlockEntity }> = async ({ block }) => {
  const [dict] = ServerProvider('dict');
  const { admins } = await getAdminsInfo({ offset: 0, limit: 100 });

  const masters = (admins || []).filter((master): master is IAdminEntity =>
    Boolean(master.attributeValues?.services),
  );

  const title = block.localizeInfos?.title || '';

  return (
    <section className="flex w-screen flex-col justify-center py-5">
      <div className="flex w-full flex-col bg-white">
        <h2 className="mb-12 self-center text-4xl font-light uppercase leading-8 text-gray-600">
          {title}
        </h2>
        <div className="flex flex-col gap-0">
          <div className="relative mx-auto w-full overflow-auto">
            <FeedCarousel masters={masters} dict={dict} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MastersFeed;
