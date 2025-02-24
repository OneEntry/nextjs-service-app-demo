import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { FC } from 'react';

import { getPageByUrl } from '@/app/api';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import type { PageProps } from '@/app/types/global';
import PaymentCanceled from '@/components/pages/PaymentCanceled';
import PaymentSuccess from '@/components/pages/PaymentSuccess';

import { getDictionary } from '../api/utils/dictionaries';

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

/**
 * Simple page
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @param params page params
 * @returns page layout JSX.Element
 */
const PageLayout: FC<PageProps> = async ({ params }) => {
  const { handle } = await params;
  const [dict] = ServerProvider('dict', await getDictionary());

  // get page by Url
  const { page, isError } = await getPageByUrl(handle);

  if (isError || !page) {
    return notFound();
  }

  const { pageUrl, templateIdentifier } = page;

  // array of pages components with additional settings for next router
  const pages = [
    {
      templateType: templateIdentifier,
      name: 'payment_success',
      component: <PaymentSuccess page={page} dict={dict} />,
    },
    {
      templateType: templateIdentifier,
      name: 'payment_canceled',
      component: <PaymentCanceled page={page} dict={dict} />,
    },
  ];

  return (
    <div className="mx-auto flex min-h-80 w-full max-w-screen-2xl flex-col overflow-hidden">
      {pages.map((p, i) => {
        if (pageUrl !== p.name) {
          return;
        }
        return <div key={i}>{p.component}</div>;
      })}
    </div>
  );
};

export default PageLayout;
