import React, { FormEvent, ReactNode } from "react";

import { Status } from "@/app/models/enums";
import { Response } from "@/app/models/response";

export class State {
  validFields = 0b000;
  invalidFieldMessage: string | null = null;
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
      <h1 className="mb-4 text-2xl font-bold">Sign up</h1>
      {props.state.submittedResponse.status === Status.SUCCESS ? (
        <div>
          <p>Verify your email and follow its instructions.</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.submittedResponse.status === Status.ERROR ||
      props.state.submittedResponse.status === Status.WAITING ||
      props.state.submittedResponse.status === Status.LOADING ? (
        <form className="w-3/12">
          <fieldset>
            <div className="my-2 flex flex-col">
              <label className="font-semibold">Email</label>
              <input
                className="rounded-md border-2 border-slate-300 px-2 py-1"
                type="email"
                name="email"
                onChange={props.behavior.changeValue}
                pattern={String.raw`^\w+([\.\+\-']\w+)*@\w+([\-\.]\w+)*\.\w+([\-\.]\w+)*$`}
                data-valid-digit={0b001}
                data-invalid-digit={0b110}
                data-error-message="Invalid email!"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label className="font-semibold">Password</label>
              <input
                className="rounded-md border-2 border-slate-300 px-2 py-1"
                type="password"
                name="password"
                onChange={props.behavior.changeValue}
                pattern={String.raw`(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}`}
                data-valid-digit={0b010}
                data-invalid-digit={0b101}
                data-error-message="Password must contain at least one letter, one number, one special character and be eight characters minimum!"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label className="font-semibold">Confirm password</label>
              <input
                className="rounded-md border-2 border-slate-300 px-2 py-1"
                type="password"
                name="confirmPassword"
                onChange={props.behavior.changeValue}
                pattern={String.raw`(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}`}
                data-valid-digit={0b100}
                data-invalid-digit={0b011}
                data-error-message="Password must contain at least one letter, one number, one special character and be eight characters minimum!"
              />
            </div>
            {props.state.validFields !== 0b111 &&
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
            {props.state.submittedResponse.status === Status.ERROR ||
            props.state.submittedResponse.status === Status.WAITING ? (
              <div className="my-4 flex items-center justify-between">
                <input
                  className="cursor-pointer rounded-md bg-emerald-500 px-3 py-2 font-semibold text-white transition-all hover:bg-emerald-600 disabled:bg-emerald-200"
                  type="submit"
                  value="Sign up"
                  onClick={props.behavior.submitForm}
                  disabled={!(props.state.validFields === 0b111)}
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
