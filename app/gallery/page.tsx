import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';

import { getChildPagesByParentUrl, getPageByUrl } from '@/app/api';
import GalleryCatsGrid from '@/components/layout/gallery-cats';

/**
 * Generate page metadata
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @returns metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  // get page by Url
  const { page, isError } = await getPageByUrl('gallery');

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
 * GalleryPageLayout
 */
const GalleryPageLayout: FC = async () => {
  const { pages, isError } = await getChildPagesByParentUrl('gallery');
  if (!pages || isError) return;

  return (
    <main className="flex w-full flex-col justify-center">
      <div className="gradient-bg-line-20"></div>
      <div className="mx-auto flex w-[1140px] max-w-full flex-col items-center px-5 py-10">
        <div className="grid w-full grid-cols-3 justify-center gap-x-32 gap-y-12 max-xl:grid-cols-3 max-lg:grid-cols-3 max-lg:gap-x-16 max-md:grid-cols-2 max-sm:grid-cols-1">
          <GalleryCatsGrid pages={pages} />
        </div>
      </div>
    </main>
  );
};

export default GalleryPageLayout;
