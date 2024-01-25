import React from "react";
import { ReactNode } from "react";
import { hideModal } from "./funcs";

export const View = (): ReactNode => {
  return (
    <section
      id="modal"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className="fixed z-10 hidden h-full w-full items-center justify-center"
    >
      <div className=" h-96 w-1/3 rounded-md bg-white p-4">
        <div className="grid h-full grid-cols-1 grid-rows-5">
          <div>
            <button
              onClick={hideModal}
              className="items-top float-right flex h-10 w-10 justify-center rounded-full bg-slate-300 text-3xl transition-all hover:bg-slate-400"
            >
              <span>&times;</span>
            </button>
          </div>

          <div>
            <p id="modal-message" className="text-center text-2xl font-bold">
              Are you sure?
            </p>
          </div>

          <div className="row-start-5 row-end-6 grid grid-cols-1 grid-rows-1">
            <button
              id="modal-remove"
              onClick={() => 0}
              className="rounded-md bg-red-500 px-2 py-3 font-bold text-white transition-all hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
