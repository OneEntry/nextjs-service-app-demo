/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IError } from 'oneentry/dist/base/utils';

import { api } from '@/app/api';
import { typeError } from '@/components/utils';

interface HandleProps {
  offset: number;
  limit: number;
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
export const getAdminsInfo = async ({
  offset,
  limit,
}: HandleProps): Promise<{
  isError: boolean;
  error?: IError;
  admins?: IAdminEntity[];
}> => {
  try {
    const data = await api.Admins.getAdminsInfo('en_US', offset, limit);
    if (typeError(data)) {
      return { isError: true, error: data as IError };
    } else {
      return { isError: false, admins: data };
    }
  } catch (e: any) {
    return { isError: true, error: e };
  }
};
