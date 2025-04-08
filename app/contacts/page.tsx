import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC, Key } from 'react';

import { getChildPagesByParentUrl, getPageByUrl } from '@/app/api';

import LineAnimations from '../animations/LineAnimations';

const LocationCard = dynamic(
  () => import('@/components/layout/location-card/LocationCard'),
  { ssr: true },
);

/**
 * Generate page metadata
 *
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @returns metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  // get page by Url
  const { page, isError } = await getPageByUrl('contacts');

  if (isError || !page) {
    return {};
  }

  // extract data from page
  const { localizeInfos } = page;

  return {
    title: localizeInfos?.title || 'Contacts',
    description: localizeInfos?.plainContent || 'Contact information',
    openGraph: {
      type: 'article',
    },
  };
}

/**
 * ContactsPageLayout
 *
 * @async server component
 * @returns
 */
const ContactsPageLayout: FC = async () => {
  // get page by Url
  const { page, isError } = await getPageByUrl('contacts');

  // get child pages by Url
  const { pages, isError: salonsError } =
    await getChildPagesByParentUrl('salons');

  if (!page || isError || salonsError) {
    return notFound();
  }

  if (!pages || !Array.isArray(pages)) {
    return (
      <>
        <LineAnimations
          className="bg-gradient-1 h-[50px] w-screen sm:h-[60px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]"
          delay={0}
        />
        <section className="mx-auto mt-[50px] grid min-h-[50vh] w-screen max-w-[1440px] grid-cols-3 items-center gap-24 bg-white px-5 pb-16 pt-7 max-xl:grid-cols-3 max-lg:grid-cols-2 max-lg:gap-12 max-md:grid-cols-1 max-md:gap-8 max-md:px-5 max-sm:grid-cols-1">
          <p className="col-span-full text-center text-neutral-600">
            No salon locations available at the moment.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <LineAnimations
        className="bg-gradient-1 h-[50px] w-screen sm:h-[60px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]"
        delay={0}
      />
      <section className="mx-auto mt-[50px] grid min-h-[50vh] w-screen max-w-[1440px] grid-cols-3 items-center gap-24 bg-white px-5 pb-16 pt-7 max-xl:grid-cols-3 max-lg:grid-cols-2 max-lg:gap-12 max-md:grid-cols-1 max-md:gap-8 max-md:px-5 max-sm:grid-cols-1">
        {pages.map((page: IPagesEntity, i: Key | number) => {
          return <LocationCard key={i} index={i as number} page={page} />;
        })}
      </section>
    </>
  );
};

export default ContactsPageLayout;
