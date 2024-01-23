"use client";

import React, { ReactNode, FormEvent, useState } from "react";

import { Schedule } from "@/app/models/schedule";
import { IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import { findAllScheduleAPI } from "@/app/api/scheduleAPI";
import { Response } from "@/app/models/response";
import { Appointment } from "@/app/models/appointment";
import { addAppointmentAPI } from "@/app/api/appointmentAPI";
import { useMount } from "react-use";

let validFields = 0b0;
const appointment = new Appointment();

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
          appointment.scheduleId = success[0].id;
        }
      },
      (error) => response.isUnsuccessful(error.message),
    );
  });

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value ?? "";
      appointment[field] = value;

      const pattern = event.currentTarget.pattern;

      if (pattern !== "" && value.match(pattern) === null) {
        const errorMessage =
          event.currentTarget.getAttribute("data-error-message") ?? "";
        validFields &= parseInt(
          event.currentTarget.getAttribute("data-invalid-digit") ?? "0",
        );
        setState({
          ...state,
          validFields: validFields,
          invalidFieldMessage: errorMessage,
        });
      } else {
        validFields |= parseInt(
          event.currentTarget.getAttribute("data-valid-digit") ?? "0",
        );
        setState({
          ...state,
          validFields: validFields,
          invalidFieldMessage: null,
        });
      }
    },

    selectItem: (event: FormEvent<HTMLSelectElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: number = parseInt(event.currentTarget.value ?? "0");
      appointment[field] = value;
    },

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      addAppointmentAPI(appointment).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(() => window.location.replace("/appointment/index"), 3000);
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
