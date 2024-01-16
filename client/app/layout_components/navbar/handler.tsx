"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";

import { CookieHandler } from "@/app/utilities/CookieHandler";
import { Authentication } from "@/app/models/enums";
import { IBehavior, State, View } from "./view";
import { authenticatedStore } from "@/app/store";

let isToggled = false;

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());
  const store = useHookstate(authenticatedStore);

  useEffect(() => {
    const aux = CookieHandler.isAuthenticated()
      ? Authentication.AUTHENTICATED
      : Authentication.UNAUTHENTICATED;
    store.set(aux);
    setState({ ...state, authenticated: aux });
  }, [store.get()]);

  const behavior: IBehavior = {
    setToggle: (): void => {
      isToggled = !isToggled;
      setState({ ...state, isToggled: isToggled });
    },

    signOut: (): void => {
      CookieHandler.setAuthorizationCookie("");
      window.location.reload();
    },
  };

  return <View state={state} behavior={behavior} />;
};
