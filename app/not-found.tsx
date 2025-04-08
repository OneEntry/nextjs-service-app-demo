import Link from 'next/link';

import { getPageByUrl } from '@/app/api';

/**
 * 404 page layout
 * @async server component
 * @see {@link https://nextjs.org/docs/app/api-reference/file-conventions/not-found Next.js docs}
 * @returns page layout JSX.Element
 */
const NotFound = async () => {
  // get page by url from the API.
  const { page, isError } = await getPageByUrl('404');

  // if no page data return fallback
  if (isError || !page) {
    return (
      <div className="mx-auto flex min-h-80 w-full max-w-screen-xl flex-col items-center justify-center py-8">
        <h1 className="mb-10 text-6xl">404</h1>
        <Link href="/">Return home</Link>
      </div>
    );
  }

  // extract data from page
  const { localizeInfos, attributeValues } = page;

  return (
    <div className="mx-auto flex min-h-96 w-full max-w-screen-xl flex-col items-center justify-center py-8 text-neutral-700">
      <h1 className="mb-10 text-6xl">{localizeInfos?.title}</h1>
      <p className="mb-4">
        {attributeValues?.error_description?.value[0]?.plainValue}
      </p>
      <Link
        href="/"
        className="items-center justify-center rounded-[30px] border border-solid border-fuchsia-500 bg-transparent px-3.5 py-1 text-base font-bold uppercase tracking-wide text-fuchsia-500 transition-colors duration-300 hover:border-fuchsia-600 hover:text-fuchsia-600 focus-visible:text-fuchsia-600 focus-visible:outline-fuchsia-600 disabled:border-neutral-300 disabled:bg-[#a8a9b580] disabled:text-neutral-300"
      >
        Return home
      </Link>
    </div>
  );
};

export default NotFound;
