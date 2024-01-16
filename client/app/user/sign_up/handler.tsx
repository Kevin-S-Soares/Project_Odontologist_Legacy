"use client";

import React, { FormEvent, ReactNode, useState } from "react";

import { IBehavior, State, View } from "./view";
import { SignUp } from "@/app/models/user";
import { signUpAPI } from "@/app/api/userAPI";
import { Response } from "@/app/models/response";

let validFields = 0b000;
const signUp: SignUp = new SignUp();

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field = event.currentTarget.getAttribute("name") ?? "";
      const value = event.currentTarget.value;
      const pattern = event.currentTarget.pattern;
      signUp[field] = value;

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
        return;
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

      if (
        signUp.confirmPassword !== signUp.password &&
        signUp.confirmPassword !== "" &&
        signUp.password !== ""
      ) {
        setState({
          ...state,
          validFields: validFields & 0b001,
          invalidFieldMessage: "Passwords do not match!",
        });
      } else {
        setState({
          ...state,
          validFields: validFields,
          invalidFieldMessage: null,
        });
      }
    },

    submitForm: (event: FormEvent<HTMLInputElement>): void => {
      event.preventDefault();
      const response: Response<string> = new Response();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      signUpAPI(signUp).then(
        (success) => response.isSuccessful(success),
        (error) => {
          response.isUnsuccessful(error.message);
          setState({ ...state, validFields: 0b000 });
          setTimeout(() => response.isWaiting(), 3000);
        },
      );
    },
  };

  return <View state={state} behavior={behavior} />;
};
