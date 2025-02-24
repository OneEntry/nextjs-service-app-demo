/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import '@/app/styles/calendar.css';

import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import utc from 'dayjs/plugin/utc';
import type { IAttributeValues } from 'oneentry/dist/base/utils';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import {
  addServiceToCart,
  selectServiceId,
  selectTabsState,
} from '@/app/store/reducers/CartSlice';
import CalendarAnimations from '@/components/forms/animations/CalendarAnimations';

import TimeSlots from './calendar/TimeSlots';
import DropdownButton from './DropdownButton';

dayjs.extend(utc);
dayjs.extend(dayOfYear);

interface CalendarLayoutProps {
  dict: IAttributeValues;
  formData: any;
}

const tabKey = 'calendar';

const CalendarLayout: FC<CalendarLayoutProps> = ({ dict, formData }) => {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>();

  const { select_date_time_text } = dict;
  const tabsState = useAppSelector((state) => selectTabsState(tabKey, state));
  const serviceId = useAppSelector(selectServiceId);

  const holidays = formData?.attributes[0].localizeInfos.intervals
    .flatMap((interval: any) => interval.external)
    .map((h: any) => dayjs(h.date).dayOfYear());

  const intervals = formData?.attributes[0].localizeInfos.intervals
    .filter(
      (interval: any) =>
        date.getMonth() + 1 === interval.fullMonth &&
        date.getFullYear() === interval.selectedYear,
    )
    .flatMap((interval: any) =>
      interval.intervals.flatMap((int: any) => {
        const count = int.end.hours - int.start.hours + 1;
        return Array.from({ length: count }, (_, i) => ({
          time: `${int.start.hours + i}:${int.start.minutes === 0 ? '00' : int.start.minutes}`,
          isDisabled: false,
          isSelected: false,
        }));
      }),
    );

  useEffect(() => {
    const [hh, mm] = time.split(':').map(Number);
    setDateTime(
      dayjs(date)
        .hour(hh || 0)
        .minute(mm || 0)
        .second(0)
        .toDate(),
    );
  }, [date, time]);

  useEffect(() => {
    if (dateTime) {
      dispatch(addServiceToCart({ id: serviceId, date: dateTime }));
    }
  }, [dispatch, serviceId, dateTime]);

  return (
    <div id={tabKey} className="mb-4 flex w-full flex-col items-center">
      <DropdownButton title={select_date_time_text?.value} tabKey={tabKey} />
      {tabsState.isActive && (
        <section className="flex w-full flex-col whitespace-nowrap rounded-3xl bg-white px-8 py-9 text-xl text-neutral-700 max-sm:px-5">
          <CalendarAnimations className="mx-auto max-w-[350px] max-sm:max-w-[300px]">
            <Calendar
              locale="en"
              view="month"
              onChange={(value) => setDate(value as Date)}
              value={date}
              tileDisabled={({ date }) =>
                holidays.includes(dayjs(date).dayOfYear())
              }
            />
            <TimeSlots
              timeSlots={intervals}
              currentTime={time}
              setTime={setTime}
            />
            {/* Uncomment and implement if needed
            <div className="mt-10 flex w-full">
              <button
                onClick={onApplyHandle}
                type="button"
                className="btn btn-primary btn-md mx-auto mt-auto w-[270px]"
              >
                {apply_text?.value}
              </button>
            </div>
            */}
          </CalendarAnimations>
        </section>
      )}
    </div>
  );
};

export default CalendarLayout;
