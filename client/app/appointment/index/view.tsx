import React, { FormEvent, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { Response } from "@/app/models/response";
import { IPagination } from "@/app/models/interfaces";
import { Status } from "@/app/models/enums";
import { Appointment } from "@/app/models/appointment";
import { CircleButton, Theme } from "@/app/components/theme";

import editIcon from "../../../public/edit.svg";
import removeIcon from "../../../public/trash2.svg";
import {
  setModalCallBack,
  setModalMessage,
  showModal,
} from "@/app/components/modal/funcs";

export const DEFAULT_ITEMS_PER_PAGE = 5;

export class State {
  paginationResponse: Response<IPagination<Appointment>> = new Response();
  itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;
}

export interface IBehavior {
  clickNextPage: () => void;
  clickPreviousPage: () => void;
  selectItemsPerPage: (event: FormEvent<HTMLSelectElement>) => void;
  removeItem: (arg: number) => void;
}

export const View = (props: {
  state: State;
  behavior: IBehavior;
}): ReactNode => {
  return (
    <div>
      <div className="mb-8 flex justify-between">
        <div className="flex">
          <div className="flex">
            <Link
              className="flex w-12 justify-center overflow-hidden whitespace-nowrap rounded-md bg-emerald-500 px-4 py-3 font-bold text-white transition-all hover:w-48 hover:bg-emerald-600 hover:after:content-['_Add_Appointment']"
              href="./add"
            >
              <span>+</span>
            </Link>
          </div>
        </div>
        <div className="flex items-center">
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
          <p>{props.state.paginationResponse.errorMessage}</p>
        </div>
      ) : (
        <></>
      )}
      {props.state.paginationResponse.status === Status.SUCCESS &&
      props.state.paginationResponse.data !== null ? (
        <div>
          {props.state.paginationResponse.data.page.length <= 0 ? (
            <p>No appointments available!</p>
          ) : (
            <></>
          )}
          {props.state.paginationResponse.data.page.length > 0 ? (
            <section className="">
              <div
                className={`grid grid-cols-6 gap-y-4 grid-rows-${
                  props.state.itemsPerPage + 1
                }`}
              >
                <div className="col-start-1 col-end-7 grid grid-cols-6 border-b-2 border-black">
                  <div className="flex items-center justify-center">
                    <p className="font-bold">Start</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="font-bold">End</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="font-bold">Patient</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="font-bold">Description</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="font-bold">Edit</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="font-bold">Remove</p>
                  </div>
                </div>
                {props.state.paginationResponse.data.page.map((item, index) => {
                  if (index < props.state.itemsPerPage) {
                    return (
                      <div
                        key={index}
                        className="col-start-1 col-end-7 grid h-12 grid-cols-6 hover:bg-slate-200"
                      >
                        {" "}
                        {[
                          <div
                            className="flex items-center justify-center overflow-clip whitespace-nowrap"
                            key={index + 1}
                          >
                            <p>{new Date(item.start).toLocaleString()}</p>
                          </div>,
                          <div
                            className="flex items-center justify-center overflow-clip whitespace-nowrap"
                            key={index + 2}
                          >
                            <p className="whitespace-nowrap text-slate-800">
                              {new Date(item.end).toLocaleString()}
                            </p>
                          </div>,
                          <div
                            className="flex items-center justify-center overflow-clip whitespace-nowrap"
                            key={index + 3}
                          >
                            <p className="whitespace-nowrap text-slate-800">
                              {item.patientName}
                            </p>
                          </div>,
                          <div
                            className="flex items-center justify-center overflow-clip whitespace-nowrap"
                            key={index + 4}
                          >
                            <p>{item.description}</p>
                          </div>,
                          <div
                            className="flex items-center justify-center"
                            key={index + 5}
                          >
                            <span className="group flex w-20 justify-center">
                              <Link
                                href={`/appointment/edit?id=${item.id}`}
                                className="flex h-10 w-20 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500 px-2 font-bold text-white shadow-lg transition-all group-hover:h-11 group-hover:w-11"
                                title="Edit"
                              >
                                <Image
                                  src={editIcon}
                                  height={30}
                                  width={30}
                                  alt="edit icon"
                                />
                              </Link>
                            </span>
                          </div>,
                          <div
                            className="flex items-center justify-center"
                            key={index + 6}
                          >
                            <span className="group flex w-20 justify-center">
                              <button
                                onClick={() => {
                                  setModalMessage(
                                    `Are you sure you want to remove ${item.description} from ${item.patientName}?`,
                                  );
                                  setModalCallBack(() => props.behavior.removeItem(item.id));
                                  showModal();
                                }}
                                className="flex h-10 w-20 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500 px-2 font-bold text-white shadow-lg transition-all group-hover:h-11 group-hover:w-11"
                                title="Remove"
                              >
                                <Image
                                  src={removeIcon}
                                  height={30}
                                  width={30}
                                  alt="remove icon"
                                />
                              </button>
                            </span>
                          </div>,
                        ]}
                      </div>
                    );
                  }
                  return [];
                })}
              </div>
              <div className="mt-2 flex justify-center">
                {props.state.paginationResponse.data.previousPage !== null ? (
                  <CircleButton
                    theme={Theme.SECONDARY}
                    onClick={props.behavior.clickPreviousPage}
                  >
                    {
                      props.state.paginationResponse.data.previousPage
                        .pageNumber
                    }
                  </CircleButton>
                ) : (
                  <></>
                )}

                <CircleButton theme={Theme.MAIN}>
                  {props.state.paginationResponse.data.pageNumber}
                </CircleButton>

                {props.state.paginationResponse.data.nextPage !== null ? (
                  <CircleButton
                    theme={Theme.SECONDARY}
                    onClick={props.behavior.clickNextPage}
                  >
                    {props.state.paginationResponse.data.nextPage.pageNumber}
                  </CircleButton>
                ) : (
                  <></>
                )}
              </div>
            </section>
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
