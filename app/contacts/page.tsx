import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC, Key } from 'react';

import { getChildPagesByParentUrl, getPageByUrl } from '@/app/api';
import LocationCard from '@/components/layout/location-card/LocationCard';

/**
 * Generate page metadata
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @returns metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  // get page by Url
  const { page, isError } = await getPageByUrl('contacts');
  if (isError || !page) {
    return notFound();
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

const ContactsPageLayout: FC = async () => {
  // get page by Url
  const { page, isError } = await getPageByUrl('contacts');

  // get child pages by Url
  const { pages } = await getChildPagesByParentUrl('salons');

  if (!page || isError) {
    return;
  }

  return (
    <>
      <div className="bg-gradient-1 absolute left-1/2 h-[50px] w-screen -translate-x-1/2 sm:h-[60px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]" />
      <section className="mx-auto mt-[50px] grid w-[1440px] max-w-full grid-cols-3 items-center gap-24 bg-white px-5 pb-16 pt-7 max-xl:grid-cols-3 max-lg:grid-cols-2 max-lg:gap-12 max-md:grid-cols-1 max-md:gap-8 max-md:px-5 max-sm:grid-cols-1 sm:mt-[60px] lg:mt-[80px] xl:mt-[90px] 2xl:mt-[100px]">
        {pages?.map((page: IPagesEntity, i: Key) => {
          return <LocationCard key={i} page={page} />;
        })}
      </section>
    </>
  );
};

export default ContactsPageLayout;
