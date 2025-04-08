import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';

import { getBlockByMarker, getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import CatalogSection from '@/components/layout/catalog-grid';
import GradientLine from '@/components/shared/GradientLine';

/**
 * Generate page metadata
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @param params page params
 * @returns metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  // get page by Url
  const { page, isError } = await getPageByUrl('services');
  if (isError || !page) {
    return {};
  }

  // extract data from page
  const { localizeInfos } = page;

  return {
    title: localizeInfos?.title,
    description: localizeInfos?.plainContent,
    openGraph: {
      type: 'article',
    },
  };
}

/**
 * ServicesPageLayout
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 */
const ServicesPageLayout: FC = async () => {
  ServerProvider('dict', await getDictionary());
  const { page, isError } = await getPageByUrl('services');
  const { block } = await getBlockByMarker('home_catalog');

  if (!page || !block || isError) {
    return notFound();
  }

  return (
    <>
      <GradientLine />
      <section className="flex w-full flex-col items-center bg-white px-16 pb-4 pt-12 max-md:px-5 max-md:pb-20">
        <div className="mb-10 flex w-[880px] max-w-full flex-col gap-10">
          <CatalogSection block={block} />
        </div>
      </section>
    </>
  );
};

export default ServicesPageLayout;
