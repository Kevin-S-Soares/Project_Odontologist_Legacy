import React, { FormEvent, ReactNode } from "react";
import Link from "next/link";

import { Odontologist } from "@/app/models/odontologist";
import { Response } from "@/app/models/response";
import { Status } from "@/app/models/enums";

export class State {
  fetchResponse: Response<Odontologist> = new Response();
  submittedResponse: Response<string> = new Response();
  constructor() {
    this.submittedResponse.isWaiting();
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
            <Link href={"/odontologist/index"}>Index</Link>
          </span>
          <span draggable={true}>&nbsp;&#8594; Remove</span>
        </p>
      </div>
      <div>
        <h1 className="mb-4 text-2xl font-bold">Remove odontologist</h1>
      </div>
      {props.state.submittedResponse.status === Status.SUCCESS ? (
        <div>
          <p>Odontologist removed!</p>
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
              <div>
                <form>
                  <dl className="flex justify-start">
                    <div className="mr-2 flex flex-col pr-3">
                      <dt className="h-12 font-bold lg:h-fit">Name</dt>
                      <dt className="h-12 font-bold lg:h-fit">Email</dt>
                      <dt className="h-12 font-bold lg:h-fit">Phone</dt>
                    </div>
                    <div className="flex flex-col flex-wrap pl-2">
                      <dd className="h-12 lg:h-fit">
                        {props.state.fetchResponse.data.name}
                      </dd>
                      <dd className="h-12 lg:h-fit">
                        {props.state.fetchResponse.data.email}
                      </dd>
                      <dd className="h-12 lg:h-fit">
                        {props.state.fetchResponse.data.phone}
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
