import type { IError } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

/**
 * Get page object with information about forms, blocks, menus, linked to the page.
 *
 * @param id Page id
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns Returns PageEntity object
 */
export const getPageById = async (
  id: number,
): Promise<{
  isError: boolean;
  error?: IError;
  page?: IPagesEntity;
}> => {
  try {
    const data = await api.Pages.getPageById(id);

    if (typeError(data)) {
      return { isError: true, error: data };
    } else {
      return { isError: false, page: data };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
