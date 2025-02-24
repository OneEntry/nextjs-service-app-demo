import type { IAttributesSetsEntity } from 'oneentry/dist/attribute-sets/attributeSetsInterfaces';
import type { IError } from 'oneentry/dist/base/utils';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

interface HandleProps {
  attributeMarker: string;
  setMarker: string;
}
/**
 * Get a single attribute with data from the attribute sets.
 *
 * @param attributeMarker Text identifier (marker) of the attribute in the set.
 * @param setMarker Text identifier (marker) of the attribute set.
 * @see {@link https://oneentry.cloud/instructions/npm OneEntry docs}
 *
 * @returns SingleAttribute|Error object.
 */
export const getSingleAttributeByMarkerSet = async ({
  attributeMarker,
  setMarker,
}: HandleProps): Promise<{
  isError: boolean;
  error?: IError;
  attribute?: IAttributesSetsEntity;
}> => {
  try {
    const attribute = await api.AttributesSets.getSingleAttributeByMarkerSet(
      attributeMarker,
      setMarker,
    );

    if (typeError(attribute)) {
      return { isError: true, error: attribute as IError };
    } else {
      return { isError: false, attribute: attribute };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
