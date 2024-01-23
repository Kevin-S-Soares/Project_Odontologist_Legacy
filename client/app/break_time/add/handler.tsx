"use client";

import React, { ReactNode, FormEvent, useState } from "react";

import { Schedule } from "@/app/models/schedule";
import { IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import { findAllScheduleAPI } from "@/app/api/scheduleAPI";
import { Response } from "@/app/models/response";
import { BreakTime } from "@/app/models/break_time";
import { addBreakTimeAPI } from "@/app/api/breakTimeAPI";
import { useMount } from "react-use";

const breakTime: BreakTime = new BreakTime();
export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  useMount(() => {
    const response = new Response<Schedule[]>();
    response.setCallBackFunction((item) => {
      setState({ ...state, fetchResponse: item });
    });
    findAllScheduleAPI().then(
      (success) => {
        response.isSuccessful(success);
        if (success.length > 0) {
          breakTime.scheduleId = success[0].id;
        }
      },
      (error) => response.isUnsuccessful(error.message),
    );
  });

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value ?? "";
      breakTime[field] = value;
    },
    selectItem: (event: FormEvent<HTMLSelectElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: number = parseInt(event.currentTarget.value ?? "0");
      breakTime[field] = value;
    },
    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      addBreakTimeAPI(breakTime).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(() => window.location.replace("/break_time/index"), 3000);
        },
        (error) => {
          response.isUnsuccessful(error.message);
          setTimeout(() => response.isWaiting(), 3000);
        },
      );
    },
  };

  return (
    <AuthHandler roles={[Role.ADMIN, Role.ODONTOLOGIST]}>
      <View state={state} behavior={behavior} />
    </AuthHandler>
  );
};
