"use client";

import React, { ReactNode, FormEvent, useState, useEffect } from "react";

import { IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role, Status } from "@/app/models/enums";
import { editScheduleAPI } from "@/app/api/scheduleAPI";
import { Response } from "@/app/models/response";
import { ScheduleOdontologists } from "@/app/models/composed";
import { findByIdScheduleOdontologistsAPI } from "@/app/api/composedAPI";

const fetchResponse: Response<ScheduleOdontologists> = new Response();

const getId = (): number => {
  const expression = "\\?id=(\\d+)";
  const match = window.location.search.match(expression);
  return match === null ? 0 : parseInt(match[1]);
};

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());
  fetchResponse.setCallBackFunction((item) => {
    setState({ ...state, fetchResponse: item });
  });

  useEffect(() => {
    findByIdScheduleOdontologistsAPI(getId()).then(
      (success) => fetchResponse.isSuccessful(success),
      (error) => fetchResponse.isUnsuccessful(error.message),
    );
  }, []);

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value ?? "";
      if (fetchResponse.data !== null) {
        fetchResponse.data.schedule[field] = value;
        setState({ ...state, fetchResponse: fetchResponse });
      }
    },

    selectItem: (event: FormEvent<HTMLSelectElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: number = parseInt(event.currentTarget.value ?? "0");
      if (fetchResponse.data !== null) {
        fetchResponse.data.schedule[field] = value;
        setState({ ...state, fetchResponse: fetchResponse });
      }
    },

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
        setTimeout(() => {
          item.status = Status.WAITING;
          item.data = null;
          item.errorMessage = null;
          setState({ ...state, submittedResponse: item });
        }, 3000);
      });
      response.isLoading();
      if (fetchResponse.data !== null) {
        editScheduleAPI(fetchResponse.data.schedule).then(
          (success) => response.isSuccessful(success),
          (error) => response.isUnsuccessful(error.message),
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
