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
  selectCartData,
  selectServiceId,
} from '@/app/store/reducers/CartSlice';
import CalendarAnimations from '@/components/forms/booking-form/animations/CalendarAnimations';

import DropdownAnimations from './animations/DropdownAnimations';
import type { TimeSlotData } from './calendar/TimeSlots';
import TimeSlots from './calendar/TimeSlots';
import DropdownButton from './DropdownButton';

dayjs.extend(utc);
dayjs.extend(dayOfYear);

interface CalendarLayoutProps {
  dict: IAttributeValues;
}

const filterIntervalsByDate = (
  intervals: [string, string][],
  targetDate: Date,
): [string, string][] => {
  const startOfDay = new Date(targetDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setUTCHours(23, 59, 59, 999);
  return intervals?.filter(([start, end]) => {
    const intervalStart = new Date(start).getTime();
    const intervalEnd = new Date(end).getTime();
    return (
      intervalStart <= endOfDay.getTime() && intervalEnd >= startOfDay.getTime()
    );
  });
};

/**
 * Calendar layout
 * @param dict
 * @returns
 */
const CalendarLayout: FC<CalendarLayoutProps> = ({ dict }) => {
  const tabKey = 'calendar';
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [dateTime, setDateTime] = useState<Date>();

  const { select_date_time_text } = dict;
  const serviceId = useAppSelector(selectServiceId);

  const servicesData = useAppSelector(selectCartData);
  const master = servicesData[serviceId].master || {};
  const schedule = master?.attributeValues?.master_schedule?.value[0].values;

  const holidays = schedule
    ?.flatMap((interval: any) => interval.external)
    .filter((h: any) => h && dayjs(h.date).dayOfYear());

  const timeIntervals = filterIntervalsByDate(
    schedule?.flatMap((interval: any) => interval.timeIntervals),
    date,
  )
    ?.map((interval: any) => {
      const d = dayjs(interval[0]).toDate();
      return `${d.getUTCHours()}:${d.getUTCMinutes() === 0 ? '00' : d.getUTCMinutes()}`;
    })
    ?.map((time: any) => {
      return {
        time: time,
        isDisabled: false,
        isSelected: false,
      };
    });

  // setDateTime
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

  // addServiceToCart
  useEffect(() => {
    if (dateTime) {
      dispatch(addServiceToCart({ id: serviceId, date: dateTime }));
    }
  }, [dispatch, serviceId, dateTime]);

  return (
    <DropdownAnimations
      id={tabKey}
      className="mb-4 flex w-full flex-col items-center"
      index={4}
      tabKey={tabKey}
    >
      <DropdownButton title={select_date_time_text?.value} tabKey={tabKey} />
      <section className="dropdown-container flex w-full flex-col whitespace-nowrap rounded-3xl bg-white px-8 text-xl text-neutral-700 max-sm:px-5">
        <CalendarAnimations
          className="mx-auto max-w-[350px] py-9 max-sm:max-w-[300px]"
          tabKey={tabKey}
        >
          <Calendar
            locale="en"
            view="month"
            onChange={(value) => setDate(value as Date)}
            value={date}
            tileDisabled={({ date }) =>
              holidays?.includes(dayjs(date).dayOfYear())
            }
          />
          {timeIntervals && (
            <TimeSlots
              timeSlots={timeIntervals as TimeSlotData[]}
              currentTime={time}
              setTime={setTime}
            />
          )}
        </CalendarAnimations>
      </section>
    </DropdownAnimations>
  );
};

export default CalendarLayout;
