/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import NavigationMenuItem from './NavigationMenuItem';

interface MainMenuProps {
  menu: IMenusPages[];
}

/**
 * Main navigation menu component.
 * @param menu - Represents a menu array of objects.
 * @returns JSX.Element representing the main navigation menu.
 */
const NavigationMenu: FC<MainMenuProps> = ({ menu }) => {
  return (
    <nav className="fade-in hidden text-neutral-600 lg:flex">
      <ul className="nav-menu my-auto flex flex-row flex-wrap gap-5">
        {menu.map((item, index) => (
          <li key={index} className={item.children ? 'group' : ''}>
            <NavigationMenuItem
              label={item.localizeInfos.menuTitle}
              href={`/${item.pageUrl !== 'home' ? item.pageUrl : ''}`}
              hasDropdown={Boolean(item.children)}
            />
            {Array.isArray(item.children) && (
              <ul className="fixed z-50 hidden flex-col rounded-b-2xl bg-white p-6 leading-8 shadow-lg group-hover:flex">
                {item.children.map((child, childIndex) => (
                  <li key={childIndex} className="px-4">
                    <Link
                      prefetch={true}
                      href={`/${item.pageUrl}/${child.pageUrl}`}
                      className="flex w-full py-2 uppercase text-neutral-500 transition-colors duration-300 ease-in-out hover:text-fuchsia-500 focus:text-fuchsia-500 focus:outline-none"
                    >
                      {child.localizeInfos.menuTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
