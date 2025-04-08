import Link from 'next/link';
import type { IMenusEntity } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import { getMenuByMarker } from '@/app/api';
import { ServerProvider } from '@/app/store/providers/ServerProvider';

import MenuButton from './MenuButton';
import NavItemProfile from './NavItemProfile';

/**
 * User navigation group
 * @returns JSX.Element
 */

const NavGroup: FC = async () => {
  const [dict] = ServerProvider('dict');
  const { menu, isError } = await getMenuByMarker('user_menu');
  const { book_text, menu_not_found_text } = dict;

  if (!menu || isError) {
    return <p>{menu_not_found_text?.value}</p>;
  }
  return (
    <div className="fade-in my-auto flex items-center gap-4 max-md:max-w-full">
      <div className="hidden gap-4 max-md:gap-4 max-sm:gap-2 md:flex">
        <Link
          href="/booking/"
          className="h-auto uppercase justify-center self-center rounded-md bg-fuchsia-500 px-5 py-1.5 text-sm leading-6 text-white outline-none transition duration-500 ease-in-out hover:bg-fuchsia-600 focus:bg-fuchsia-600 focus:outline-none disabled:bg-[#a8a9b580]"
        >
          {book_text?.value}
        </Link>
        <NavItemProfile userMenu={menu as IMenusEntity} />
      </div>
      <MenuButton />
    </div>
  );
};

export default NavGroup;
