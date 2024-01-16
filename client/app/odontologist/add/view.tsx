import React, { FormEvent, ReactNode } from "react";
import Link from "next/link";

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
      <div className="mb-2">
        <p className="text-sm">
          <span className="text-cyan-500 hover:underline">
            <Link href={"/odontologist/index"}>Index</Link>
          </span>
          <span draggable={true}>&nbsp;&#8594; Add</span>
        </p>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Add odontologist</h1>
      </div>
      {props.state.submittedResponse.status === Status.SUCCESS ? (
        <div>
          <p>Odontologist created!</p>
          <p>Returning to index...</p>
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
      {props.state.submittedResponse.status === Status.WAITING ||
      props.state.submittedResponse.status === Status.LOADING ||
      props.state.submittedResponse.status === Status.ERROR ? (
        <div>
          <form autoComplete="off" className="w-3/12">
            <fieldset>
              <div className="my-2 flex flex-col">
                <label className="font-semibold">Name</label>
                <input
                  className="rounded-md border-2 border-slate-300 px-2 py-1"
                  type="text"
                  name="name"
                  placeholder="Type a name here."
                  onChange={props.behavior.changeValue}
                  pattern={String.raw`^[A-Z][a-z]*(\s[A-Z][a-z]*)+$`}
                  data-invalid-digit={0b110}
                  data-valid-digit={0b001}
                  data-error-message="Invalid name!"
                />
              </div>
              <div className="my-2 flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  className="rounded-md border-2 border-slate-300 px-2 py-1"
                  type="email"
                  name="email"
                  placeholder="Type an email here."
                  onChange={props.behavior.changeValue}
                  pattern={String.raw`^\w+([\.\+\-']\w+)*@\w+([\-\.]\w+)*\.\w+([\-\.]\w+)*$`}
                  data-valid-digit={0b010}
                  data-invalid-digit={0b101}
                  data-error-message="Invalid email!"
                />
              </div>
              <div className="my-2 flex flex-col">
                <label className="font-semibold">Phone</label>
                <input
                  className="rounded-md border-2 border-slate-300 px-2 py-1"
                  type="tel"
                  name="phone"
                  placeholder="Type a phone here."
                  onChange={props.behavior.changeValue}
                  pattern={String.raw`^\(0[1-9][1-9]\)\s9?\d{4}-\d{4}$`}
                  data-valid-digit={0b100}
                  data-invalid-digit={0b011}
                  data-error-message="Invalid phone!"
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
              {props.state.submittedResponse.status === Status.WAITING ? (
                <div className="pt-2">
                  <input
                    className="rounded-md bg-emerald-500 px-3 py-2 align-middle font-semibold text-white transition-all hover:cursor-pointer hover:bg-emerald-600 hover:text-white disabled:bg-emerald-200"
                    type="submit"
                    value="Submit"
                    onClick={props.behavior.submitForm}
                    disabled={!(props.state.validFields === 0b111)}
                  />
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
      ) : (
        <></>
      )}
    </div>
  );
};
