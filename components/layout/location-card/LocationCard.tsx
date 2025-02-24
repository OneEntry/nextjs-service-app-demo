import Image from 'next/image';
import Link from 'next/link';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import LocationIcon from '@/components/icons/location';
import PhoneIcon from '@/components/icons/phone';

interface LocationCardProps {
  page: IPagesEntity;
}

/**
 * LocationCard component to display location details.
 *
 * @param page - Page data containing location information.
 * @returns JSX.Element representing the LocationCard component.
 */
const LocationCard: FC<LocationCardProps> = ({ page }) => {
  const { localizeInfos, attributeValues } = page;
  const { salon_address, salon_phone, salon_phone_formatted } = attributeValues;

  const title = localizeInfos?.title ?? '';
  const address = salon_address?.value ?? 'Address not available';
  const phone = salon_phone?.value ?? '';
  const phoneFormatted = salon_phone_formatted?.value || phone;

  return (
    <div className="flex gap-5 self-stretch">
      <div className="flex grow flex-col max-md:mt-10 max-md:max-w-full">
        <div className="flex w-full flex-col justify-center">
          {/* Title */}
          <h2 className="mb-4 text-base font-bold leading-6 text-fuchsia-500">
            {title}
          </h2>
          <div className="flex flex-col not-italic text-neutral-600">
            {/* Address */}
            <address className="flex gap-1.5 text-sm not-italic leading-5">
              <LocationIcon size={20} />
              <span>{address}</span>
            </address>
            {/* Phone */}
            <Link
              href={`tel:${phone}`}
              className="mt-2.5 flex gap-1 text-sm font-bold leading-5"
            >
              <PhoneIcon />
              <span>{phoneFormatted}</span>
            </Link>
          </div>
        </div>
        {/* Map */}
        <div className="relative mt-6 h-36 w-full">
          <Image
            fill
            loading="lazy"
            src="/images/thumb.svg"
            sizes="(min-width: 480px) 50vw, 100vw"
            className="aspect-[2.63] w-full rounded-2xl object-cover"
            alt="Beauty One location"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
