"use client";

import React, { ReactNode, FormEvent, useState, useEffect } from "react";

import { IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role, Status } from "@/app/models/enums";
import { Response } from "@/app/models/response";
import { BreakTimeSchedules } from "@/app/models/composed";
import { findByIdBreakTimeSchedulesAPI } from "@/app/api/composedAPI";
import { editBreakTimeAPI } from "@/app/api/breakTimeAPI";

const response: Response<BreakTimeSchedules> = new Response();

const getId = (): number => {
  const expression = "\\?id=(\\d+)";
  const match = window.location.search.match(expression);
  return match === null ? 0 : parseInt(match[1]);
};

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());
  response.setCallBackFunction((item) => {
    setState({ ...state, fetchResponse: item });
  });

  useEffect(() => {
    findByIdBreakTimeSchedulesAPI(getId()).then(
      (success) => response.isSuccessful(success),
      (error) => response.isUnsuccessful(error.message),
    );
  }, []);

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value ?? "";
      if (response.data !== null) {
        response.data.breakTime[field] = value;
        setState({ ...state, fetchResponse: response });
      }
    },

    selectItem: (event: FormEvent<HTMLSelectElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: number = parseInt(event.currentTarget.value ?? "0");
      if (response.data !== null) {
        response.data.breakTime[field] = value;
        setState({ ...state, fetchResponse: response });
      }
    },

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const submitResponse = new Response<string>();
      submitResponse.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
        setTimeout(() => {
          item.status = Status.WAITING;
          item.data = null;
          item.errorMessage = null;
          setState({ ...state, submittedResponse: item });
        }, 3000);
      });
      submitResponse.isLoading();
      if (response.data !== null) {
        editBreakTimeAPI(response.data.breakTime).then(
          (success) => submitResponse.isSuccessful(success),
          (error) => submitResponse.isUnsuccessful(error.message),
        );
      }
    },
  };

  return (
    <AuthHandler roles={[Role.ADMIN, Role.ODONTOLOGIST]}>
      <View state={state} behavior={behavior} />
    </AuthHandler>
  );
};
