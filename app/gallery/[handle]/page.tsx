import type { Metadata } from 'next';
import { Suspense } from 'react';

import LineAnimations from '@/app/animations/LineAnimations';
import { getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import Gallery from '@/components/layout/gallery-grid';
import GalleryGridLoader from '@/components/layout/gallery-grid/components/GalleryGridLoader';

type PageProps = Promise<{
  handle: string;
}>;

/**
 * Generate page metadata
 *
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @param params page params
 * @returns metadata
 */
export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const { handle } = await params;
  // get page by Url
  const { page, isError } = await getPageByUrl(handle);

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
 * GallerySingleLayout
 * @param params
 * @returns GalleryGrid
 */
export default async function GallerySingleLayout({
  params,
}: {
  params: PageProps;
}) {
  const { handle } = await params;
  const [dict] = ServerProvider('dict', await getDictionary());

  return (
    <section className="flex min-h-[50vh] w-full flex-col justify-center">
      <div className="mx-auto flex w-full flex-col">
        <LineAnimations className="gradient-bg-line-20" delay={0} />
        <Suspense fallback={<GalleryGridLoader handle={handle} />}>
          <Gallery dict={dict} handle={handle} />
        </Suspense>
      </div>
    </section>
  );
}
