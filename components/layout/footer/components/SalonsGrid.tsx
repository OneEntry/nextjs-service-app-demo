import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import { getChildPagesByParentUrl } from '@/app/api';
import Phone2Icon from '@/components/icons/phone-2';

/**
 * SalonsGrid
 * @async
 * @returns JSX.Element
 */
const SalonsGrid: FC = async () => {
  const { pages } = await getChildPagesByParentUrl('salons');

  const contactsData = pages?.map((page: IPagesEntity) => {
    return {
      title: page.localizeInfos?.title,
      address: page.attributeValues?.salon_address?.value,
      phone: page.attributeValues?.salon_phone?.value,
      phoneFormatted: page.attributeValues?.salon_phone_formatted?.value,
    };
  });

  return contactsData?.map(
    (
      item: {
        title: string;
        address: string;
        phone: string;
        phoneFormatted: string;
      },
      i: number,
    ) => {
      return (
        <div key={i} className="flex">
          <div className="flex flex-col">
            <h2 className="mb-5 text-base uppercase tracking-wide max-sm:mb-3">
              {item.title}
            </h2>
            <address className="not-italic">
              <p className="mb-1.5 text-sm">{item.address}</p>
              <a
                href={'tel:' + item.phone}
                className="flex gap-2 text-sm font-bold focus:outline-none"
              >
                <Phone2Icon />
                <p>{item.phoneFormatted}</p>
              </a>
            </address>
          </div>
          {contactsData.length - 1 > i && (
            <div className="relative ml-4 box-border flex h-[110%] w-px shrink-0 flex-col self-stretch bg-black max-md:flex max-sm:hidden"></div>
          )}
        </div>
      );
    },
  );
};

export default SalonsGrid;
