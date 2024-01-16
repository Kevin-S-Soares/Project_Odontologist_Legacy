"use client";

import React, { FormEvent, ReactNode, useEffect, useState } from "react";

import { IBehavior, State, View } from "./view";
import { Appointment } from "@/app/models/appointment";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import {
  removeAppointmentAPI,
  findByIdAppointmentAPI,
} from "@/app/api/appointmentAPI";
import { Response } from "@/app/models/response";

const getId = (): number => {
  const expression = "\\?id=(\\d+)";
  const match = window.location.search.match(expression);
  return match === null ? 0 : parseInt(match[1]);
};

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  useEffect(() => {
    const response = new Response<Appointment>();
    response.setCallBackFunction((item) => {
      setState({ ...state, fetchResponse: item });
    });
    findByIdAppointmentAPI(getId()).then(
      (success) => response.isSuccessful(success),
      (error) => response.isUnsuccessful(error.message),
    );
  }, []);

  const behavior: IBehavior = {
    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      removeAppointmentAPI(getId()).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(() => window.location.replace("/appointment/index"), 3000);
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
