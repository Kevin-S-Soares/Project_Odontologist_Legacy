/*
import React, { FormEvent, useEffect, useState } from "react";

import {
  CalendarView,
  ICalendarViewBehavior,
} from "./calendar-view";
import { Availability, Calendar, CalendarDay, RelativeMonth } from "./entities";
import {
  NextMonthScheduleDay,
  PreviousMonthScheduleDay,
  UnavailableScheduleDay,
} from "./components";
import { Schedule } from "@/app/models/schedule";
import { BreakTime } from "@/app/models/break_time";
import { Appointment } from "@/app/models/appointment";
import { Odontologist } from "@/app/models/odontologist";
import { ScheduleHandler } from "./schedule-handler";

export const CalendarHandler = (props: {
  odontologists: Odontologist[];
  selectDay: (arg: CalendarDay) => void;
  setStart: (arg: string) => void;
  setEnd: (arg: string) => void;
  setScheduleId: (arg: number) => void;
}) => {
  const [odontologist, setOdontologist] = useState(props.odontologists.length > 0? props.odontologists[0]: null);
  const [calendar, setCalendar] = useState(new Array(42).fill(new CalendarDay()));
  const [selectedItem, setSelectedItem] = useState<CalendarDay | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(0);

  useEffect(() => {
    const today = new Date();
    const aux = calculateCalendar(today.getMonth(), today.getFullYear(), props.setStart, props.setEnd, props.setScheduleId);
    const todayPosition = today.getDate() + Calendar.getFirstDayOfWeekOfTheMonth(today.getMonth(), today.getFullYear()) -1;
    setCalendar(aux);
    setSelectedItem(aux[todayPosition]);
    props.selectDay(aux[todayPosition]);
  }, []);

  const behavior: ICalendarViewBehavior = {
    selectMonth: (event: FormEvent<HTMLSelectElement>): void => {
      const value = parseInt(event.currentTarget.value);
      const currentYear = new Date().getFullYear();
      const year = value > 11 ? currentYear + 1 : currentYear;
      const aux = calculateCalendar(value % 12, year, props.setStart, props.setEnd, props.setScheduleId);
      setSelectedMonth(value);
      setCalendar(aux);
      setSelectedItem(aux[new Date(year, value % 12, 1).getDay()]);
      props.selectDay(aux[new Date(year, value % 12, 1).getDay()]);
    },
    selectDay: (event: FormEvent<HTMLButtonElement>): void => {
      const value = parseInt(
        event.currentTarget.getAttribute("data-index") ?? "0",
      );
      setSelectedItem(calendar[value]);
      props.selectDay(calendar[value]);
    },

    selectOdontologist: (event: FormEvent<HTMLSelectElement>): void => {
      const value = parseInt(event.currentTarget.value);
      const aux =
        props.odontologists.find((item) => item.id === value) ?? null;
      setOdontologist(aux);
    },
  };

  return <CalendarView selectedMonth={selectedMonth} selectedItem={selectedItem} calendar={calendar} odontologist={odontologist} odontologists={props.odontologists} behavior={behavior} />;
};

const calculateCalendar = (month: number, year: number, setStart: (arg: string) => void, setEnd: (arg: string) => void, setScheduleId: (arg: number) => void) => {
  const positionFirstDay = Calendar.getFirstDayOfWeekOfTheMonth(month, year);
  const lastDay = Calendar.getLastDayOfTheMonth(month, year);
  const positionLastDay = lastDay + positionFirstDay - 1;
  const calendar = Array(42).fill(new CalendarDay());
  for (
    let [aux, index] = [
      Calendar.getLastDayOfTheMonth(month - 1, year),
      positionFirstDay - 1,
    ];
    index > -1;
    index--, aux--
  ) {
    calendar[index] = {
      day: aux,
      availability: Availability.NOT_AVAILABLE,
      relativeMonth: RelativeMonth.PREVIOUS,
      details: <PreviousMonthScheduleDay />,
    };
  }
  const set = new Set<number>();

  const schedules: Schedule[] = [
    {
      id: 1,
      odontologistId: 1,
      name: "Monday",
      startDay: 1,
      endDay: 1,
      startTime: "09:00:00",
      endTime: "18:00:00",
    },
    {
      id: 2,
      odontologistId: 1,
      name: "Tuesday",
      startDay: 2,
      endDay: 2,
      startTime: "09:00:00",
      endTime: "18:00:00",
    },
  ];
  schedules.forEach((item) => {
    set.add(item.startDay);
    set.add(item.endDay);
  });

  const breakTimes: BreakTime[] = [
    {
      id: 1,
      name: "Lunch",
      scheduleId: 1,
      startDay: 1,
      startTime: "12:00:00",
      endDay: 1,
      endTime: "13:00:00",
    },
    {
      id: 2,
      name: "Lunch",
      scheduleId: 2,
      startDay: 2,
      startTime: "12:00:00",
      endDay: 2,
      endTime: "13:00:00",
    },
  ];

  const appointments: Appointment[] = [
    {
      id: 1,
      scheduleId: 1,
      patientName: "Testing",
      description: "Function",
      start: "11-20-2023 09:45:00",
      end: "11-20-2023 10:00:00",
    },
  ];

  for (
    let [aux, index] = [1, positionFirstDay];
    index <= positionLastDay;
    index++, aux++
  ) {
    if (set.has(new Date(year, month, aux).getDay())) {
      calendar[index] = {
        day: aux,
        availability: Availability.AVAILABLE,
        relativeMonth: RelativeMonth.ACTUAL,
        details: (
          <ScheduleHandler
            day={aux}
            month={month}
            year={year}
            schedules={schedules.filter(
              (item) => item.startDay == new Date(year, month, aux).getDay(),
            )}
            appointments={appointments.filter(
              (item) =>
                new Date(item.start).getDate() ===
                new Date(year, month, aux).getDate(),
            )}
            breakTimes={breakTimes.filter(
              (item) => item.startDay == new Date(year, month, aux).getDay(),
            )}
            setStart={setStart}
            setEnd={setEnd}
            setScheduleId={setScheduleId}
          />
        ),
      };
    } else {
      calendar[index] = {
        day: aux,
        availability: Availability.NOT_AVAILABLE,
        relativeMonth: RelativeMonth.ACTUAL,
        details: <UnavailableScheduleDay />,
      };
    }
  }
  for (
    let [aux, index] = [1, positionLastDay + 1];
    index < 42;
    index++, aux++
  ) {
    calendar[index] = {
      day: aux,
      availability: Availability.NOT_AVAILABLE,
      relativeMonth: RelativeMonth.NEXT,
      details: <NextMonthScheduleDay />,
    };
  }

  return calendar;
};
*/