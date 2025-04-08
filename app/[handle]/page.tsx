import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPageByUrl } from '@/app/api';
import { getDictionary } from '@/app/api/utils/dictionaries';
import { ServerProvider } from '@/app/store/providers/ServerProvider';
import PaymentCanceled from '@/components/pages/PaymentCanceled';
import PaymentSuccess from '@/components/pages/PaymentSuccess';

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

  // Fetch page data based on the URL handle
  const { page, isError } = await getPageByUrl(handle);

  if (isError || !page) {
    return {}; // Return default metadata or handle not found appropriately
  }

  const { localizeInfos } = page;

  return {
    title: localizeInfos?.title || 'Default Title',
    description: localizeInfos?.description || 'Default Description',
    openGraph: {
      type: 'article',
    },
  };
}

/**
 * Simple page layout
 *
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/page Next.js docs}
 * @param params page params
 * @returns page layout JSX.Element
 */
export default async function PageLayout({ params }: { params: PageProps }) {
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
        if (pageUrl === p.name) {
          return <div key={i}>{p.component}</div>;
        }
        return null;
      })}
    </div>
  );
}
