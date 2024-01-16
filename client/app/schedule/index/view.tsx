import React, { FormEvent, ReactNode } from "react";
import Link from "next/link";

import { Schedule } from "@/app/models/schedule";
import { Response } from "@/app/models/response";
import { IPagination } from "@/app/models/interfaces";
import { Status } from "@/app/models/enums";
import { getDayOfTheWeek } from "@/app/utilities/day_of_the_week";

export const DEFAULT_ITEMS_PER_PAGE = 5;

export class State {
  paginationResponse: Response<IPagination<Schedule>> = new Response();
  itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;
}

export interface IBehavior {
  clickNextPage: () => void;
  clickPreviousPage: () => void;
  selectItemsPerPage: (event: FormEvent<HTMLSelectElement>) => void;
}

export const View = (props: {
  state: State;
  behavior: IBehavior;
}): ReactNode => {
  return (
    <div>
      <div className="mb-8 flex justify-between">
        <div>
          <Link
            className="rounded-md bg-emerald-500 px-4 py-3 font-semibold text-white transition-all hover:bg-emerald-600"
            href="./add"
          >
            + Add new schedule
          </Link>
        </div>
        <div>
          <label className="mr-2">Items per page:</label>
          <select
            className="rounded-md border-2 border-slate-300 px-2 py-1"
            onChange={props.behavior.selectItemsPerPage}
            value={props.state.itemsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
      {props.state.paginationResponse.status === Status.LOADING ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.paginationResponse.status === Status.ERROR &&
      props.state.paginationResponse.errorMessage !== null ? (
        <div>
          <p className="text-red-500">
            {props.state.paginationResponse.errorMessage}
          </p>
        </div>
      ) : (
        <></>
      )}
      {props.state.paginationResponse.status === Status.SUCCESS &&
      props.state.paginationResponse.data !== null ? (
        <div>
          {props.state.paginationResponse.data.page.length <= 0 ? (
            <div>
              <p>No schedules available!</p>
            </div>
          ) : (
            <></>
          )}
          {props.state.paginationResponse.data.page.length > 0 ? (
            <div>
              <div className="flex flex-col">
                <table className="grow">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th className="w-48">Name</th>
                      <th className="w-48">Start Time</th>
                      <th className="w-48">Start Day</th>
                      <th className="w-48">End Time</th>
                      <th className="w-48">End Day</th>
                      <th className="w-96" colSpan={3}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.state.paginationResponse.data.page.map((x, y) => (
                      <tr
                        className="border-b-2 border-slate-200 text-center hover:bg-slate-100"
                        key={y}
                      >
                        <td className="h-20 lg:inline">{x.name}</td>
                        <td>{x.startTime}</td>
                        <td>{getDayOfTheWeek(x.startDay)}</td>
                        <td>{x.endTime}</td>
                        <td>{getDayOfTheWeek(x.endDay)}</td>
                        <td className="w-32">
                          <Link
                            className="text-cyan-500 underline hover:text-cyan-600"
                            href={`/break_time/index?schedule_id=${x.id}`}
                          >
                            Break Times
                          </Link>
                        </td>
                        <td className="w-32">
                          <Link
                            className="text-cyan-500 underline hover:text-cyan-600"
                            href={`/schedule/edit?id=${x.id}`}
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="w-32">
                          <Link
                            className="text-cyan-500 underline hover:text-cyan-600"
                            href={`/schedule/remove?id=${x.id}`}
                          >
                            Remove
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-center">
                  {props.state.paginationResponse.data.previousPage !== null ? (
                    <input
                      className="mr-2 w-8 cursor-pointer rounded-md border-2 border-slate-300 px-1 py-2 text-center font-bold transition-all hover:bg-slate-100"
                      type="button"
                      value={
                        props.state.paginationResponse.data.previousPage
                          .pageNumber
                      }
                      onClick={props.behavior.clickPreviousPage}
                    />
                  ) : (
                    <></>
                  )}

                  <input
                    className="mr-2 w-8 cursor-pointer rounded-md border-2 border-emerald-500 bg-emerald-500 px-1 py-2 text-center font-bold text-white transition-all hover:border-emerald-600 hover:bg-emerald-600"
                    type="button"
                    value={props.state.paginationResponse.data.pageNumber}
                  />

                  {props.state.paginationResponse.data.nextPage !== null ? (
                    <input
                      className="mr-2 w-8 cursor-pointer rounded-md border-2 border-slate-300 px-1 py-2 text-center font-bold transition-all hover:bg-slate-100"
                      type="button"
                      value={
                        props.state.paginationResponse.data.nextPage.pageNumber
                      }
                      onClick={props.behavior.clickNextPage}
                    />
                  ) : (
                    <></>
                  )}
                </div>
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
