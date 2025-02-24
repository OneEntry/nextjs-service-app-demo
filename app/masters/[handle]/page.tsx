import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

import { getAdminsInfo, getPageById, getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import MasterSingleLayout from '@/components/layout/master-single';
import PortfolioGridLayout from '@/components/layout/portfolio-grid';
import GradientLine from '@/components/shared/GradientLine';

// export const revalidate = 10;
// export const dynamicParams = true;

/**
 * Generate page metadata
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @param params page params
 * @returns metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  // get page by Url
  const { page, isError } = await getPageByUrl('masters');

  if (isError || !page) {
    return notFound();
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
 * MasterPage Layout
 *
 * @param params
 * @param searchParams
 * @returns Master page
 */
const MasterPageLayout: FC<{
  params: { handle: string };
  searchParams?: {
    service?: number;
  };
}> = async ({ searchParams, params }) => {
  const { handle } = await params;
  const searchData = await searchParams;

  // set dict
  const [dict] = ServerProvider('dict', await getDictionary());

  // masters
  const { admins } = await getAdminsInfo({ offset: 0, limit: 100 });
  const master = admins?.find(
    (admin: IAdminEntity) => admin.id === Number(handle),
  );

  // if no data in searchParams get first master service id
  const sId =
    searchData?.service || master?.attributeValues.services.value[0].id;

  const { page: service, isError } = await getPageById(sId as number);

  if (!master || !service || isError) {
    return;
  }

  return (
    <>
      <GradientLine />
      <MasterSingleLayout dict={dict} master={master} service={service} />
      <PortfolioGridLayout master={master} service={service} />
    </>
  );
};

export default MasterPageLayout;
