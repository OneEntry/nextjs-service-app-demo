'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, useMemo } from 'react';

const DropdownIcon = dynamic(() => import('./DropdownIcon'), {
  ssr: false,
});

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
  const isActive = useMemo(() => pathname === href, [pathname, href]);

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
      {hasDropdown && <DropdownIcon isActive={isActive} />}
    </Link>
  );
};

export default NavigationMenuItem;
