'use client';

import Link from 'next/link';
import type {
  IMenusEntity,
  IMenusPages,
} from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';
import { useState } from 'react';

import ProfileIcon from '@/components/icons/profile';

import ProfileMenuAnimations from '../../animations/ProfileMenuAnimations';
import LogoutMenuItem from './LogoutMenuItem';
import UserMenuItem from './UserMenuItem';

interface UserProfileMenuProps {
  userMenu: IMenusEntity;
}

/**
 * User Profile menu component.
 *
 * @param props - The properties for the user profile menu.
 * @param props.userMenu - Represents a menu object.
 * @returns JSX.Element representing the user profile menu.
 */
const UserProfileMenu: FC<UserProfileMenuProps> = ({ userMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ensure pages are defined and of correct type
  const pages = (userMenu.pages || []) as IMenusPages[];

  return (
    <div className="relative flex">
      <Link
        href="/profile"
        onPointerEnter={() => setIsOpen(true)}
        className="group relative my-auto box-border flex size-6 shrink-0"
      >
        <ProfileIcon />
      </Link>
      <ProfileMenuAnimations
        state={isOpen}
        setState={setIsOpen}
        className="absolute right-0 top-8 h-0 w-48 overflow-hidden rounded-md bg-white px-4 text-slate-800 shadow-lg"
      >
        <ul className="my-4 text-gray-800">
          {pages.map((page, index) => (
            <li key={index}>
              <UserMenuItem page={page} setState={setIsOpen} />
            </li>
          ))}
          <li>
            <LogoutMenuItem />
          </li>
        </ul>
      </ProfileMenuAnimations>
    </div>
  );
};

export default UserProfileMenu;
