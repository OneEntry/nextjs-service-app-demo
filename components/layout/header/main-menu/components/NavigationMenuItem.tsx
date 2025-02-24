'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

interface NavigationItemProps {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

/**
 * Main navigation menu item component.
 *
 * @param props - The properties for the navigation menu item.
 * @param props.label - The label for the menu item.
 * @param props.href - The URL for the menu item.
 * @param props.hasDropdown - Boolean indicating if the item has a dropdown.
 * @returns JSX.Element representing the main navigation menu item.
 */
const NavigationMenuItem: FC<NavigationItemProps> = ({
  label,
  href,
  hasDropdown = false,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      prefetch={true}
      href={href === 'home' ? '/' : href}
      className="flex items-center justify-center gap-2 uppercase transition-colors duration-300 ease-in-out hover:text-fuchsia-500 focus:text-fuchsia-500 focus:outline-none"
    >
      <div
        className={clsx(
          isActive &&
            'fill-fuchsia-500 text-fuchsia-500 transition-colors duration-300',
        )}
      >
        {label}
      </div>
      {hasDropdown && (
        <svg
          width="27"
          height="15"
          viewBox="0 0 27 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            'size-[14px]',
            isActive ? 'fill-fuchsia-500 text-fuchsia-500' : 'fill-current',
            'transition-colors',
          )}
        >
          <path d="M12.8531 12.75L11.8278 13.8449L12.8531 14.805L13.8784 13.8449L12.8531 12.75ZM25.625 2.84488C26.2296 2.27863 26.2608 1.32939 25.6945 0.724704C25.1283 0.120017 24.1791 0.0888621 23.5744 0.655118L25.625 2.84488ZM0.0812407 2.84488L11.8278 13.8449L13.8784 11.6551L2.13183 0.655118L0.0812407 2.84488ZM13.8784 13.8449L25.625 2.84488L23.5744 0.655118L11.8278 11.6551L13.8784 13.8449Z" />
        </svg>
      )}
    </Link>
  );
};

export default NavigationMenuItem;
