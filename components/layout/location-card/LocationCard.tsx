import Image from 'next/image';
import Link from 'next/link';
import type { IPagesEntity } from 'oneentry/dist/pages/pagesInterfaces';
import type { FC } from 'react';

import CardAnimations from '@/app/animations/CardAnimations';
import LocationIcon from '@/components/icons/location';
import PhoneIcon from '@/components/icons/phone';

interface LocationCardProps {
  page: IPagesEntity;
  index: number;
}

/**
 * LocationCard component to display location details.
 *
 * @param page - Page data containing location information.
 * @returns JSX.Element representing the LocationCard component.
 */
const LocationCard: FC<LocationCardProps> = ({ page, index }) => {
  const { localizeInfos, attributeValues } = page;

  // Безопасное извлечение значений с проверками
  const title = localizeInfos?.title ?? 'Location';
  const address =
    attributeValues?.salon_address?.value ?? 'Address not available';
  const phone = attributeValues?.salon_phone?.value ?? '';
  const phoneFormatted = attributeValues?.salon_phone_formatted?.value ?? phone;

  return (
    <CardAnimations className="flex gap-5 self-stretch" index={index}>
      <div className="flex grow flex-col max-md:mt-10 max-md:max-w-full">
        <div className="flex w-full flex-col justify-center">
          {/* Title */}
          <h2 className="mb-4 text-base font-bold leading-6 text-fuchsia-500">
            {title}
          </h2>
          <div className="flex flex-col not-italic text-neutral-600">
            {/* Address */}
            <address className="flex gap-1.5 text-sm not-italic leading-3 mb-2">
              <LocationIcon size={20} />
              <span>{address}</span>
            </address>
            {/* Phone */}
            {phone && (
              <Link
                href={`tel:${phone}`}
                className="mt-2.5 flex gap-1 text-sm font-bold leading-3 mb-2"
              >
                <PhoneIcon />
                <span>{phoneFormatted}</span>
              </Link>
            )}
          </div>
        </div>
        {/* Map */}
        <div className="relative mt-6 h-36 w-full">
          <Image
            fill
            loading="lazy"
            src="/images/map.png"
            sizes="(min-width: 480px) 50vw, 100vw"
            className="aspect-[2.63] w-full rounded-2xl object-cover"
            alt={`${title} location`}
          />
        </div>
      </div>
    </CardAnimations>
  );
};

export default LocationCard;
