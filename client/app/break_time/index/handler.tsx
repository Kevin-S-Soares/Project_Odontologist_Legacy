"use client";

import React, { FormEvent, ReactNode, useEffect, useState } from "react";

import { DEFAULT_ITEMS_PER_PAGE, IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import { Role } from "@/app/models/enums";
import { Response } from "@/app/models/response";
import { IPagination, createPagination } from "@/app/models/interfaces";
import { BreakTime } from "@/app/models/break_time";
import { findAllBreakTimeAPI } from "@/app/api/breakTimeAPI";

let data: BreakTime[] | null = null;
const paginationResponse: Response<IPagination<BreakTime>> = new Response();
let itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());
  paginationResponse.setCallBackFunction((item) => {
    setState({ ...state, paginationResponse: item });
  });

  useEffect(() => {
    findAllBreakTimeAPI().then(
      (success) => {
        data = success;
        paginationResponse.isSuccessful(createPagination(data, itemsPerPage));
      },
      (error) => paginationResponse.isUnsuccessful(error.message),
    );
  }, []);

  const behavior: IBehavior = {
    clickNextPage: (): void => {
      if (
        paginationResponse.data !== null &&
        paginationResponse.data.nextPage !== null
      ) {
        paginationResponse.data = paginationResponse.data.nextPage;
        setState({ ...state, paginationResponse: paginationResponse });
      }
    },

    clickPreviousPage: (): void => {
      if (
        paginationResponse.data !== null &&
        paginationResponse.data.previousPage !== null
      ) {
        paginationResponse.data = paginationResponse.data.previousPage;
        setState({ ...state, paginationResponse: paginationResponse });
      }
    },

    selectItemsPerPage: (event: FormEvent<HTMLSelectElement>): void => {
      const value = parseInt(event.currentTarget.value);
      if (data !== null) {
        itemsPerPage = value;
        paginationResponse.data = createPagination(data, itemsPerPage);
        setState({
          ...state,
          itemsPerPage: itemsPerPage,
          paginationResponse: paginationResponse,
        });
      }
    },
  };

  return (
    <AuthHandler roles={[Role.ADMIN, Role.ODONTOLOGIST, Role.ATTENDANT]}>
      <View state={state} behavior={behavior} />
    </AuthHandler>
  );
};
