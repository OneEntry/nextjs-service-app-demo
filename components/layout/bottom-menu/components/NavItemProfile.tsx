'use client';

import Link from 'next/link';
import type { IMenusPages } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';
import { useContext } from 'react';

import { AuthContext } from '@/app/store/providers/AuthContext';
import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import ProfileIcon from '@/components/icons/profile';

/**
 * Nav item profile link / SignInForm button
 * @param item
 * @param userMenu Represents a menu object.
 * @returns JSX.Element
 */
const NavItemProfile: FC<{ item: IMenusPages }> = ({ item }) => {
  const { open, setOpen, setComponent } = useContext(OpenDrawerContext);
  const { isAuth } = useContext(AuthContext);
  const title = item.localizeInfos?.menuTitle || item.localizeInfos?.title;

  return !isAuth ? (
    <button
      onClick={() => {
        setOpen(!open);
        setComponent('SignInForm');
      }}
      title={title}
      className="group relative box-border flex size-6 shrink-0"
    >
      <ProfileIcon />
    </button>
  ) : (
    <Link
      prefetch={false}
      href={'/profile'}
      title={title}
      className="group relative box-border flex size-6 shrink-0"
    >
      <ProfileIcon />
    </Link>
  );
};

export default NavItemProfile;
