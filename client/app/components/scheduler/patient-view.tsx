import React, { FormEvent } from "react";

export interface IBehavior {
  setPatient: (arg: FormEvent<HTMLInputElement>) => void;
  setDescription: (arg: FormEvent<HTMLInputElement>) => void;
  submitAppointment: () => void;
}

export const PatientView = (props: {
  behavior: IBehavior
}) => {
  return (
    <div className="">
      <div className="grid grid-cols-2 grid-rows-2 gap-y-[1.25rem]">
        <label>Patient name:</label>
        <input type="text" onChange={props.behavior.setPatient} className="rounded-md border-2 border-slate-300" />
        <label>Description</label>
        <input type="text" onChange={props.behavior.setDescription} className="rounded-md border-2 border-slate-300" />
        <div className="">
          <button onClick={props.behavior.submitAppointment} className="rounded-md bg-emerald-300 px-2 py-3 font-bold text-white">
            Add new appointment
          </button>
        </div>
      </div>
    </div>
  );
};
