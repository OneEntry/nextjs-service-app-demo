import type { IError } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

/**
 * Get pages objects.
 *
 * @param url Page URL
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns Returns PageEntity object
 */
export const getPagesByIds = async (
  ids: [],
): Promise<{
  isError: boolean;
  error?: IError;
  pages?: IPagesEntity[];
}> => {
  try {
    const data = await Promise.all(
      ids.map(async (id: number) => {
        const page = await api.Pages.getPageById(id);
        return page;
      }),
    ).then((results) => results);

    if (typeError(data)) {
      return { isError: true, error: data };
    } else {
      return { isError: false, pages: data as IPagesEntity[] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
