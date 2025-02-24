/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';

import CardImage from './CardImage';
import CardInfo from './CardInfo';

interface MastersFeedCardProps {
  dict: IAttributeValues;
  master: IAdminEntity;
  setState: any;
}

const MastersFeedCard: FC<MastersFeedCardProps> = ({
  dict,
  master,
  setState,
}) => {
  return (
    <div
      className="gallery-feed-card group"
      onPointerEnter={() => setState(true)}
      onPointerLeave={() => setState(false)}
    >
      <div className="relative flex size-full flex-col justify-center text-sm text-white">
        <CardImage master={master} />
        <CardInfo dict={dict} master={master} />
      </div>
    </div>
  );
};

export default MastersFeedCard;
