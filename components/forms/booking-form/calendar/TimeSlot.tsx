import type { FC } from 'react';
import React, { type Dispatch } from 'react';

interface TimeSlotProps {
  slot: {
    time: string;
    isDisabled?: boolean;
  };
  currentTime: string;
  setTime: Dispatch<React.SetStateAction<string>>;
}

/**
 * Time slot button
 *
 * @param slot - time slot object
 * @param currentTime - currently selected time
 * @param setTime - function to update selected time
 *
 * @returns Time slot button
 */
const TimeSlot: FC<TimeSlotProps> = ({ slot, currentTime, setTime }) => {
  const { time, isDisabled } = slot;

  // Determine className based on current state
  const className = `justify-center items-center transition-colors duration-300 disabled:bg-[#a8a9b580] disabled:text-neutral-300 rounded-[30px] ${
    currentTime === time
      ? 'text-white bg-fuchsia-500 border-fuchsia-500hover:bg-fuchsia-600 focus-visible:outline-fuchsia-600'
      : isDisabled
        ? 'justify-center items-center border border-solid transition-colors duration-300 disabled:border-neutral-300 disabled:text-neutral-300 bg-transparent border-slate-300 text-slate-300 hover:border-slate-600 hover:text-slate-600 focus-visible:outline-slate-600 focus-visible:text-slate-600'
        : 'justify-center items-center border border-solid transition-colors duration-300 disabled:border-neutral-300 disabled:text-neutral-300 px-3.5 py-1 h-[35px] text-[15px] rounded-3xl font-bold tracking-wide text-fuchsia-500 border-fuchsia-500 hover:border-fuchsia-600 hover:text-fuchsia-600 focus-visible:outline-fuchsia-600 focus-visible:text-fuchsia-600 bg-transparent'
  }`;

  return (
    <button
      className={className}
      onClick={() => setTime(time)}
      disabled={isDisabled}
    >
      <time>{time}</time>
    </button>
  );
};

export default TimeSlot;
