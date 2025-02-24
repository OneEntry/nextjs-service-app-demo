import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import { getMenuByMarker } from '@/app/api';

import MenuItem from './VerticalMenuItem';

/**
 * Footer menu
 * @param menu Represents a menu object.
 * @returns footer menu
 */
const VerticalMenu: FC<{
  className: string;
  menuName: string;
  baseUrl: string;
}> = async ({ className, menuName, baseUrl }) => {
  const { isError, menu } = await getMenuByMarker(menuName);
  const pages = menu?.pages as Array<IMenusPages>;

  if (
    isError ||
    !menu ||
    !pages ||
    (Array.isArray(pages) && pages.length < 1)
  ) {
    return;
  }

  return (
    <nav className={className}>
      <h3 className="text-lg font-bold">{menu.localizeInfos?.title}</h3>
      <ul className="relative box-border flex shrink-0 flex-col gap-2.5 leading-4">
        {pages.map((page, index) => {
          return <MenuItem key={index} page={page} baseUrl={baseUrl} />;
        })}
      </ul>
    </nav>
  );
};

export default VerticalMenu;
