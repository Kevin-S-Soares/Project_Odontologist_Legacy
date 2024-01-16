import React, { FormEvent, ReactNode } from "react";
import Link from "next/link";

import { AppointmentSchedules } from "@/app/models/composed";
import { Status } from "@/app/models/enums";
import { Response } from "@/app/models/response";

export class State {
  validFields = 0b1;
  invalidFieldMessage: string | null = null;
  fetchResponse: Response<AppointmentSchedules> = new Response();
  submittedResponse: Response<string> = new Response();
  constructor() {
    this.submittedResponse.isWaiting();
  }
}

export interface IBehavior {
  changeValue: (event: FormEvent<HTMLInputElement>) => void;
  selectItem: (event: FormEvent<HTMLSelectElement>) => void;
  submitForm: (event: FormEvent<HTMLInputElement>) => void;
}

export const View = (props: {
  state: State;
  behavior: IBehavior;
}): ReactNode => {
  return (
    <div>
      <div className="mb-2">
        <p className="text-sm">
          <span className="text-cyan-500 hover:underline">
            <Link href={"/appointment/index"}>Index</Link>
          </span>
          <span draggable={true}>&nbsp;&#8594; Edit</span>
        </p>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Edit Appointment</h1>
      </div>
      {props.state.fetchResponse.status === Status.LOADING ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.fetchResponse.status === Status.ERROR &&
      props.state.fetchResponse.errorMessage !== null ? (
        <div>
          <p className="text-red-500">
            {props.state.fetchResponse.errorMessage}
          </p>
        </div>
      ) : (
        <></>
      )}
      {props.state.fetchResponse.status === Status.SUCCESS &&
      props.state.fetchResponse.data !== null ? (
        <div>
          <div>
            <form autoComplete="off" className="w-3/12">
              <fieldset>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">Schedule</label>
                  <select
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    name="scheduleId"
                    onChange={props.behavior.selectItem}
                    value={
                      props.state.fetchResponse.data.appointment.scheduleId
                    }
                  >
                    {props.state.fetchResponse.data.schedules.map(
                      (item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">Start</label>
                  <input
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    type="datetime-local"
                    name="start"
                    value={props.state.fetchResponse.data.appointment.start}
                    onChange={props.behavior.changeValue}
                  />
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">End</label>
                  <input
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    type="datetime-local"
                    name="end"
                    value={props.state.fetchResponse.data.appointment.end}
                    onChange={props.behavior.changeValue}
                  />
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">Patient Name</label>
                  <input
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    type="text"
                    name="patientName"
                    value={
                      props.state.fetchResponse.data.appointment.patientName
                    }
                    onChange={props.behavior.changeValue}
                    pattern={String.raw`^[A-Z][a-z]*(\s[A-Z][a-z]*)+$`}
                    data-invalid-digit={0b0}
                    data-valid-digit={0b1}
                    data-error-message="Invalid name!"
                  />
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">Description</label>
                  <input
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    type="text"
                    name="description"
                    value={
                      props.state.fetchResponse.data.appointment.description
                    }
                    onChange={props.behavior.changeValue}
                  />
                </div>
                {props.state.validFields === 0b0 &&
                props.state.invalidFieldMessage !== null ? (
                  <div>
                    <p className="text-red-500">
                      {props.state.invalidFieldMessage}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {props.state.submittedResponse.status === Status.LOADING ? (
                  <div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <></>
                )}
                {props.state.submittedResponse.status === Status.WAITING ? (
                  <div className="mb-2 pt-2">
                    <input
                      className="rounded-md bg-emerald-500 px-3 py-2 align-middle font-semibold text-white transition-all hover:cursor-pointer hover:bg-emerald-600 hover:text-white disabled:bg-yellow-200"
                      type="submit"
                      value="Submit"
                      onClick={props.behavior.submitForm}
                      disabled={!(props.state.validFields === 0b1)}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {props.state.submittedResponse.status === Status.SUCCESS &&
                props.state.submittedResponse.data !== null ? (
                  <div>
                    <p>Appointment edited!</p>
                  </div>
                ) : (
                  <></>
                )}
                {props.state.submittedResponse.status === Status.ERROR &&
                props.state.submittedResponse.errorMessage !== null ? (
                  <div>
                    <p className="text-red-500">
                      {props.state.submittedResponse.errorMessage}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
