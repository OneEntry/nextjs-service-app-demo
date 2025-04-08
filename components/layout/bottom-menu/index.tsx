import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';
import { type Key } from 'react';

import { getMenuByMarker } from '@/app/api';

import NavItemBooking from './components/NavItemBooking';
import NavItemCalendar from './components/NavItemCalendar';
import NavItemCatalog from './components/NavItemCatalog';
import NavItemHome from './components/NavItemHome';
import NavItemProfile from './components/NavItemProfile';

/**
 * Bottom menu for mobile devices
 * @returns bottom mobile menu JSX.Element
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BottomMobileMenu: FC<{ dict: IAttributeValues }> = async (dict) => {
  // Get Menu by marker from api
  const { menu, isError } = await getMenuByMarker('bottom_web');

  return (
    <div className="z-500 fixed bottom-0 my-auto hidden h-[60px] w-full items-center justify-between gap-10 bg-white p-4 max-md:flex">
      {!isError &&
        menu &&
        Array.isArray(menu.pages) &&
        menu.pages.map((item: IMenusPages, i: Key) => {
          return (
            <div className="flex size-6" key={i}>
              {item.pageUrl === 'home' && <NavItemHome item={item} />}
              {item.pageUrl === 'services' && <NavItemCatalog item={item} />}
              {item.pageUrl === 'booking' && <NavItemBooking item={item} />}
              {item.pageUrl === 'masters' && <NavItemCalendar item={item} />}
              {item.pageUrl === 'profile' && <NavItemProfile item={item} />}
            </div>
          );
        })}
    </div>
  );
};

export default BottomMobileMenu;
