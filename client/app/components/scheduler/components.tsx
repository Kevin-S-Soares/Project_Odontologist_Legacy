/*
import React, { FormEvent, useEffect, useState } from "react";

import { Schedule } from "@/app/models/schedule";
import { BreakTime } from "@/app/models/break_time";
import { Appointment } from "@/app/models/appointment";
import { Time } from "@/app/utilities/time";

export const PreviousMonthScheduleDay = (): JSX.Element => {
  return <div>Select previous month!</div>;
};

export const NextMonthScheduleDay = (): JSX.Element => {
  return <div>Select next month!</div>;
};

export const UnavailableScheduleDay = (): JSX.Element => {
  return (
    <div>
      <p>No available schedule!</p>
    </div>
  );
};

enum ScheduleOperation {
  BREAK_TIME,
  APPOINTMENT,
  AVAILABLE,
}

type Interval = {
  start: number;
  length: number;
  details: string;
  operation: ScheduleOperation;
};

class State {
  amplitude = 1;
  rangePosition = 0;
}

export const AvailableScheduleDay = (props: {
  schedules: Schedule[];
  breakTimes: BreakTime[];
  appointments: Appointment[];
}): JSX.Element => {
  const [state, setState] = useState(new State());
  const result: JSX.Element[] = [];
  let width = 0;
  useEffect(() => {
    const element = document.getElementById('progress-block') as HTMLDivElement;
    width = element.getBoundingClientRect().width;
  }, []);

  const schedule = props.schedules[0]; //normal
  const startTime =
    Time.getTimefromString(schedule.startTime).getTotalMinutes() *
    (schedule.startDay + 1);

  const endTime =
    Time.getTimefromString(schedule.endTime).getTotalMinutes() *
    (schedule.endDay + 1);

  const len = endTime - startTime;
  const proportion = width / len;

  if (endTime > startTime) {
    //normal
    //const totalMinutes = endTime - startTime;
    const appointments = props.appointments.filter(
      (item) => item.scheduleId === schedule.id,
    );
    const breakTimes = props.breakTimes.filter(
      (item) => item.scheduleId === schedule.id,
    );
    const intervals: Interval[] = [];
    intervals.push({
      operation: ScheduleOperation.AVAILABLE,
      start: 0,
      length: len * proportion,
      details: "Available",
    });

    appointments.forEach((item) => {
      const startPosition =
        Time.getTimefromDate(new Date(item.start)).getTotalMinutes() *
          (new Date(item.start).getDay() + 1) -
        len;
      const length =
        Time.getTimefromDate(new Date(item.end)).getTotalMinutes() *
          (new Date(item.end).getDay() + 1) -
        len -
        startPosition;

      intervals.push({
        start: Math.round(startPosition * proportion),
        length: Math.round(length * proportion),
        details: `${item.patientName}: ${item.description}`,
        operation: ScheduleOperation.APPOINTMENT,
      });
    });
    breakTimes.forEach((item) => {
      const startPosition =
        Time.getTimefromString(item.startTime).getTotalMinutes() *
          (item.startDay + 1) -
        len;
      const length =
        Time.getTimefromString(item.endTime).getTotalMinutes() *
          (item.endDay + 1) -
        len -
        startPosition;

      intervals.push({
        start: Math.round(startPosition * proportion),
        length: Math.round(length * proportion),
        details: `${item.name}`,
        operation: ScheduleOperation.BREAK_TIME,
      });
    });
    const map = new Map<ScheduleOperation, string>();
    map.set(ScheduleOperation.APPOINTMENT, "bg-slate-300");
    map.set(ScheduleOperation.BREAK_TIME, "bg-slate-400");
    map.set(ScheduleOperation.AVAILABLE, "bg-slate-500");
    intervals.forEach((item, index) => {
      result.push(
        <div key={index} className="relative w-full">
          <div
            className={`${map.get(
              item.operation,
            )} group absolute top-10 inline-block`}
            style={{ width: item.length, left: item.start }}
          >
            &nbsp;
            <div className="relative block w-full">
              <div className="absolute left-1/2 top-10 hidden h-auto -translate-x-1/2 p-2 shadow-md group-hover:inline-block">
                {item.details}
              </div>
            </div>
          </div>
        </div>,
      );
    });
  }

  return (
    <div className="w-full">
      {props.schedules.length > 0 ? (
        <div className="flex">
          <div>
            <label>start</label>
            <input type="datetime-local" />
            <label>end</label>
            <input type="datetime-local" />
          </div>
          <div className="w-full">
            <div className="relative w-full" id="progress-block">
              <div className="flex justify-end">
                <label>Duration:</label>
                <input
                  type="number"
                  min={1}
                  value={state.amplitude}
                  onChange={(event: FormEvent<HTMLInputElement>) => {
                    const value = parseInt(event.currentTarget.value);
                    setState({ ...state, amplitude: value });
                  }}
                  className="ml-2 w-10 rounded-md border-2 border-slate-200 text-center"
                />
              </div>
              <input
                type="range"
                value={state.rangePosition}
                className="w-full"
                onChange={(event: FormEvent<HTMLInputElement>): void => {
                  const value = parseInt(event.currentTarget.value);
                  setState({ ...state, rangePosition: value });
                }}
              />

              <span
                id="left-pointer"
                className="absolute left-0 top-10 translate-x-0 transition-all"
                style={{
                  transform: `translateX(${
                    (480 * state.rangePosition) / 100.0 // - state.amplitude * proportion
                  }px)`,
                }}
              >
                &#9662;
              </span>
              <span
                id="right-pointer"
                className="absolute left-0 top-10 translate-x-0 transition-all"
                style={{
                  transform: `translateX(${
                    (480 * state.rangePosition) / 100 +
                    state.amplitude * proportion
                  }px)`,
                }}
              >
                &#9662;
              </span>
            </div>
            <div>
              {result}
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
*/
