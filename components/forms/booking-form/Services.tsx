import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import DropdownAnimations from './animations/DropdownAnimations';
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
    <DropdownAnimations
      id={tabKey}
      className="mb-4 flex w-full flex-col items-center"
      index={1}
      tabKey={tabKey}
    >
      <DropdownButton title={selectServiceText} tabKey={tabKey} />
      <ServicesList services={services} salons={salons} tabKey={tabKey} />
    </DropdownAnimations>
  );
};

export default ServicesLayout;
