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
 * @param slot - time slot object
 * @param currentTime - currently selected time
 * @param setTime - function to update selected time
 *
 * @returns Time slot button
 */
const TimeSlot: FC<TimeSlotProps> = ({ slot, currentTime, setTime }) => {
  const { time, isDisabled } = slot;

  // Determine className based on current state
  const className = `btn ${
    currentTime === time
      ? 'btn-primary'
      : isDisabled
        ? 'btn-o btn-o-xs btn-o-slate'
        : 'btn-o btn-o-xs btn-o-primary'
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
