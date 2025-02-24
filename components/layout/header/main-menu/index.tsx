import type { IMenusEntity } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';

import { flatMenuToNested } from '@/components/utils';

import MainMenuLoader from './components/MenuLoader';
import NavigationMenu from './components/NavigationMenu';

/**
 * Main menu component.
 * @async
 * @returns JSX.Element representing the main navigation menu or a loading/error state.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MainMenu: FC<{ menu: IMenusEntity }> = async ({ menu }) => {
  if (!menu?.pages) {
    return <MainMenuLoader limit={4} />;
  }

  // Convert menu flat array to nested structure
  const mainMenu = flatMenuToNested(
    Array.isArray(menu.pages) ? menu.pages : [],
    null,
  );

  return <NavigationMenu menu={mainMenu} />;
};

export default MainMenu;
