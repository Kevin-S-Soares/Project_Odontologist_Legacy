import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { Authentication } from "@/app/models/enums";
import menuIcon from "../../../public/menu-icon.svg";

export class State {
  authenticated: Authentication = Authentication.LOADING;
  isToggled = false;
}

export interface IBehavior {
  setToggle: () => void;
  signOut: () => void;
}

export const View = (props: {
  state: State;
  behavior: IBehavior;
}): ReactNode => {
  return (
    <div>
      {props.state.authenticated === Authentication.LOADING ? (
        <nav>
          <div className="flex items-center justify-between bg-gradient-to-b from-white to-slate-200 p-2 drop-shadow-sm sm:h-12 md:h-14 lg:h-16">
            <p className="font-bold lg:hidden ">Control Panel</p>
            <div className="hidden lg:block">
              <Link
                className="mr-4 rounded-lg px-2 py-3 font-bold transition-all hover:bg-slate-300"
                href="/"
              >
                Control Panel
              </Link>
              <span draggable={true}>|</span>
              <Link
                className="ml-2 rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/appointment/index"
              >
                Appointment
              </Link>
              <Link
                className="rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/odontologist/index"
              >
                Odontologist
              </Link>
            </div>
            <div
              className={`${
                props.state.isToggled ? "flex" : "hidden"
              } flex-col rounded-b-md border-2 bg-slate-200 px-2 text-sm lg:hidden`}
            >
              <Link
                className="my-1 hover:underline"
                href="/appointment/index"
                onClick={props.behavior.setToggle}
              >
                Appointment
              </Link>
              <Link
                className="my-1 hover:underline"
                href="/odontologist/index"
                onClick={props.behavior.setToggle}
              >
                Odontologist
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <></>
      )}
      {props.state.authenticated === Authentication.UNAUTHENTICATED ? (
        <nav>
          <div className="flex items-center justify-between bg-gradient-to-b from-white to-slate-200 p-2 drop-shadow-sm sm:h-12 md:h-14 lg:h-16">
            <p className="font-bold lg:hidden ">Control Panel</p>
            <div
              className="rounded-md border-2 border-black px-3 py-2 lg:hidden"
              onClick={props.behavior.setToggle}
            >
              <Image width={20} height={20} src={menuIcon} alt="Menu" />
            </div>
            <div className="hidden lg:block">
              <Link
                className="mr-4 rounded-lg px-2 py-3 font-bold transition-all hover:bg-slate-300"
                href="/"
              >
                Control Panel
              </Link>
              <span draggable={true}>|</span>
              <Link
                className="ml-2 rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/appointment/index"
              >
                Appointment
              </Link>
              <Link
                className="rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/odontologist/index"
              >
                Odontologist
              </Link>
            </div>
            <div className="hidden lg:block">
              <Link
                className="mr-2 rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/user/sign_in"
              >
                Sign in
              </Link>
              <span draggable={true}>|</span>
              <Link
                className="ml-2 rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/user/sign_up"
              >
                Sign up
              </Link>
            </div>
          </div>
          <div
            className={`${
              props.state.isToggled ? "flex" : "hidden"
            } flex-col rounded-b-md border-2 bg-slate-200 px-2 text-sm lg:hidden`}
          >
            <Link
              className="my-1 hover:underline"
              href="/appointment/index"
              onClick={props.behavior.setToggle}
            >
              Appointment
            </Link>
            <Link
              className="my-1 hover:underline"
              href="/odontologist/index"
              onClick={props.behavior.setToggle}
            >
              Odontologist
            </Link>
            <Link
              className="my-1 hover:underline"
              href="/user/sign_in"
              onClick={props.behavior.setToggle}
            >
              Sign in
            </Link>
            <Link
              className="my-1 hover:underline"
              href="/user/sign_up"
              onClick={props.behavior.setToggle}
            >
              Sign up
            </Link>
          </div>
        </nav>
      ) : (
        <></>
      )}
      {props.state.authenticated === Authentication.AUTHENTICATED ? (
        <nav>
          <div className="flex items-center justify-between bg-gradient-to-b from-white to-slate-200 drop-shadow-sm sm:h-12 md:h-14 lg:h-16">
            <p className="ml-2 font-bold lg:hidden">Control Panel</p>
            <div
              className="mr-2 cursor-pointer rounded-md border-2 border-black px-3 py-2 lg:hidden"
              onClick={props.behavior.setToggle}
            >
              <Image width={20} height={20} src={menuIcon} alt="Menu" />
            </div>
            <div className="ml-2 hidden lg:block">
              <Link
                className="mr-4 rounded-lg px-2 py-3 font-bold transition-all hover:bg-slate-300"
                href="/"
              >
                Control Panel
              </Link>
              <span draggable={true}>|</span>
              <Link
                className="ml-2 rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/appointment/index"
              >
                Appointment
              </Link>
              <Link
                className="rounded-lg px-2 py-3 transition-all hover:bg-slate-300"
                href="/odontologist/index"
              >
                Odontologist
              </Link>
            </div>
            <div className="mr-2 hidden lg:flex">
              <div>
                <span className="peer relative inline-block cursor-pointer px-2 py-3">
                  My profile
                </span>
                <div className="absolute z-10 hidden w-full bg-white p-2  drop-shadow-md hover:block peer-hover:block">
                  <a href="/" onClick={props.behavior.signOut}>
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              props.state.isToggled ? "flex" : "hidden"
            } flex-col rounded-b-md border-2 bg-slate-200 px-2 text-sm lg:hidden`}
          >
            <Link
              className="my-1 hover:underline"
              href="/appointment/index"
              onClick={props.behavior.setToggle}
            >
              Appointment
            </Link>
            <Link
              className="my-1 hover:underline"
              href="/odontologist/index"
              onClick={props.behavior.setToggle}
            >
              Odontologist
            </Link>
            <p
              className="my-1 cursor-pointer hover:underline"
              onClick={props.behavior.signOut}
            >
              Sign out
            </p>
          </div>
        </nav>
      ) : (
        <></>
      )}
    </div>
  );
};
