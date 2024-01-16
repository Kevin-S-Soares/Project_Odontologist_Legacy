import React, { FormEvent, ReactNode } from "react";

import { Status } from "@/app/models/enums";
import { Response } from "@/app/models/response";

export class State {
  submittedResponse: Response<string> = new Response();
  constructor() {
    this.submittedResponse.isWaiting();
  }
}

export interface IBehavior {
  changeValue: (event: FormEvent<HTMLInputElement>) => void;
  submitForm: (event: FormEvent<HTMLInputElement>) => void;
}

export const View = (props: {
  state: State;
  behavior: IBehavior;
}): ReactNode => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Forget Password</h1>
      {props.state.submittedResponse.status === Status.SUCCESS ? (
        <div>
          <p>Check your email and follow its instructions!</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.submittedResponse.status === Status.WAITING ||
      props.state.submittedResponse.status === Status.ERROR ||
      props.state.submittedResponse.status === Status.LOADING ? (
        <form className="w-3/12">
          <fieldset>
            <div className="my-2 flex flex-col">
              <label className="font-semibold">Email</label>
              <input
                className="rounded-md border-2 border-slate-300 px-2 py-1"
                type="text"
                name="email"
                onChange={props.behavior.changeValue}
              />
            </div>
            {props.state.submittedResponse.status === Status.LOADING ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : (
              <></>
            )}
            {props.state.submittedResponse.status === Status.WAITING ||
            props.state.submittedResponse.status === Status.ERROR ? (
              <div className="my-4 flex items-center justify-between">
                <input
                  className="cursor-pointer rounded-md bg-emerald-500 px-3 py-2 font-semibold text-white transition-all hover:bg-emerald-600"
                  type="submit"
                  value="Submit"
                  onClick={props.behavior.submitForm}
                />
              </div>
            ) : (
              <></>
            )}
          </fieldset>
          {props.state.submittedResponse.errorMessage !== null ? (
            <div>
              <p className="text-red-500">
                {props.state.submittedResponse.errorMessage}
              </p>
            </div>
          ) : (
            <></>
          )}
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
