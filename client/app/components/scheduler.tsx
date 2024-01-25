/*
"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Schedule } from "../models/schedule";
import { BreakTime } from "../models/break_time";
import { Appointment } from "../models/appointment";

enum Availability {
  NOT_AVAILABLE,
  AVAILABLE,
}

enum RelativeMonth {
  ACTUAL,
  PREVIOUS,
  NEXT,
}

class CalendarDay {
  day = 0;
  availability: Availability = Availability.NOT_AVAILABLE;
  relativeMonth: RelativeMonth = RelativeMonth.ACTUAL;
  details: JSX.Element = (<></>);
}

class Calendar {
  static getFirstDayOfWeekOfTheMonth(month: number, year: number): number {
    return new Date(year, month, 1).getDay();
  }
  static getLastDayOfTheMonth(month: number, year: number): number {
    if (month < 0) {
      month = 11;
      year--;
    }
    let result = 0;
    switch (month) {
      case 0:
        result = 31;
        break;
      case 1:
        result = year % 4 === 0 && year % 100 !== 0 ? 29 : 28;
        break;
      case 2:
        result = 31;
        break;
      case 3:
        result = 30;
        break;
      case 4:
        result = 31;
        break;
      case 5:
        result = 30;
        break;
      case 6:
        result = 31;
        break;
      case 7:
        result = 31;
        break;
      case 8:
        result = 30;
        break;
      case 9:
        result = 31;
        break;
      case 10:
        result = 30;
        break;
      case 11:
        result = 31;
        break;
    }
    return result;
  }
}

const UnavailableScheduleDay = (): JSX.Element => {
  return (
    <div>
      <p>No available schedule!</p>
    </div>
  );
};

const PreviousMonthScheduleDay = (): JSX.Element => {
  return <div>Select previous month!</div>;
};

const NextMonthScheduleDay = (): JSX.Element => {
  return <div>Select next month!</div>;
};

const AvailableScheduleDay = (props: {
  schedules: Schedule[];
  breakTimes: BreakTime[];
  appointments: Appointment[];
}): JSX.Element => {
  const [state, setState] = useState(0);

  return (
    <div>
      <div className="h-full">
        <div className="relative w-96">
          <input
            type="range"
            className="w-96"
            value={state}
            onChange={(event: FormEvent<HTMLInputElement>): void => {
              const pointerLeft = document.getElementById(
                "pointer-left",
              ) as HTMLSpanElement;
              const pointerRight = document.getElementById(
                "pointer-right",
              ) as HTMLSpanElement;
              const value = parseInt(event.currentTarget.value);
              pointerLeft.style.transform = `translateX(${
                (480 * value) / 100 - 20
              }px)`;
              pointerRight.style.transform = `translateX(${
                (480 * value) / 100 + 20
              }px)`;
              setState(value);
            }}
          />
          <span
            id="pointer-left"
            className="absolute top-10 translate-x-0 left-0 transition-all"
          >
            &#9662;
          </span>
          <span
            id="pointer-right"
            className="absolute top-10 left-0 translate-x-0 transition-all"
          >
            &#9662;
          </span>
        </div>
      </div>
    </div>
  );
};

class State {
  inputValue = 0;
  month = new Date().getMonth();
  year = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];
  selectedItem: CalendarDay | null = null;
}

export const Scheduler = () => {
  const [state, setState] = useState(new State());

  useEffect(() => {
    // #1. Creating a calendar based on odontologist schedule
    // fetch schedules and break times from given odontologist
    // Loop through the schedules and add its starting day of the week and ending day of the week to the set
    // Loop through the month and verify if given day of the week is present in the set.
    // If it is present, build an object based on break times and appointments(fetch) within the schedule

    // #2. Creating a calendar
    // Get the day 1 of given month and place it somewhere in the first line
    // Get the last day of given month and place it somewhere in the last line
    // Add some days before the first day if possible
    // See item 1.
    // Add some days after the last day if possible
    // for(aux = position(last day of the previous month), index = position(first day of the month) - 1; index > -1; index--, aux--)
    // for(aux = position(first day of the next month), index = position(last day of the month) + 1; index < 35; index++, aux ++)

    const month = state.month;
    const year = state.year;
    const positionFirstDay = Calendar.getFirstDayOfWeekOfTheMonth(month, year);
    const lastDay = Calendar.getLastDayOfTheMonth(month, year);
    const positionLastDay = lastDay + positionFirstDay - 1;
    const calendar: CalendarDay[] = Array(42);
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
    {
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
    }

    // fetch schedules and add to the set;
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
            <AvailableScheduleDay
              schedules={[]}
              appointments={[]}
              breakTimes={[]}
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

    const positionToday = new Date().getDate() + positionFirstDay - 1;
    setState({
      ...state,
      calendarDays: calendar,
      selectedItem: calendar[positionToday],
    });
  }, [state.month, state.year]);

  const currentMonth = new Date().getMonth();
  const months = [
    currentMonth,
    currentMonth + 1,
    currentMonth + 2,
    currentMonth + 3,
    currentMonth + 4,
    currentMonth + 5,
  ];

  const changeDay = (arg: FormEvent<HTMLButtonElement>): void => {
    const value = parseInt(arg.currentTarget.getAttribute("data-index") ?? "0");
    setState({
      ...state,
      selectedItem: state.calendarDays[value],
    });
  };

  return (
    <section className="w-1/3">
      <div className="flex items-center justify-between">
        <div>
          <p>
            {state.selectedItem !== null
              ? `Day: ${state.selectedItem.day}`
              : ""}
          </p>based on state css
        </div>
        <div>
          <label>Month:</label>
          <select
            className="my-2 ml-2 rounded-md border-2 border-slate-300 px-2 py-3"
            onChange={(e: FormEvent<HTMLSelectElement>) => {
              setState({
                ...state,
                month: parseInt(e.currentTarget.value) % 12,
                year:
                  parseInt(e.currentTarget.value) > 11
                    ? new Date().getFullYear() + 1
                    : new Date().getFullYear(),
              });
            }}
          >
            {months.map((item, index) => (
              <option key={index} value={item}>
                {getMonth(item % 12)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid h-96 w-full grid-cols-7 grid-rows-6 gap-1">
        {state.calendarDays.map((item, index) => {
          if (item.relativeMonth === RelativeMonth.PREVIOUS) {
            return (
              <button
                data-index={index}
                key={index}
                className="flex items-center justify-center"
                onClick={changeDay}
              >
                <div
                  key={index}
                  className="flex h-1/2 w-1/2 items-center justify-center rounded-md bg-slate-300 font-bold shadow-sm"
                >
                  <p className="font-bold text-white">{item.day}</p>
                </div>
              </button>
            );
          }
          if (item.relativeMonth === RelativeMonth.NEXT) {
            return (
              <button
                data-index={index}
                key={index}
                className="flex items-center justify-center"
                onClick={changeDay}
              >
                <div className="flex h-1/2 w-1/2 items-center justify-center rounded-md bg-slate-300 shadow-sm">
                  <p className="font-bold text-white">{item.day}</p>
                </div>
              </button>
            );
          }
          if (item.relativeMonth === RelativeMonth.ACTUAL) {
            if (item.availability === Availability.AVAILABLE) {
              return (
                <button
                  data-index={index}
                  key={index}
                  onClick={changeDay}
                  className="flex items-center justify-center rounded-md bg-emerald-300 shadow-sm"
                >
                  <p className="font-bold text-white">{item.day}</p>
                </button>
              );
            }
            return (
              <button
                data-index={index}
                onClick={changeDay}
                key={index}
                className="flex items-center justify-center rounded-md bg-slate-300 shadow-sm"
              >
                <p className="font-bold text-white">{item.day}</p>
              </button>
            );
          }
        })}
      </div>
      {state.selectedItem !== null ? state.selectedItem.details : <></>}
    </section>
  );
};

const getMonth = (arg: number): string => {
  let result = "";
  switch (arg) {
    case 0:
      result = "January";
      break;
    case 1:
      result = "February";
      break;
    case 2:
      result = "March";
      break;
    case 3:
      result = "April";
      break;
    case 4:
      result = "May";
      break;
    case 5:
      result = "June";
      break;
    case 6:
      result = "July";
      break;
    case 7:
      result = "August";
      break;
    case 8:
      result = "September";
      break;
    case 9:
      result = "October";
      break;
    case 10:
      result = "November";
      break;
    case 11:
      result = "December";
      break;
  }
  return result;
};
*/
