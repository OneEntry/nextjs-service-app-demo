/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import {
  getAdminsInfo,
  getChildPagesByParentUrl,
  getPageByUrl,
} from '@/app/api';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import GalleryGrid from '@/components/layout/gallery-grid';

import { getDictionary } from '../../api/utils/dictionaries';

/**
 * Generate page metadata
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @param params page params
 * @returns metadata
 */
export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const { handle } = await params;
  // get page by Url
  const { page, isError } = await getPageByUrl(handle);

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

const GallerySingleLayout: FC<{
  params: { handle: string };
}> = async ({ params }) => {
  const { handle } = await params;
  const [dict] = ServerProvider('dict', await getDictionary());
  const { page, isError } = await getPageByUrl(handle);
  const { pages: childPages } = await getChildPagesByParentUrl(handle);
  const { admins } = await getAdminsInfo({ offset: 0, limit: 100 });
  const masters = admins?.filter(
    (master: IAdminEntity) => master.attributeValues.master_name && master,
  );

  if (!page || isError) {
    return;
  }

  const data =
    childPages?.map((page: IPagesEntity) => {
      return {
        masterId: page?.attributeValues?.master_id.value?.[0]?.value,
        photos: page?.attributeValues?.gallery_photos?.value,
      };
    }) || [];

  return <GalleryGrid dict={dict} page={page} masters={masters} data={data} />;
};

export default GallerySingleLayout;
