import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { type FC } from 'react';

import { getPageByUrl, getProductsByPageUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import OffersTable from '@/components/layout/offers-table';
import ProductsTable from '@/components/layout/products-table';
import ServiceHero from '@/components/layout/service-hero';

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
  // get page by Url
  const { handle } = await params;
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

const ServicePageLayout: FC<{
  params: { handle: string };
}> = async ({ params }) => {
  const { handle } = await params;
  ServerProvider('dict', await getDictionary());
  const { page, isError } = await getPageByUrl(handle);
  const { products } = await getProductsByPageUrl({
    limit: 100,
    offset: 0,
    params: { handle },
  });

  if (!page || isError || !products) {
    return 'isError';
  }

  return (
    <>
      <ServiceHero page={page} />
      <div className="flex w-full flex-col items-center bg-white px-16 pb-20 pt-12 max-md:px-5 max-md:pb-4">
        <div className="mb-10 flex w-[880px] max-w-full flex-col gap-10">
          <ProductsTable
            title={page.localizeInfos.title}
            products={products}
            service={page}
          />
          <OffersTable products={products} service={page} />
        </div>
      </div>
    </>
  );
};

export default ServicePageLayout;
