import parse from 'html-react-parser';
import type { IAdminEntity } from 'oneentry/dist/admins/adminsInterfaces';
import type { FC } from 'react';

interface MasterDescriptionProps {
  master: IAdminEntity;
}

/**
 * MasterDescription component to render the description of a master.
 * @param master - Master entity containing the description.
 * @returns JSX.Element representing the MasterDescription component.
 */
const MasterDescription: FC<MasterDescriptionProps> = ({ master }) => {
  const descriptionHtml =
    master.attributeValues.master_description?.value?.[0]?.htmlValue;

  return (
    <div className="item mb-10 text-lg leading-6 tracking-wide text-neutral-600 max-md:max-w-full max-sm:text-base">
      {descriptionHtml ? parse(descriptionHtml) : null}
    </div>
  );
};

export default MasterDescription;
