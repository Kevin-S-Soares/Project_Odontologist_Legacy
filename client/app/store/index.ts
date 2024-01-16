import { hookstate } from "@hookstate/core";
import { Authentication } from "../models/enums";
import { CalendarDay } from "../components/scheduler/entities";

export const authenticatedStore = hookstate(Authentication.LOADING);
export const calendarStore = hookstate(new CalendarDay());
