"use client";

import React, { ReactNode, FormEvent, useState } from "react";

import { Odontologist } from "@/app/models/odontologist";
import { Response } from "@/app/models/response";
import { IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import {
  editOdontologistAPI,
  findByIdOdontologistAPI,
} from "@/app/api/odontologistAPI";
import { useMount } from "react-use";

let validFields = 0b111;
let odontologist: Odontologist = new Odontologist();

const getId = (): number => {
  const expression = "\\?id=(\\d+)";
  const match = window.location.search.match(expression);
  return match === null ? 0 : parseInt(match[1]);
};

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  useMount(() => {
    const response = new Response<Odontologist>();
    response.setCallBackFunction((item) => {
      setState({ ...state, fetchResponse: item });
    });
    findByIdOdontologistAPI(getId()).then(
      (success) => {
        odontologist = success;
        response.isSuccessful(success);
      },
      (error) => response.isUnsuccessful(error.message),
    );
  });

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field: string = event.currentTarget.getAttribute("name") ?? "";
      const value: string = event.currentTarget.value ?? "";
      const pattern = event.currentTarget.pattern;

      odontologist[field] = value;

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
      editOdontologistAPI(odontologist).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(() => response.isWaiting(), 3000);
        },
        (error) => {
          response.isUnsuccessful(error.message);
          setState({ ...state, validFields: 0b000 });
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
