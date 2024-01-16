import React, { FormEvent } from "react";
import { IBehavior, PatientView } from "./patient-view";

export const PatientHandler = (props: {

    start: string;
    end: string;
    scheduleId: number;

    patient: string
    setPatient: (arg: string) => void;

    description: string,
    setDescription: (arg: string) => void
}) => {


    const behavior: IBehavior = {
        setPatient: (arg: FormEvent<HTMLInputElement>): void => {
            const value = arg.currentTarget.value;
            props.setPatient(value);
        },
        setDescription: (arg: FormEvent<HTMLInputElement>): void => {
            const value = arg.currentTarget.value;
            props.setDescription(value);
        },
        submitAppointment: (): void => {
            console.log({
                id: 0,
                scheduleId: props.scheduleId,
                end: props.end,
                start: props.start,
                patient: props.patient,
                description: props.description
            });
        }
    };

    return <PatientView behavior={behavior}/>;
};