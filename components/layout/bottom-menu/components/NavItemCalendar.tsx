'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import CalendarIcon from '@/components/icons/calendar';

/**
 * Nav item cart button
 * @param item
 * @returns JSX.Element
 */
const NavItemCalendar: FC<{
  item: IMenusPages;
}> = ({ item }) => {
  // get count from cart reducer
  const cartCount = useAppSelector((state) => {
    return state.cartReducer.servicesData?.length;
  });

  const { pageUrl, localizeInfos } = item;

  return (
    <Link
      prefetch={true}
      href={'/' + pageUrl}
      title={localizeInfos?.menuTitle}
      className="group relative box-border flex size-6 shrink-0 flex-col"
    >
      <CalendarIcon />
      {cartCount && (
        <div className="absolute right-1 top-1 z-10 size-4 rounded-full bg-fuchsia-500 text-center text-sm leading-4">
          {cartCount}
        </div>
      )}
    </Link>
  );
};

export default NavItemCalendar;
