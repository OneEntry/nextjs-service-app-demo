/* eslint-disable @typescript-eslint/no-explicit-any */
import parse from 'html-react-parser';
import type { FC, Key } from 'react';

import { getBlockByMarker } from '@/app/api';

/**
 * OpeningTime
 */
const OpeningTime: FC = async () => {
  const { block } = await getBlockByMarker('opening_time');
  const openingTime = block?.attributeValues.opening_time?.value || [];

  return openingTime.map((time: any, i: Key) => {
    return (
      <div key={i} className="flex justify-between gap-5">
        <div>{time.header}</div>
        <div>{time.htmlValue && parse(time.htmlValue)}</div>
      </div>
    );
  });
};

export default OpeningTime;
