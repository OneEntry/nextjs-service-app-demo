import dayjs from 'dayjs';
import type { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookingCardDate: FC<{ date: any }> = ({ date }) => {
  const selectedDate = dayjs(date).format('YYYY-MM-DD');
  const selectedTime = dayjs(date).format('HH:mm');

  return (
    <div className="relative mb-2 box-border flex w-full shrink-0 flex-row justify-between self-stretch font-medium text-neutral-600">
      <time dateTime={selectedDate} className="text-base underline">
        {selectedDate}
      </time>
      <time
        dateTime={selectedTime}
        className="mb-1 text-base font-medium text-fuchsia-500"
      >
        {selectedTime}
      </time>
    </div>
  );
};

export default BookingCardDate;
