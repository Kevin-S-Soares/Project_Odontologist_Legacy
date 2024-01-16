"use client";

import React, { FormEvent, ReactNode, useEffect, useState } from "react";

import { IBehavior, State, View } from "./view";
import { resetPasswordAPI } from "@/app/api/userAPI";
import { ResetPassword } from "@/app/models/user";
import { Response } from "@/app/models/response";

let validFields = 0b00;
const resetPassword: ResetPassword = new ResetPassword();

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());

  useEffect(() => {
    const expression = "\\?token=(\\w+)";
    const match = window.location.search.match(expression);
    if (match !== null) {
      resetPassword.token = match[1];
    }
  }, []);

  const behavior: IBehavior = {
    changeValue: (event: FormEvent<HTMLInputElement>): void => {
      const field = event.currentTarget.getAttribute("name") ?? "";
      const value = event.currentTarget.value;
      const pattern = event.currentTarget.pattern;
      resetPassword[field] = value;

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
        resetPassword.confirmPassword !== resetPassword.password &&
        resetPassword.confirmPassword !== "" &&
        resetPassword.password !== ""
      ) {
        setState({
          ...state,
          validFields: validFields & 0b00,
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
      const response = new Response<string>();
      response.setCallBackFunction((item) => {
        setState({ ...state, submittedResponse: item });
      });
      response.isLoading();
      resetPasswordAPI(resetPassword).then(
        (success) => {
          response.isSuccessful(success);
          setTimeout(() => window.location.replace("/user/sign_in"), 3000);
        },
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
