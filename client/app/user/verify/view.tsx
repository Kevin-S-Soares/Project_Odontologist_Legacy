import React, { FormEvent, ReactNode } from "react";

import { Status } from "@/app/models/enums";
import { Response } from "@/app/models/response";

export class State {
  submittedResponse: Response<string> = new Response();
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
      <h1 className="mb-4 text-2xl font-bold">Verify Token</h1>
      {props.state.submittedResponse.status === Status.LOADING ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.submittedResponse.status === Status.SUCCESS ? (
        <div>
          <p>Email verified!</p>
          <p>Returning to sign in...</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.submittedResponse.status === Status.ERROR &&
      props.state.submittedResponse.errorMessage !== null ? (
        <div>
          <p>{props.state.submittedResponse.errorMessage}</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.submittedResponse.status === Status.WAITING ? (
        <form className="w-3/12">
          <fieldset>
            <div className="my-2 flex flex-col">
              <label className="font-semibold">Token</label>
              <input
                className="rounded-md border-2 border-slate-300 px-2 py-1"
                type="text"
                name="token"
                onChange={props.behavior.changeValue}
              />
            </div>
            <div className="my-4 flex items-center justify-between">
              <input
                className="cursor-pointer rounded-md bg-emerald-500 px-3 py-2 font-semibold text-white transition-all hover:bg-emerald-600 disabled:bg-emerald-200"
                type="submit"
                value="Verify token"
                onClick={props.behavior.submitForm}
              />
            </div>
          </fieldset>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
