'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FC, FormEvent } from 'react';
import React, { Suspense, useState } from 'react';
import { useDebounce } from 'use-debounce';

import SearchIcon from '@/components/icons/search';

import SearchResults from './SearchResults';

/**
 * SearchBar
 * @param dict dictionary from server api
 *
 * @returns JSX.Element
 */
const SearchBar: FC<{ placeholder: string }> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();

  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchValue = searchParams.get('search') || '';
  const [debouncedValue] = useDebounce(searchValue, 300);

  const handleSearch = (term: string) => {
    if (term) {
      params.set('search', term);
      setIsSearchActive(true);
    } else {
      params.delete('search');
      setIsSearchActive(false);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace(`/services?${params.toString()}`);
    setIsSearchActive(false);
  };

  return (
    <div className="relative text-neutral-600 max-2xl:hidden">
      <form className="flex w-full" onSubmit={handleSubmit}>
        <button
          type="submit"
          className="group relative m-auto box-border flex shrink-0 flex-col p-2.5"
        >
          <span className="sr-only">{placeholder}</span>
          <SearchIcon />
        </button>
        <input
          defaultValue={debouncedValue}
          onChange={(e) => handleSearch(e.target.value)}
          type="search"
          placeholder={placeholder}
          id="searchInput"
          name="quick-search"
          className="my-auto h-[25px] w-[210px] rounded-xl border border-solid border-gray-200 px-2.5 text-neutral-400 outline-none transition-colors duration-300 ease-in-out focus:border-none focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
          aria-label={placeholder}
        />
      </form>
      <Suspense fallback={'...'}>
        <SearchResults
          searchValue={debouncedValue}
          state={isSearchActive}
          setState={setIsSearchActive}
        />
      </Suspense>
    </div>
  );
};

export default SearchBar;
