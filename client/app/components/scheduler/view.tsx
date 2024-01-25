/*
import React, { ReactNode } from "react";
import { CalendarHandler } from "./calendar-handler";
import { PatientHandler } from "./patient-handler";
import { Response } from "@/app/models/response";
import { Odontologist } from "@/app/models/odontologist";
import { Status } from "@/app/models/enums";
import { CalendarDay } from "./entities";

export interface IBehavior {
  selectDay: (arg: CalendarDay) => void;

  setPatient: (arg: string) => void;
  setDescription: (arg: string) => void;

  setStart: (arg: string) => void;
  setEnd: (arg: string) => void;
  setScheduleId: (arg: number) => void;
}

export const View = (props: {
  start: string;
  end: string;
  scheduleId: number;
  patient: string;
  description: string;
  selectedDay: CalendarDay | null;
  fetchResponse: Response<Odontologist[]>;
  behavior: IBehavior;
}): ReactNode => {
  return (
    <section>
      {props.fetchResponse.status === Status.LOADING ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <></>
      )}
      {props.fetchResponse.status === Status.ERROR &&
      props.fetchResponse.errorMessage !== null ? (
        <div>
          <p className="text-red-500">{props.fetchResponse.errorMessage}</p>
        </div>
      ) : (
        <></>
      )}
      {props.fetchResponse.status === Status.SUCCESS &&
      props.fetchResponse.data !== null ? (
        <div className="flex">
          <div className="w-1/3 p-2">
            <CalendarHandler
              odontologists={props.fetchResponse.data}
              selectDay={props.behavior.selectDay}
              setStart={props.behavior.setStart}
              setEnd={props.behavior.setEnd}
              setScheduleId={props.behavior.setScheduleId}
            />
          </div>
          <div className="w-1/3 p-2">
            {props.selectedDay !== null ? (
              <div>{props.selectedDay.details}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-1/3 p-2">
            <PatientHandler
              start={props.start}
              end={props.end}
              scheduleId={props.scheduleId}
              setPatient={props.behavior.setPatient}
              patient={props.patient}
              setDescription={props.behavior.setDescription}
              description={props.description}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};
*/
