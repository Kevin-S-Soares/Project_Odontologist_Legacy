import React, { FormEvent, ReactNode } from "react";
import { Schedule } from "@/app/models/schedule";
import { Interval, ScheduleOperation } from "./entities";

export interface IScheduleViewBehavior {
  setSelectedSchedule: (event: FormEvent<HTMLSelectElement>) => void;
  setDurationInMinutes: (event: FormEvent<HTMLInputElement>) => void;
  setRangePosition: (event: FormEvent<HTMLInputElement>) => void;
  setStartingValue: (event: FormEvent<HTMLInputElement>) => void;
  setEndingValue: (event: FormEvent<HTMLInputElement>) => void;
}

export const ScheduleView = (props: {

  startingValue: string;
  endingValue: string;
  durationInMinutes: number;
  rangePosition: number;
  schedules: Schedule[];
  selectedSchedule: Schedule;
  leftPointerPosition: number;
  rightPointerPosition: number;
  minSchedule: string;
  maxSchedule: string;
  intervals: Interval[];

  behavior: IScheduleViewBehavior;
}): ReactNode => {
  return (
    <div id="container" className="w-full">
      <div className=" mb-2 flex justify-between items-center">
        <label>Schedule: </label>
        <select
          value={
            props.selectedSchedule !== null ? props.selectedSchedule.id : 0
          }
          onChange={props.behavior.setSelectedSchedule}
          className="rounded-md border-2 border-slate-300 px-2 py-3 w-48"
        >
          {props.schedules.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {props.selectedSchedule !== null ? (
        <div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label>Start:</label>
              <input
                className="rounded-md border-2 border-slate-300 px-2 py-3 w-48"
                type="datetime-local"
                min={props.minSchedule}
                max={props.maxSchedule}
                value={props.startingValue}
                onChange={props.behavior.setStartingValue}
              />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <label>End:</label>
              <input
                className="rounded-md border-2 border-slate-300 px-2 py-3 w-48"
                type="datetime-local"
                min={props.minSchedule}
                max={props.maxSchedule}
                value={props.endingValue}
                onChange={props.behavior.setEndingValue}
              />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <label>Duration in minutes:</label>
              <input
                type="number"
                min={1}
                value={props.durationInMinutes}
                onChange={props.behavior.setDurationInMinutes}
                className="rounded-md border-2 border-slate-300 px-2 py-3 w-48"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="relative w-full" id="progress-block">
              <div className="flex justify-between"></div>
              <input
                type="range"
                value={props.rangePosition}
                className="w-full"
                onChange={props.behavior.setRangePosition}
                step={5}
              />

              <span
                id="left-pointer"
                className="absolute left-0 top-10 translate-x-0 transition-all"
                style={{
                  transform: `translateX(${props.leftPointerPosition}px)`,
                }}
              >
                &#9662;
              </span>
              <span
                id="right-pointer"
                className="absolute left-0 top-10 translate-x-0 transition-all"
                style={{
                  transform: `translateX(${props.rightPointerPosition}px)`,
                }}
              >
                &#9662;
              </span>
            </div>
            <div>
              {props.intervals.map((item, index) => {
                const map = new Map<ScheduleOperation, string>();
                map.set(ScheduleOperation.APPOINTMENT, "bg-slate-600");
                map.set(ScheduleOperation.BREAK_TIME, "bg-slate-500");
                map.set(ScheduleOperation.AVAILABLE, "bg-slate-400");

                return (
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
