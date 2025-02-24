import type { IError } from 'oneentry/dist/base/utils';
import type { IBlockEntity } from 'oneentry/dist/blocks/blocksInterfaces';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

/**
 * Get block by marker.
 *
 * @property {string} marker Marker of Block.
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns Return array of BlocksEntity object Promise.
 */
export const getBlockByMarker = async (
  marker: string,
): Promise<{
  isError: boolean;
  error?: IError;
  block?: IBlockEntity;
}> => {
  try {
    const data = await api.Blocks.getBlockByMarker(marker);

    if (typeError(data)) {
      return { isError: true, error: data };
    } else {
      return { isError: false, block: data };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
