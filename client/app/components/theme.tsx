import React, { FormEvent, ReactNode } from "react";

export enum Theme {
  MAIN,
  SECONDARY,
}

export function Button(props: {
  theme: Theme;
  children?: ReactNode;
  onClick?: (event: FormEvent<HTMLButtonElement>) => void;
}): ReactNode {
  const themes = new Map<Theme, string>();
  themes.set(
    Theme.MAIN,
    "rounded-md border-2 border-emerald-400 bg-emerald-400 px-3 py-2 text-center font-bold text-white shadow-lg transition-all hover:border-emerald-500 hover:bg-emerald-500",
  );
  themes.set(
    Theme.SECONDARY,
    "rounded-md border-2 border-emerald-500 bg-white  px-3 py-2 text-center font-bold text-emerald-500 shadow-lg transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-white",
  );
  return (
    <button className={themes.get(props.theme)} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export function CircleButton(props: {
  theme: Theme;
  children?: ReactNode;
  onClick?: (event: FormEvent<HTMLButtonElement>) => void;
}): ReactNode {
  const themes = new Map<Theme, string>();
  themes.set(
    Theme.MAIN,
    "shadow-lg m-2 box-border h-10 w-10 rounded-full bg-emerald-500 font-bold text-white  border-2 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 transition-all",
  );
  themes.set(
    Theme.SECONDARY,
    "shadow-lg m-2 box-border h-10 w-10 rounded-full bg-white font-bold text-emerald-500 hover:bg-emerald-500 border-2 border-emerald-500 hover:text-white transition-all",
  );
  return (
    <button className={themes.get(props.theme)} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export function InputText(props: {
  label?: string;
  value?: string;
  pattern?: string;
  errorMessage?: string;
}): ReactNode {
  return (
    <div>
      <label className="block font-semibold">{props.label}</label>
      <input
        type="text"
        value={props.value}
        className="h-8 rounded-md border-2 valid:border-emerald-500 valid:outline-emerald-500 invalid:border-rose-500 invalid:outline-rose-500"
        pattern={props.pattern}
      />
      {props.pattern !== undefined &&
      props.errorMessage !== undefined &&
      props.value !== undefined &&
      props.value.match(props.pattern) !== null ? (
        <p className="text-rose-500">{props.errorMessage}</p>
      ) : (
        <></>
      )}
    </div>
  );
}
