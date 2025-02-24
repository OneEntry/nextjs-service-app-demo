'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import BookingIcon from '@/components/icons/booking';

/**
 * NavItemBooking
 * @param item
 * @returns JSX.Element
 */
const NavItemBooking: FC<{ item: IMenusPages }> = ({ item }) => {
  const { pageUrl, localizeInfos } = item;

  return (
    <Link
      prefetch={true}
      href={'/' + pageUrl}
      title={localizeInfos.menuTitle}
      className="group relative box-border flex size-6 shrink-0 flex-col"
    >
      <BookingIcon />
    </Link>
  );
};

export default NavItemBooking;
