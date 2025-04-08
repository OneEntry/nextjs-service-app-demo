import { type FC, Suspense } from 'react';

import { ServerProvider } from '@/app/store/providers/ServerProvider';
import SearchIcon from '@/components/icons/search';
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
  const { search_placeholder } = dict;

  const Fallback = () => (
    <div className="relative text-neutral-600 max-2xl:hidden">
      <div className="flex w-full">
        <button
          type="submit"
          className="group relative m-auto box-border flex shrink-0 flex-col p-2.5"
        >
          <span className="sr-only">{search_placeholder?.value}</span>
          <SearchIcon />
        </button>
        <div
          id="searchInput"
          className="my-auto h-[25px] w-[210px] rounded-xl border border-solid border-gray-200 px-2.5 text-neutral-400 outline-none transition-colors duration-300 ease-in-out focus:border-none focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
        />
      </div>
    </div>
  );

  return (
    <div id="header">
      <header className="flex flex-col items-center bg-white bg-opacity-60 px-5 pb-6 pt-10 text-center backdrop-blur-lg max-lg:py-5 max-md:px-5 max-md:py-3 max-sm:py-1">
        <section className="flex w-full max-w-[1400px] flex-row items-center justify-between gap-5 max-md:flex max-md:max-w-full max-md:flex-row max-md:flex-wrap">
          <div
            className={
              'min-2xl:w-[30%] relative box-border flex w-1/5 shrink-0 flex-col'
            }
          >
            <Logo />
          </div>
          <div className="fade-in">
            <Suspense fallback={<Fallback />}>
              <SearchBar placeholder={search_placeholder?.value || 'Search'} />
            </Suspense>
          </div>
          <NavigationMenu menu={menu} />
          <NavGroup />
        </section>
      </header>
    </div>
  );
};

export default Header;
