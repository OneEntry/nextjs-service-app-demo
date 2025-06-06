import type { IError } from 'oneentry/dist/base/utils';
import type { IPositionBlock } from 'oneentry/dist/pages/pagesInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

interface HandleProps {
  pageUrl: string;
}

/**
 * Get all blocks by page url.
 *
 * @param pageUrl Page URL
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns all blocks as an array of PositionBlock objects or an empty array [] (if there is no data) for the selected parent
 */
export const getBlocksByPageUrl = async ({
  pageUrl,
}: HandleProps): Promise<{
  isError: boolean;
  error?: IError;
  blocks?: IPositionBlock[];
}> => {
  try {
    const data = await api.Pages.getBlocksByPageUrl(pageUrl);

    if (typeError(data)) {
      return { isError: true, error: data };
    } else {
      return { isError: false, blocks: data };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
