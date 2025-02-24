import Link from 'next/link';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { IMenusEntity } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import { getMenuByMarker } from '@/app/api';

import MenuButton from './MenuButton';
import NavItemProfile from './NavItemProfile';

/**
 * User navigation group
 * @returns JSX.Element
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NavGroup: FC<{ dict: IAttributeValues }> = async ({ dict }) => {
  const { menu, isError } = await getMenuByMarker('user_menu');

  if (!menu || isError) {
    return <p>Menu not found</p>;
  }

  return (
    <div className="fade-in my-auto flex items-center gap-4 max-md:max-w-full">
      <div className="hidden gap-4 max-md:gap-4 max-sm:gap-2 md:flex">
        <Link
          href="/booking/"
          className="h-auto justify-center self-center rounded-md bg-fuchsia-500 px-5 py-1.5 text-sm leading-6 text-white outline-none transition duration-500 ease-in-out hover:bg-fuchsia-600 focus:bg-fuchsia-600 focus:outline-none disabled:bg-[#a8a9b580]"
        >
          BOOK ONLINE
        </Link>
        <NavItemProfile userMenu={menu as IMenusEntity} />
      </div>
      <MenuButton />
    </div>
  );
};

export default NavGroup;
