import React, { FormEvent, ReactNode } from "react";
import { Availability, Calendar, CalendarDay, RelativeMonth } from "./entities";
import { Odontologist } from "@/app/models/odontologist";

export interface ICalendarViewBehavior {
  selectMonth: (event: FormEvent<HTMLSelectElement>) => void;
  selectDay: (event: FormEvent<HTMLButtonElement>) => void;
  selectOdontologist: (event: FormEvent<HTMLSelectElement>) => void;
}

export const CalendarView = (props: {
  odontologists: Odontologist[];
  odontologist: Odontologist | null;
  calendar: CalendarDay[];
  selectedItem: CalendarDay | null;
  selectedMonth: number;

  behavior: ICalendarViewBehavior;
}): ReactNode => {
  const currentMonth = new Date().getMonth();
  return (
    <div className="">
      <div>
        {props.odontologists.length > 0 ? (
          <div>
            {" "}
            <div className="flex items-center justify-between">
              <label>Odontologist</label>
              <select
                value={
                  props.odontologist !== null
                    ? props.odontologist.id
                    : 0
                }
                onChange={props.behavior.selectOdontologist}
                className="my-2 ml-2 w-32 rounded-md border-2 border-slate-300 px-2 py-3"
              >
                {props.odontologists.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {props.odontologist !== null ? (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p>
                      {props.selectedItem !== null ? (
                        <span>
                          Day:{" "}
                          <span className="font-bold">
                            {props.selectedItem.day}
                          </span>
                        </span>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                  <div>
                    <label>Month:</label>
                    <select
                      value={props.selectedMonth}
                      className="mb-2 ml-2 w-32 rounded-md border-2 border-slate-300 px-2 py-3"
                      onChange={props.behavior.selectMonth}
                    >
                      <option value={currentMonth}>
                        {Calendar.getMonth(currentMonth % 12)}
                      </option>
                      <option value={currentMonth + 1}>
                        {Calendar.getMonth((currentMonth + 1) % 12)}
                      </option>
                      <option value={currentMonth + 2}>
                        {Calendar.getMonth((currentMonth + 2) % 12)}
                      </option>
                      <option value={currentMonth + 3}>
                        {Calendar.getMonth((currentMonth + 3) % 12)}
                      </option>
                      <option value={currentMonth + 4}>
                        {Calendar.getMonth((currentMonth + 4) % 12)}
                      </option>
                      <option value={currentMonth + 5}>
                        {Calendar.getMonth((currentMonth + 5) % 12)}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="grid-rows-7 grid h-96 w-full grid-cols-7 gap-1">
                  <div className="flex items-end justify-center">
                    <p className="font-bold">Sun</p>
                  </div>
                  <div className="flex items-end justify-center">
                    <p className="font-bold">Mon</p>
                  </div>
                  <div className="flex items-end justify-center">
                    <p className="font-bold"> Tue</p>
                  </div>
                  <div className="flex items-end justify-center">
                    <p className="font-bold">Wed</p>
                  </div>
                  <div className="flex items-end justify-center">
                    <p className="font-bold">Thu</p>
                  </div>
                  <div className="flex items-end justify-center">
                    <p className="font-bold">Fri</p>
                  </div>
                  <div className="flex items-end justify-center">
                    <p className="font-bold">Sat</p>
                  </div>
                  {props.calendar.map((item, index) => {
                    if (item.relativeMonth === RelativeMonth.PREVIOUS) {
                      return (
                        <button
                          data-index={index}
                          key={index}
                          className="flex items-center justify-center"
                          onClick={props.behavior.selectDay}
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
                          onClick={props.behavior.selectDay}
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
                            onClick={props.behavior.selectDay}
                            className="flex items-center justify-center rounded-md bg-emerald-300 shadow-sm"
                          >
                            <p className="font-bold text-white">{item.day}</p>
                          </button>
                        );
                      }
                      return (
                        <button
                          data-index={index}
                          onClick={props.behavior.selectDay}
                          key={index}
                          className="flex items-center justify-center rounded-md bg-slate-300 shadow-sm"
                        >
                          <p className="font-bold text-white">{item.day}</p>
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
