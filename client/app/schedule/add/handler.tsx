"use client";

import React, { ReactNode, FormEvent, useState, useEffect } from "react";

import { Schedule } from "@/app/models/schedule";
import { IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import { addScheduleAPI } from "@/app/api/scheduleAPI";
import { Response } from "@/app/models/response";
import { findAllOdontologistAPI } from "@/app/api/odontologistAPI";
import { Odontologist } from "@/app/models/odontologist";

const schedule: Schedule = new Schedule();

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  useEffect(() => {
    const response = new Response<Odontologist[]>();
    response.setCallBackFunction((item) => {
      setState({ ...state, fetchResponse: item });
    });
    findAllOdontologistAPI().then(
      (success) => {
        response.isSuccessful(success);
        if (success.length > 0) {
          schedule.odontologistId = success[0].id;
        }
      },
      (error) => response.isUnsuccessful(error.message),
    );
  }, []);

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value ?? "";
      schedule[field] = value;
    },

    selectItem: (event: FormEvent<HTMLSelectElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: number = parseInt(event.currentTarget.value ?? "0");
      schedule[field] = value;
    },

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      addScheduleAPI(schedule).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(() => window.location.replace("/schedule/index"), 3000);
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
