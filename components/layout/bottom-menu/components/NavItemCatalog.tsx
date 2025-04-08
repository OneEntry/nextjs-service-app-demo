'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import CatalogIcon from '@/components/icons/catalog';

/**
 * Catalog navigation menu item
 * @param item menu element object
 * @returns menu item
 */
const NavItemCatalog: FC<{ item: IMenusPages }> = ({
  item: { pageUrl, localizeInfos },
}) => {
  return (
    <Link
      prefetch={false}
      href={'/' + pageUrl}
      title={localizeInfos.menuTitle}
      className="group relative box-border flex size-6 shrink-0 flex-col"
    >
      <CatalogIcon />
    </Link>
  );
};

export default NavItemCatalog;
