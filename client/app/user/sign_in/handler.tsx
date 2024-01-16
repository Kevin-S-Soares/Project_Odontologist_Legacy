"use client";

import React, { FormEvent, ReactNode, useEffect, useState } from "react";
import { useHookstate } from "@hookstate/core";

import { IBehavior, State, View } from "./view";
import { CookieHandler } from "@/app/utilities/CookieHandler";
import { SignIn } from "@/app/models/user";
import { Authentication } from "@/app/models/enums";
import { signInAPI } from "@/app/api/userAPI";
import { Response } from "@/app/models/response";
import { authenticatedStore } from "@/app/store";

const signIn: SignIn = new SignIn();

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());
  const store = useHookstate(authenticatedStore);

  useEffect(() => {
    setState({ ...state, authenticated: store.get() });
  }, []);

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value;
      signIn[field] = value;
    },

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      signInAPI(signIn).then(
        (success) => {
          response.isSuccessful(success);
          CookieHandler.setAuthorizationCookie(success);
          store.set(Authentication.AUTHENTICATED);
          setTimeout(() => window.location.replace("/"), 3000);
        },
        (error) => {
          response.isUnsuccessful(error.message);
          setTimeout(() => response.isWaiting(), 3000);
        },
      );
    },
  };

  return <View state={state} behavior={behavior} />;
};
