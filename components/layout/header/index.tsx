/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { type FC, Suspense } from 'react';

import { ServerProvider } from '@/app/store/providers/ServerProvider';
import NavigationMenu from '@/components/layout/header/main-menu';

import Logo from './Logo';
import NavGroup from './nav/NavGroup';
import SearchBar from './search/SearchBar';

/**
 * Header section
 * @returns React component
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header: FC<{ menu: any }> = async ({ menu }) => {
  // Retrieve props from server provider
  const [dict] = ServerProvider('dict');

  return (
    <div id="header">
      <header className="flex flex-col items-center bg-white bg-opacity-60 px-5 pb-6 pt-10 text-center backdrop-blur-lg max-lg:py-5 max-md:px-5 max-md:py-3 max-sm:py-1">
        <section className="flex w-full max-w-[1400px] flex-row items-center justify-between gap-5 max-md:flex max-md:max-w-full max-md:flex-row max-md:flex-wrap">
          <Logo />
          <Suspense fallback={null}>
            <SearchBar dict={dict} />
          </Suspense>
          <NavigationMenu menu={menu} />
          <NavGroup dict={dict} />
        </section>
      </header>
    </div>
  );
};

export default Header;
