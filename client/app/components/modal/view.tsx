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
      <div className="h-1/3 w-1/3 rounded-md bg-white p-4">
        <div className="grid h-full grid-cols-2 grid-rows-5">
          <div className="col-start-1 col-end-3">
            <button onClick={hideModal} className="float-right text-3xl">
              &times;
            </button>
          </div>
          <div className="col-start-1 col-end-3  row-start-2 row-end-4 flex">
            <p id="modal-message" className="text-2xl font-bold text-center">
              Are you sure?
            </p>
          </div>

          <div className="col-start-1 col-end-3 row-start-4 row-end-6 grid grid-cols-2 grid-rows-2">
            <button id="modal-remove"
              onClick={() => 0}
              className="rounded-md bg-red-500 px-2 py-3 font-bold text-white transition-all hover:bg-red-600"
            >
              Remove
            </button>
            <button onClick={hideModal} className="font-bold">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  );
};
