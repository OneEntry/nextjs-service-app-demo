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
      className="btn-o btn-o-white mb-4"
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
