'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

interface MenuItemProps {
  page: IMenusPages;
  baseUrl: string;
}

/**
 * Footer menu item
 * @param page Represents a page object.
 * @returns menu item
 */
const MenuItem: FC<MenuItemProps> = ({ page, baseUrl }) => {
  const paths = usePathname();
  if (!page) {
    return;
  }
  const isActive = paths === '/' + page.pageUrl;

  return (
    <li className="relative box-border">
      <Link
        prefetch={true}
        className={
          'focus:outline-none hover:text-fuchsia-500 transition-colors ' +
          (isActive ? 'text-fuchsia-500' : '')
        }
        href={baseUrl ? '/' + baseUrl + '/' + page.pageUrl : '/' + page.pageUrl}
      >
        {page.localizeInfos?.menuTitle}
      </Link>
    </li>
  );
};

export default MenuItem;
