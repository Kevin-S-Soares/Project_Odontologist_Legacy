import React, { FormEvent, ReactNode } from "react";
import Link from "next/link";

import { ScheduleOdontologists } from "@/app/models/composed";
import { Status } from "@/app/models/enums";
import { Response } from "@/app/models/response";

export class State {
  fetchResponse: Response<ScheduleOdontologists> = new Response();
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
            <Link href={"/schedule/index"}>Index</Link>
          </span>
          <span draggable={true}>&nbsp;&#8594; Edit</span>
        </p>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Edit schedule</h1>
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
                  <label className="font-semibold">Odontologist</label>
                  <select
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    name="odontologistId"
                    onChange={props.behavior.selectItem}
                    value={
                      props.state.fetchResponse.data.schedule.odontologistId
                    }
                  >
                    {props.state.fetchResponse.data.odontologists.map(
                      (item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">Name</label>
                  <input
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    type="text"
                    name="name"
                    placeholder="Type a name here."
                    value={props.state.fetchResponse.data.schedule.name}
                    onChange={props.behavior.changeValue}
                  />
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">Start Time</label>
                  <input
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    type="time"
                    name="startTime"
                    step={1}
                    onChange={props.behavior.changeValue}
                    value={props.state.fetchResponse.data.schedule.startTime}
                  />
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">Start Day</label>
                  <select
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    value={props.state.fetchResponse.data.schedule.startDay}
                    name="startDay"
                    onChange={props.behavior.selectItem}
                  >
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                    <option value={2}>Tuesday</option>
                    <option value={3}>Wednesday</option>
                    <option value={4}>Thursday</option>
                    <option value={5}>Friday</option>
                    <option value={6}>Saturday</option>
                  </select>
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">End Time</label>
                  <input
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    value={props.state.fetchResponse.data.schedule.endTime}
                    type="time"
                    name="endTime"
                    step={1}
                    onChange={props.behavior.changeValue}
                  />
                </div>
                <div className="my-2 flex flex-col">
                  <label className="font-semibold">End Day</label>
                  <select
                    className="rounded-md border-2 border-slate-300 px-2 py-1"
                    value={props.state.fetchResponse.data.schedule.endDay}
                    name="endDay"
                    onChange={props.behavior.selectItem}
                  >
                    <option value={0}>Sunday</option>
                    <option value={1}>Monday</option>
                    <option value={2}>Tuesday</option>
                    <option value={3}>Wednesday</option>
                    <option value={4}>Thursday</option>
                    <option value={5}>Friday</option>
                    <option value={6}>Saturday</option>
                  </select>
                </div>
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
                      className="rounded-md bg-emerald-500 px-3 py-2 align-middle font-semibold text-white transition-all hover:cursor-pointer hover:bg-emerald-600 hover:text-white "
                      type="submit"
                      value="Submit"
                      onClick={props.behavior.submitForm}
                    />
                  </div>
                ) : (
                  <></>
                )}
                {props.state.submittedResponse.status === Status.SUCCESS &&
                props.state.submittedResponse.data !== null ? (
                  <div>
                    <p>Schedule edited!</p>
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
