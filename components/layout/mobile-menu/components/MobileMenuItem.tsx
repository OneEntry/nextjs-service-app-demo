'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import { useContext, useState } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';

import MobileMenu from './MobileMenu';

/**
 * Mobile menu list item
 * @param item Represents a menu item objects.
 *
 * @returns Mobile menu list item
 */
function MobileMenuItem({
  item,
  parentUrl,
}: {
  item: IMenusPages;
  parentUrl?: string;
}) {
  const { setOpen } = useContext(OpenDrawerContext);
  // check if item has child
  const hasChild = Array.isArray(item.children) && item.children.length > 0;
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const url =
    item.pageUrl === 'home'
      ? '/'
      : `${parentUrl ? `${parentUrl}/` : '/'}${item.pageUrl || ''}`;

  return (
    <li
      key={item.localizeInfos.menuTitle}
      className={
        'flex w-full flex-col py-2 text-lg text-slate-700 transition-colors hover:text-fuchsia-500'
      }
    >
      <div className={'flex ' + (hasChild && '')}>
        <Link
          className="w-full"
          href={url}
          prefetch={true}
          onClick={() => {
            setOpen(false);
          }}
        >
          {item.localizeInfos.menuTitle}
        </Link>
        {hasChild && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenSubmenu(!openSubmenu);
            }}
            className={
              'ml-auto transition-transform ' +
              (!openSubmenu ? '-rotate-90' : '')
            }
          >
            <svg
              width="27"
              height="15"
              viewBox="0 0 27 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-[18px] fill-current"
            >
              <path d="M12.8531 12.75L11.8278 13.8449L12.8531 14.805L13.8784 13.8449L12.8531 12.75ZM25.625 2.84488C26.2296 2.27863 26.2608 1.32939 25.6945 0.724704C25.1283 0.120017 24.1791 0.0888621 23.5744 0.655118L25.625 2.84488ZM0.0812407 2.84488L11.8278 13.8449L13.8784 11.6551L2.13183 0.655118L0.0812407 2.84488ZM13.8784 13.8449L25.625 2.84488L23.5744 0.655118L11.8278 11.6551L13.8784 13.8449Z"></path>
            </svg>
          </button>
        )}
      </div>
      {Array.isArray(item.children) && hasChild && (
        <MobileMenu
          menu={item.children}
          parentUrl={url}
          className={'px-2 ' + (!openSubmenu ? 'hidden' : 'visible')}
        />
      )}
    </li>
  );
}

export default MobileMenuItem;
