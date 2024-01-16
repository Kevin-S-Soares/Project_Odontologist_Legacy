import {
  AppointmentSchedules,
  BreakTimeSchedules,
  ScheduleOdontologists,
} from "../models/composed";
import { findByIdAppointmentAPI } from "./appointmentAPI";
import { findByIdBreakTimeAPI } from "./breakTimeAPI";
import { findAllOdontologistAPI } from "./odontologistAPI";
import { findAllScheduleAPI, findByIdScheduleAPI } from "./scheduleAPI";

export async function findByIdScheduleOdontologistsAPI(
  arg: number,
): Promise<ScheduleOdontologists> {
  const result = new ScheduleOdontologists();
  let errors = 0b00;
  let errorMessage = "";
  await findByIdScheduleAPI(arg).then(
    (success) => {
      result.schedule = success;
    },
    (error) => {
      errors |= 0b01;
      errorMessage = error;
    },
  );
  await findAllOdontologistAPI().then(
    (success) => {
      result.odontologists = success;
    },
    (error) => {
      errors |= 0b10;
      errorMessage = error;
    },
  );
  return new Promise<ScheduleOdontologists>((success, error) => {
    if (errors === 0b00) {
      success(result);
    } else {
      error(errorMessage);
    }
  });
}

export async function findByIdBreakTimeSchedulesAPI(
  arg: number,
): Promise<BreakTimeSchedules> {
  const result = new BreakTimeSchedules();
  let errors = 0b00;
  let errorMessage = "";
  await findByIdBreakTimeAPI(arg).then(
    (success) => {
      result.breakTime = success;
    },
    (error) => {
      errors |= 0b01;
      errorMessage = error;
    },
  );
  await findAllScheduleAPI().then(
    (success) => {
      result.schedules = success;
    },
    (error) => {
      errors |= 0b10;
      errorMessage = error;
    },
  );
  return new Promise<BreakTimeSchedules>((success, error) => {
    if (errors === 0b00) {
      success(result);
    } else {
      error(errorMessage);
    }
  });
}

export async function findByIdAppointmentSchedulesAPI(
  arg: number,
): Promise<AppointmentSchedules> {
  const result = new AppointmentSchedules();
  let errors = 0b00;
  let errorMessage = "";
  await findByIdAppointmentAPI(arg).then(
    (success) => {
      result.appointment = success;
    },
    (error) => {
      errors |= 0b01;
      errorMessage = error;
    },
  );
  await findAllScheduleAPI().then(
    (success) => {
      result.schedules = success;
    },
    (error) => {
      errors |= 0b10;
      errorMessage = error;
    },
  );
  return new Promise<AppointmentSchedules>((success, error) => {
    if (errors === 0b00) {
      success(result);
    } else {
      error(errorMessage);
    }
  });
}
