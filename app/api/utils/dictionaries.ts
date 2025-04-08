import 'server-only';

import type { IAttributeValues } from 'oneentry/dist/base/utils';

import { getBlockByMarker } from '@/app/api/';

import getCachedData from './getCachedData';

/**
 * Get dictionary
 * @param locale
 *
 */
export const getDictionary = async () => {
  try {
    // get block by marker from api
    const { block } = await getCachedData(
      'dictionary',
      async () => await getBlockByMarker('system_content'),
    );

    // extract block attribute values
    const blockValues = block?.attributeValues;

    return { ...(blockValues as IAttributeValues) };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
