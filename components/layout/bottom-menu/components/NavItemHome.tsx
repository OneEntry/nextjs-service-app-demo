'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import HomeIcon from '@/components/icons/home';

/**
 * Home navItem menu element
 * @param item menu element object.
 * @returns
 */
const NavItemHome: FC<{ item: IMenusPages }> = ({
  item: { localizeInfos },
}) => {
  return (
    <Link
      href={'/'}
      prefetch={false}
      title={localizeInfos.menuTitle}
      className="group relative box-border flex size-6 shrink-0 flex-col"
    >
      <HomeIcon />
    </Link>
  );
};

export default NavItemHome;
