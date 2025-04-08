import type { Dispatch, FC, SetStateAction } from 'react';

import TimeSlot from './TimeSlot';

export interface TimeSlotData {
  time: string;
  isSelected?: boolean;
  isDisabled?: boolean;
}

interface TimeSlotsProps {
  timeSlots: TimeSlotData[];
  currentTime: string;
  setTime: Dispatch<SetStateAction<string>>;
}

/**
 * Time slots grid
 * @param timeSlots - array of time slot objects
 * @param currentTime - currently selected time
 * @param setTime - function to update selected time
 *
 * @returns Time slots grid
 */
const TimeSlots: FC<TimeSlotsProps> = ({ timeSlots, currentTime, setTime }) => {
  return (
    <div className="flex w-full flex-col gap-4 whitespace-nowrap text-base font-bold tracking-wide">
      <div className="grid grid-cols-4 flex-wrap justify-around gap-x-1 gap-y-3">
        {timeSlots?.map((slot) => (
          <TimeSlot
            key={slot.time}
            slot={slot}
            currentTime={currentTime}
            setTime={setTime}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
