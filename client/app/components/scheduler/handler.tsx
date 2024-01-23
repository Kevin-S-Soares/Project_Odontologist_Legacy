/*
"use client";

import React, { useEffect, useState } from "react";
import { IBehavior, View } from "./view";
import { findAllOdontologistAPI } from "@/app/api/odontologistAPI";
import { Response } from "@/app/models/response";
import { Odontologist } from "@/app/models/odontologist";
import { CalendarDay } from "./entities";

export const Handler = () => {
  const [fetchResponse, setFetchResponse] = useState(
    new Response<Odontologist[]>(),
  );
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [patient, setPatient] = useState("");
  const [description, setDescrition] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("end");
  const [scheduleId, setScheduleId] = useState(0);

  useEffect(() => {
    const response: Response<Odontologist[]> = new Response();
    response.setCallBackFunction((item) => {
      setFetchResponse(item);
    });
    findAllOdontologistAPI().then(
      (success) => response.isSuccessful(success),
      (error) => response.isUnsuccessful(error.message),
    );
  }, []);

  const behavior: IBehavior = {
    selectDay: (arg: CalendarDay) => {
      setSelectedDay(arg);
    },
    setPatient: (arg: string): void => {
      setPatient(arg);
    },
    setDescription: (arg: string): void => {
      setDescrition(arg);
    },
    setStart: (arg: string): void => {
      setStart(arg);
    },
    setEnd: (arg: string): void => {
      setEnd(arg);
    },
    setScheduleId: (arg: number): void => {
      setScheduleId(arg);
    },
  };

  return (
    <View
      start={start}
      end={end}
      scheduleId={scheduleId}
      patient={patient}
      description={description}
      fetchResponse={fetchResponse}
      selectedDay={selectedDay}
      behavior={behavior}
    />
  );
};
*/