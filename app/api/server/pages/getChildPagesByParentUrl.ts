import type { IError } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

/**
 * Get child pages object with information as an array.
 *
 * @param url Page URL
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns Returns all created pages as an array of PageEntity objects or an empty array [] (if there is no data) for the selected parent
 */
export const getChildPagesByParentUrl = async (
  url: string,
): Promise<{
  isError: boolean;
  error?: IError;
  pages?: IPagesEntity[] | IError;
}> => {
  try {
    const data = await api.Pages.getChildPagesByParentUrl(url);
    if (typeError(data)) {
      return { isError: true, error: data };
    } else {
      return { isError: false, pages: data };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
