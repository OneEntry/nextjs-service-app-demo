'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

interface UserMenuItemProps {
  page: IMenusPages;
  setState: (state: boolean) => void;
}

/**
 * User menu item link component.
 *
 * @param page - The page object containing URL and localization info.
 * @param setState - Function to update state.
 * @returns JSX.Element representing a user menu item link.
 */
const UserMenuItem: FC<UserMenuItemProps> = ({ page, setState }) => (
  <Link
    prefetch={true}
    href={`/${page.pageUrl}`}
    title={page.localizeInfos.menuTitle}
    className="group relative box-border flex p-2 text-slate-800 hover:text-fuchsia-500"
    onClick={() => setState(false)}
  >
    {page.localizeInfos.menuTitle}
  </Link>
);

export default UserMenuItem;
