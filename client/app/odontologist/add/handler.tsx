"use client";

import React, { ReactNode, FormEvent, useState } from "react";

import { Odontologist } from "@/app/models/odontologist";
import { IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import { addOdontologistAPI } from "@/app/api/odontologistAPI";
import { Response } from "@/app/models/response";

const odontologist: Odontologist = new Odontologist();
let validFields = 0b000;

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value ?? "";

      odontologist[field] = value;
      const pattern = event.currentTarget.pattern;

      if (value.match(pattern) === null) {
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

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      addOdontologistAPI(odontologist).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(
            () => window.location.replace("/odontologist/index"),
            3000,
          );
        },
        (error) => {
          response.isUnsuccessful(error.message);
          setTimeout(() => response.isWaiting(), 3000);
        },
      );
    },
  };

  return (
    <AuthHandler roles={[Role.ADMIN]}>
      <View state={state} behavior={behavior} />
    </AuthHandler>
  );
};
