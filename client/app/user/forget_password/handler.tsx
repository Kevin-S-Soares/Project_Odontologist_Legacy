"use client";

import React, { FormEvent, ReactNode, useState } from "react";

import { IBehavior, State, View } from "./view";
import { forgetPasswordAPI } from "@/app/api/userAPI";
import { Response } from "@/app/models/response";

let email = "";

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const value = event.currentTarget.value;
      email = value;
    },

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      forgetPasswordAPI(email).then(
        (success) => response.isSuccessful(success),
        (error) => {
          response.isUnsuccessful(error.message);
          setTimeout(() => response.isWaiting(), 3000);
        },
      );
    },
  };

  return <View state={state} behavior={behavior} />;
};
