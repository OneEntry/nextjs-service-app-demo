import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import { ServerProvider } from '@/app/store/providers/ServerProvider';

import BookingButton from './BookingButton';
import MasterDescription from './MasterDescription';
import MasterInfo from './MasterInfo';
import MasterReviews from './MasterReviews';

interface MasterProps {
  master: IAdminEntity;
  service?: IPagesEntity;
}

/**
 * Master component to display detailed information about a master.
 * @param master - Master entity data.
 * @param service - Optional service information.
 * @returns JSX.Element representing the Master component.
 */
const Master: FC<MasterProps> = async ({ master, service }) => {
  const [dict] = ServerProvider('dict');

  return (
    <div className="flex flex-col max-md:max-w-full">
      <div className="item mb-6 flex justify-between gap-0 max-lg:flex-wrap">
        {/* Display master information */}
        <MasterInfo master={master} service={service} />
        {/* Display reviews for the master */}
        <MasterReviews master={master} />
      </div>
      {/* Display master description */}
      <MasterDescription master={master} />
      {/* Button for booking a service with the master */}
      <BookingButton service={service} master={master} dict={dict} />
    </div>
  );
};

export default Master;
