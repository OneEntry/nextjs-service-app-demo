/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import { getChildPagesByParentUrl, getPageByUrl } from '@/app/api';
import { getAdminsInfo } from '@/app/api/server/admins/getAdminsInfo';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import MastersGrid from '@/components/layout/masters-grid';
import GradientLine from '@/components/shared/GradientLine';

// export const revalidate = 10;
// export const dynamicParams = true;

/**
 * Generate page metadata
 *
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @param params page params
 * @returns metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  // get page by Url
  const { page, isError } = await getPageByUrl('masters');

  if (isError || !page) {
    return {};
  }

  // extract data from page
  const { localizeInfos } = page;

  return {
    title: localizeInfos?.title,
    description: localizeInfos?.title,
    openGraph: {
      type: 'article',
    },
  };
}

/**
 * MastersPageLayout
 *
 * @returns MastersPage
 */
const MastersPageLayout: FC = async () => {
  // set dict
  ServerProvider('dict', await getDictionary());
  // get page
  const { page, isError } = await getPageByUrl('masters');
  const { admins } = await getAdminsInfo({ body: [], offset: 0, limit: 100 });

  if (!page || isError || !admins) {
    return notFound();
  }
  const masters = admins?.filter(
    (master: IAdminEntity) => master.attributeValues?.master_name && master,
  );
  const { pages } = await getChildPagesByParentUrl('services');

  const mastersData = pages?.map((page: IPagesEntity) => {
    return {
      title: page.localizeInfos?.title + ' masters',
      specialization: {
        id: page.id,
        title: page.localizeInfos?.title,
        pageUrl: page.pageUrl,
      },
      cards: masters?.filter((master: IAdminEntity) => {
        const services = master.attributeValues?.services;
        const sIds =
          (services?.value !== '' && services?.value?.map((s: any) => s.id)) ||
          [];
        const inArray = sIds?.find((s: any) => s === page.id);
        if (!inArray) {
          return;
        }
        return master;
      }),
    };
  });

  return (
    <div className="flex flex-col">
      <GradientLine />
      <MastersGrid mastersData={mastersData} />
    </div>
  );
};

export default MastersPageLayout;
