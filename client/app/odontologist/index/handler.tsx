"use client";

import React, { FormEvent, ReactNode, useEffect, useState } from "react";

import { Odontologist } from "@/app/models/odontologist";
import { DEFAULT_ITEMS_PER_PAGE, IBehavior, State, View } from "./view";
import { AuthHandler } from "@/app/AuthHandler";
import {
  findAllOdontologistAPI,
  removeOdontologistAPI,
} from "@/app/api/odontologistAPI";
import { IPagination, createPagination } from "@/app/models/interfaces";
import { Role } from "@/app/models/enums";
import { Response } from "@/app/models/response";
import { setModalMessage } from "@/app/components/modal/funcs";

let data: Odontologist[] | null = null;
const paginationResponse: Response<IPagination<Odontologist>> = new Response();
let itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;

export const Handler = (): ReactNode => {
  const [state, setState] = useState(new State());
  paginationResponse.setCallBackFunction((item) => {
    setState({ ...state, paginationResponse: item });
  });

  useEffect(() => {
    findAllOdontologistAPI().then(
      (success) => {
        data = success as Odontologist[];
        paginationResponse.isSuccessful(createPagination(data, itemsPerPage));
      },
      (error) => paginationResponse.isUnsuccessful(error.message),
    );
  }, []);

  const behavior: IBehavior = {
    clickPreviousPage: (): void => {
      if (
        paginationResponse.data !== null &&
        paginationResponse.data.previousPage !== null
      ) {
        paginationResponse.data = paginationResponse.data.previousPage;
        setState({ ...state, paginationResponse: paginationResponse });
      }
    },
    clickNextPage: (): void => {
      if (
        paginationResponse.data !== null &&
        paginationResponse.data.nextPage !== null
      ) {
        paginationResponse.data = paginationResponse.data.nextPage;
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
    removeItem: (arg: number): void => {
      removeOdontologistAPI(arg).then(
        () => {
          window.location.replace("/odontologist/index");
        },
        (error) => setModalMessage(error.message),
      );
    },
  };

  return (
    <AuthHandler roles={[Role.ADMIN, Role.ODONTOLOGIST, Role.ATTENDANT]}>
      <View state={state} behavior={behavior} />
    </AuthHandler>
  );
};
