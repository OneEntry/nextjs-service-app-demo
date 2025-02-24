import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import DropdownButton from './DropdownButton';
import ServicesList from './services/ServicesList';

interface ServicesLayoutProps {
  dict: IAttributeValues;
  services: IPagesEntity[];
  salons: IPagesEntity[];
}

/**
 * ServicesLayout Component
 * @param services
 * @param dict dictionary from server api
 * @returns JSX.Element
 */
const ServicesLayout: FC<ServicesLayoutProps> = ({
  dict,
  services,
  salons,
}) => {
  const tabKey = 'services';

  // Safely extract text value with nullish coalescing operator
  const selectServiceText = dict.select_service_text?.value ?? 'Select Service';

  return (
    <div id={tabKey} className="mb-4 flex w-full flex-col items-center">
      <DropdownButton title={selectServiceText} tabKey={tabKey} />
      <ServicesList services={services} salons={salons} tabKey={tabKey} />
    </div>
  );
};

export default ServicesLayout;
