"use client";

import React, { FormEvent, ReactNode, useState } from "react";

import { IBehavior, State, View } from "./view";
import { Schedule } from "@/app/models/schedule";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import { removeScheduleAPI, findByIdScheduleAPI } from "@/app/api/scheduleAPI";
import { Response } from "@/app/models/response";
import { useMount } from "react-use";

const getId = (): number => {
  const expression = "\\?id=(\\d+)";
  const match = window.location.search.match(expression);
  return match === null ? 0 : parseInt(match[1]);
};

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  useMount(() => {
    const response = new Response<Schedule>();
    response.setCallBackFunction((item) => {
      setState({ ...state, fetchResponse: item });
    });
    findByIdScheduleAPI(getId()).then(
      (success) => response.isSuccessful(success),
      (error) => response.isUnsuccessful(error.message),
    );
  });

  const behavior: IBehavior = {
    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      removeScheduleAPI(getId()).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(() => window.location.replace("/schedule/index"), 3000);
        },
        (error) => response.isUnsuccessful(error.message),
      );
    },
  };

  return (
    <AuthHandler roles={[Role.ADMIN, Role.ODONTOLOGIST]}>
      <View state={state} behavior={behavior} />
    </AuthHandler>
  );
};
