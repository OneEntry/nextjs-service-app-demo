'use client';

import Link from 'next/link';
import type { IMenusEntity } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';
import { useContext } from 'react';

import { AuthContext } from '@/app/store/providers/AuthContext';
import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import ProfileIcon from '@/components/icons/profile';

import UserProfileMenu from './user-menu/UserProfileMenu';

interface NavItemProfileProps {
  userMenu?: IMenusEntity;
}

/**
 * Nav item profile link / SignInForm button
 * @param userMenu Represents a menu object.
 *
 * @returns JSX.Element
 */
const NavItemProfile: FC<NavItemProfileProps> = ({ userMenu }) => {
  const { open, setOpen, setComponent } = useContext(OpenDrawerContext);
  const { isAuth } = useContext(AuthContext);

  const handleSignInClick = () => {
    setOpen(!open);
    setComponent('SignInForm');
  };

  if (!isAuth) {
    return (
      <button
        onClick={handleSignInClick}
        className="group relative my-auto box-border flex size-6 shrink-0"
        aria-label="Sign In"
      >
        <ProfileIcon />
      </button>
    );
  }

  if (userMenu) {
    return <UserProfileMenu userMenu={userMenu} />;
  }

  return (
    <Link
      prefetch={false}
      href="/profile"
      className="group relative my-auto box-border flex size-6 shrink-0"
      aria-label="Profile"
    >
      <ProfileIcon />
    </Link>
  );
};

export default NavItemProfile;
