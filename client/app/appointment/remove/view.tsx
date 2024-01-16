import React, { FormEvent, ReactNode } from "react";
import Link from "next/link";

import { Appointment } from "@/app/models/appointment";
import { Response } from "@/app/models/response";
import { Status } from "@/app/models/enums";

export class State {
  fetchResponse: Response<Appointment> = new Response();
  submittedResponse: Response<string> = new Response();
  constructor() {
    this.submittedResponse.status = Status.WAITING;
  }
}

export interface IBehavior {
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
          <span draggable={true}>&nbsp;&#8594; Remove</span>
        </p>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Remove Appointment</h1>
      </div>
      {props.state.submittedResponse.status === Status.SUCCESS ? (
        <div>
          <p>Appointment removed!</p>
          <p>Returning to index...</p>
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
      {props.state.submittedResponse.status === Status.WAITING ||
      props.state.submittedResponse.status === Status.LOADING ? (
        <div>
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
              <form>
                <dl className="flex justify-start">
                  <div className="mr-2 flex flex-col pr-3">
                    <dt className="h-12 font-bold lg:h-fit">Start</dt>
                    <dt className="h-12 font-bold lg:h-fit">End</dt>
                    <dt className="h-12 font-bold lg:h-fit">Patient Name</dt>
                    <dt className="h-12 font-bold lg:h-fit">Description</dt>
                  </div>
                  <div className="flex flex-col flex-wrap pl-2">
                    <dd className="h-12 lg:h-fit">
                      {new Date(
                        props.state.fetchResponse.data.start,
                      ).toLocaleString()}
                    </dd>
                    <dd className="h-12 lg:h-fit">
                      {new Date(
                        props.state.fetchResponse.data.end,
                      ).toLocaleDateString()}
                    </dd>
                    <dd className="h-12 lg:h-fit">
                      {props.state.fetchResponse.data.patientName}
                    </dd>
                    <dd className="h-12 lg:h-fit">
                      {props.state.fetchResponse.data.description}
                    </dd>
                  </div>
                </dl>
                {props.state.submittedResponse.status === Status.LOADING ? (
                  <div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <></>
                )}
                {props.state.submittedResponse.status === Status.WAITING ? (
                  <div className="mt-4">
                    <input
                      className="cursor-pointer rounded-md bg-red-500 px-3 py-2 font-semibold text-white transition-all hover:bg-red-600"
                      type="submit"
                      value="Submit"
                      onClick={props.behavior.submitForm}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
