import type { Metadata } from 'next';
import { Suspense } from 'react';

import LineAnimations from '@/app/animations/LineAnimations';
import { getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import MasterSingleLayout from '@/components/layout/master-single';
import MasterLoader from '@/components/layout/master-single/components/MasterLoader';
import PortfolioGridLayout from '@/components/layout/portfolio-grid';
import PortfolioGridLoader from '@/components/layout/portfolio-grid/components/PortfolioGridLoader';
import GradientLine from '@/components/shared/GradientLine';

// export const revalidate = 10;
// export const dynamicParams = true;

type PageParams = Promise<{ handle: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

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
 * MasterPage Layout
 *
 * @param params
 * @param searchParams
 * @returns MasterPage
 */
export default async function MasterPageLayout({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams?: SearchParams;
}) {
  const { handle } = await params;
  const searchData = await searchParams;

  // set dict
  ServerProvider('dict', await getDictionary());

  return (
    <>
      <GradientLine />
      <Suspense fallback={<MasterLoader />}>
        <MasterSingleLayout handle={handle} searchData={searchData} />
      </Suspense>
      <div className="flex w-full flex-col justify-center">
        <div className="mx-auto flex w-full flex-col">
          <LineAnimations className="gradient-bg-line-20" delay={0.5} />
          <Suspense fallback={<PortfolioGridLoader />}>
            <PortfolioGridLayout handle={handle} searchData={searchData} />
          </Suspense>
        </div>
      </div>
    </>
    // <Loader />
  );
}
