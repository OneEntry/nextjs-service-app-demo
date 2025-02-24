import 'server-only';

import type { IAttributeValues } from 'oneentry/dist/base/utils';

import { getBlockByMarker } from '@/app/api/';

/**
 * Get dictionary
 * @param locale
 *
 */
export const getDictionary = async () => {
  try {
    // get block by marker from api
    const { block } = await getBlockByMarker('system_content');

    // extract block attribute values
    const blockValues = block?.attributeValues;

    return { ...(blockValues as IAttributeValues) };
  } catch (e) {
    console.log(e);
  }
};
