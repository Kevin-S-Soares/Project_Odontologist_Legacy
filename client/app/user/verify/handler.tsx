"use client";

import React, { FormEvent, ReactNode, useEffect, useState } from "react";

import { IBehavior, State, View } from "./view";
import { verifyTokenAPI } from "@/app/api/userAPI";
import { Response } from "@/app/models/response";

let token = "";
const response = new Response<string>();

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());
  response.setCallBackFunction((item) =>
    setState({ ...state, submittedResponse: item }),
  );

  useEffect(() => {
    const expression = "\\?token=(\\w+)";
    const match = window.location.search.match(expression);
    if (match === null) {
      response.isWaiting();
    } else {
      token = match[1];
      submit();
    }
  }, []);

  const submit = () => {
    response.isLoading();
    verifyTokenAPI(token).then(
      (success) => {
        response.isSuccessful(success);
        setTimeout(() => window.location.replace("/user/sign_in"), 3000);
      },
      (error) => response.isUnsuccessful(error.message),
    );
  };

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const value = event.currentTarget.value;
      token = value;
    },
    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      submit();
    },
  };

  return <View state={state} behavior={behavior} />;
};
