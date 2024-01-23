/*
import React, { FormEvent, ReactNode, useEffect, useState } from "react";

import { IScheduleViewBehavior, ScheduleView } from "./schedule-view";
import { Schedule } from "@/app/models/schedule";
import { BreakTime } from "@/app/models/break_time";
import { Appointment } from "@/app/models/appointment";
import { Time } from "@/app/utilities/time";
import { Interval, ScheduleOperation } from "./entities";

let width = 0;

export const ScheduleHandler = (props: {
  day: number;
  month: number;
  year: number;
  schedules: Schedule[];
  breakTimes: BreakTime[];
  appointments: Appointment[];

  setStart: (arg: string) => void;
  setEnd: (arg: string) => void;
  setScheduleId: (arg: number) => void;
}): ReactNode => {
  let interval = calculateIntervals({
    ...props,
    schedule: props.schedules[0],
  });
  let [min, max] = getScheduleMinMax(
    props.schedules[0],
    props.year,
    props.month + 1,
    props.day,
  );
  let auxStarting = Time.getTimefromString(min);
  let auxEnding = Time.getTimefromString(min).addMinutes(1);
  let [starting, ending] = getStartingAndEnding(
    auxStarting.toString(),
    auxEnding.toString(),
    props.year,
    props.month + 1,
    props.day,
  );

  const [selectedSchedule, setSelectedSchedule] = useState<Schedule>(
    props.schedules[0],
  );
  const [startingValue, setStartingValue] = useState(starting);
  const [endingValue, setEndingValue] = useState(ending);
  const [minSchedule, setMinSchedule] = useState(min);
  const [maxSchedule, setMaxSchedule] = useState(max);
  const [intervals, setIntervals] = useState(interval);
  const [durationInMinutes, setDurationInMinutes] = useState(1);
  const [rangePosition, setRangePosition] = useState(0);
  const [leftPointerPosition, setLeftPointer] = useState(0);
  const [rightPointerPosition, setRightPointer] = useState(0);

  const behavior: IScheduleViewBehavior = {
    setDurationInMinutes: (event: FormEvent<HTMLInputElement>) => {
      const value = parseInt(event.currentTarget.value);
      setDurationInMinutes(value);
      setRightPointer(getRatio(interval, value) * width);
      setRightPointer(
        width * rangePosition / 100 + getRatio(interval, durationInMinutes) * width,
      );
    },

    setRangePosition: (event: FormEvent<HTMLInputElement>): void => {
      const value = parseInt(event.currentTarget.value);
      setRangePosition(value);
      const ratio = value / 100;
      setLeftPointer(width * ratio);
      setRightPointer(
        width * ratio + getRatio(interval, durationInMinutes) * width,
      );

      const scheduleDuration = Time.getTimefromString(max).subtract(
        Time.getTimefromString(min),
      );

      const start = Time.getTimefromString(min).addMinutes(
        scheduleDuration.getTotalMinutes() * ratio,
      );
      const end = start.addMinutes(durationInMinutes);
      [starting, ending] = getStartingAndEnding(
        start.toString(),
        end.toString(),
        props.year,
        props.month + 1,
        props.day,
      );
      setStartingValue(starting);
      setEndingValue(ending);
    },

    setSelectedSchedule: (event: FormEvent<HTMLSelectElement>): void => {
      const value = parseInt(event.currentTarget.value);
      const aux = props.schedules.find((item) => item.id === value);
      if (aux !== undefined) {
        setSelectedSchedule(aux);
        props.setScheduleId(aux.id);
      }
    },

    setStartingValue: (event: FormEvent<HTMLInputElement>): void => {
      const value = event.currentTarget.value;
      setStartingValue(value);
      props.setStart(value);
    },
    setEndingValue: (event: FormEvent<HTMLInputElement>): void => {
      const value = event.currentTarget.value;
      setEndingValue(value);
      props.setEnd(value);
    }
  };

  useEffect(() => {
    const node = document.getElementById("container") as HTMLDivElement;
    width = node.getBoundingClientRect().width;
  }, []);

  useEffect(() => {

    interval = calculateIntervals({
      ...props,
      schedule: props.schedules[0],
    });
    [min, max] = getScheduleMinMax(
      props.schedules[0],
      props.year,
      props.month + 1,
      props.day,
    );

    auxStarting = Time.getTimefromString(min);
    auxEnding = Time.getTimefromString(min).addMinutes(1);
    [starting, ending] = getStartingAndEnding(
      auxStarting.toString(),
      auxEnding.toString(),
      props.year,
      props.month + 1,
      props.day,
    );
    setDurationInMinutes(1);
    setStartingValue(starting);
    setEndingValue(ending);
    setRangePosition(0);
    setLeftPointer(0);
    setRightPointer(0);
    setSelectedSchedule(props.schedules[0]);
    setMinSchedule(min);
    setMaxSchedule(max);
    props.setStart(starting);
    props.setEnd(ending);
    props.setScheduleId(props.schedules[0].id);
    setIntervals(interval);
  }, [props.day, props.year, props.month, props.appointments]);

  return (
    <ScheduleView
      startingValue={startingValue}
      endingValue={endingValue}
      behavior={behavior}
      durationInMinutes={durationInMinutes}
      rangePosition={rangePosition}
      schedules={props.schedules}
      selectedSchedule={selectedSchedule}
      leftPointerPosition={leftPointerPosition}
      rightPointerPosition={rightPointerPosition}
      minSchedule={minSchedule}
      maxSchedule={maxSchedule}
      intervals={intervals}
    />
  );
};

const calculateIntervals = (props: {
  day: number;
  month: number;
  year: number;
  schedule: Schedule;
  schedules: Schedule[];
  breakTimes: BreakTime[];
  appointments: Appointment[];
}): Interval[] => {
  const startTime =
    Time.getTimefromString(props.schedule.startTime).getTotalMinutes() *
    (props.schedule.startDay + 1);

  const endTime =
    Time.getTimefromString(props.schedule.endTime).getTotalMinutes() *
    (props.schedule.endDay + 1);

  const len = endTime - startTime;
  const proportion = width / len;
  const intervals = [];
  if (endTime > startTime) {
    //normal
    //const totalMinutes = endTime - startTime;
    const appointments = props.appointments.filter(
      (item) => item.scheduleId === props.schedule.id,
    );
    const breakTimes = props.breakTimes.filter(
      (item) => item.scheduleId === props.schedule.id,
    );

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
  }
  return intervals;
};

const getScheduleMinMax = (
  schedule: Schedule,
  year: number,
  month: number,
  day: number,
) => {
  const minSchedule = `${year}-${String(month).padStart(2, "0")}-${String(
    day,
  ).padStart(2, "0")}T${schedule.startTime}`;
  const maxSchedule = `${year}-${String(month).padStart(2, "0")}-${String(
    day,
  ).padStart(2, "0")}T${schedule.endTime}`;
  return [minSchedule, maxSchedule];
};

const getRatio = (intervals: Interval[], durationInMinutes: number) => {
  const schedule = intervals.find(
    (item) => item.operation === ScheduleOperation.AVAILABLE,
  );
  if (schedule !== undefined) {
    return durationInMinutes / schedule.length;
  }
  return 0;
};

const getStartingAndEnding = (
  starting: string,
  ending: string,
  year: number,
  month: number,
  day: number,
) => {
  const minSchedule = `${year}-${String(month).padStart(2, "0")}-${String(
    day,
  ).padStart(2, "0")}T${starting}`;
  const maxSchedule = `${year}-${String(month).padStart(2, "0")}-${String(
    day,
  ).padStart(2, "0")}T${ending}`;
  return [minSchedule, maxSchedule];
};
*/