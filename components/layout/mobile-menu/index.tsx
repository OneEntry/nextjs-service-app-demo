/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { IMenusEntity } from 'oneentry/dist/menus/menusInterfaces';
import type { FC } from 'react';
import { useContext, useEffect } from 'react';

import { OpenDrawerContext } from '@/app/store/providers/OpenDrawerContext';
import { flatMenuToNested } from '@/components/utils';

import ModalBackdrop from '../modal/components/ModalBackdrop';
import MobileMenuAnimations from './animations/MobileMenuAnimations';
import CloseModal from './components/CloseModal';
import MobileMenu from './components/MobileMenu';

/**
 * Mobile menu offscreen modal
 * @param menu Represents a menu - array of objects.
 *
 * @returns Mobile menu list item
 */
const OffscreenModal: FC<{
  menu: IMenusEntity;
}> = ({ menu }) => {
  const pathname = usePathname();
  const { open, setOpen, component } = useContext(OpenDrawerContext);

  const mainMenu = flatMenuToNested(
    Array.isArray(menu.pages) ? menu.pages : [],
    null,
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!open || component !== 'MobileMenu') {
    return;
  }

  return (
    <MobileMenuAnimations
      id="modalBody"
      className="z-450 fixed left-1/2 top-1/2 flex size-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-auto p-6 pt-12 shadow-xl md:overflow-hidden md:rounded-3xl lg:h-auto lg:w-[360px] lg:p-10"
    >
      <div className="fixed inset-0 z-50 flex size-full max-w-[420px] flex-col bg-white pb-6">
        <div className="p-6">
          <CloseModal />
          <div className="mb-4 w-full">
            <Image
              src={'/images/logo.svg'}
              width={140}
              height={40}
              alt={'OneEntry'}
              loading="lazy"
              className="aspect-[3.57] max-w-full shrink-0 max-sm:mb-5"
            />
          </div>
          <MobileMenu menu={mainMenu} />
        </div>
      </div>
      <ModalBackdrop />
    </MobileMenuAnimations>
  );
};

export default OffscreenModal;
