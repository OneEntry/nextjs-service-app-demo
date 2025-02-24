import parse from 'html-react-parser';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

interface MasterInfoProps {
  master: IAdminEntity;
  service?: IPagesEntity;
}

/**
 * MasterInfo component to render information about a master.
 * @param page - Page entity (currently unused).
 * @param master - Master entity containing various attributes.
 * @param service
 * @returns JSX.Element representing the MasterInfo component or null if page or master is missing.
 */
const MasterInfo: FC<MasterInfoProps> = ({ master, service }) => {
  if (!master) {
    return null;
  }

  const { master_name, master_expirience } = master.attributeValues;

  const title = service?.localizeInfos.title ?? '';
  const exp = master_expirience?.value ?? '';
  const name = master_name?.value ?? 'Unnamed';

  return (
    <div className="flex w-full flex-col">
      <h2 className="mb-4 w-full text-3xl leading-5 text-slate-400 max-sm:text-2xl">
        {name}
      </h2>
      <p className="w-full text-xl text-fuchsia-500 max-sm:text-sm">
        {title} master
      </p>
      <p className="w-full text-lg text-neutral-600 max-sm:mb-2.5 max-sm:text-sm">
        Working experience:{' '}
        <span className="font-bold text-neutral-600">{exp && parse(exp)}</span>
      </p>
    </div>
  );
};

export default MasterInfo;
