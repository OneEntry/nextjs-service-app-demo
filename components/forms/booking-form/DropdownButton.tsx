'use client';

import type { FC } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectTabsState, setTabsState } from '@/app/store/reducers/CartSlice';
import ChevronDownIcon from '@/components/icons/chevron-down';

interface DropdownButtonProps {
  title: string;
  tabKey: string;
}

/**
 * DropdownButton Component
 * @param title - The title to display on the button.
 * @param tabKey - A unique key to identify the tab state.
 * @returns A button that toggles the active state of a tab.
 */
const DropdownButton: FC<DropdownButtonProps> = ({ title, tabKey }) => {
  const dispatch = useAppDispatch();
  const { isActive, disabled } = useAppSelector((state) =>
    selectTabsState(tabKey, state),
  );
  // Function to toggle the tab's active state
  const toggleTabState = () => {
    if (!disabled) {
      dispatch(setTabsState({ key: tabKey, value: !isActive }));
    }
  };

  return (
    <button
      className="mb-4 flex w-full items-center justify-center gap-2 text-nowrap rounded-[30px] border border-solid border-white bg-transparent px-16 py-2.5 text-center text-lg text-white transition-colors duration-300 hover:border-opacity-0 hover:bg-white hover:bg-opacity-30 focus-visible:text-[#fff8ff] focus-visible:outline-[#fff8ff] disabled:border-neutral-300 disabled:text-neutral-300"
      onClick={(e) => {
        e.preventDefault();
        toggleTabState();
      }}
    >
      <span>{title}</span>
      <ChevronDownIcon active={isActive} />
    </button>
  );
};

export default DropdownButton;
