import React from "react";

export enum ScheduleOperation {
  BREAK_TIME,
  APPOINTMENT,
  AVAILABLE,
}

export type Interval = {
  start: number;
  length: number;
  details: string;
  operation: ScheduleOperation;
};

export enum Availability {
  NOT_AVAILABLE,
  AVAILABLE,
}

export enum RelativeMonth {
  ACTUAL,
  PREVIOUS,
  NEXT,
}

export class CalendarDay {
  day = 0;
  availability: Availability = Availability.NOT_AVAILABLE;
  relativeMonth: RelativeMonth = RelativeMonth.ACTUAL;
  details: JSX.Element = (<></>);
}

export class Calendar {
  static getFirstDayOfWeekOfTheMonth(month: number, year: number): number {
    return new Date(year, month, 1).getDay();
  }
  static getLastDayOfTheMonth(month: number, year: number): number {
    if (month < 0) {
      month = 11;
      year--;
    }
    let result = 0;
    switch (month) {
      case 0:
        result = 31;
        break;
      case 1:
        result = year % 4 === 0 && year % 100 !== 0 ? 29 : 28;
        break;
      case 2:
        result = 31;
        break;
      case 3:
        result = 30;
        break;
      case 4:
        result = 31;
        break;
      case 5:
        result = 30;
        break;
      case 6:
        result = 31;
        break;
      case 7:
        result = 31;
        break;
      case 8:
        result = 30;
        break;
      case 9:
        result = 31;
        break;
      case 10:
        result = 30;
        break;
      case 11:
        result = 31;
        break;
    }
    return result;
  }

  static getMonth(arg: number): string {
    let result = "";
    switch (arg) {
      case 0:
        result = "January";
        break;
      case 1:
        result = "February";
        break;
      case 2:
        result = "March";
        break;
      case 3:
        result = "April";
        break;
      case 4:
        result = "May";
        break;
      case 5:
        result = "June";
        break;
      case 6:
        result = "July";
        break;
      case 7:
        result = "August";
        break;
      case 8:
        result = "September";
        break;
      case 9:
        result = "October";
        break;
      case 10:
        result = "November";
        break;
      case 11:
        result = "December";
        break;
    }
    return result;
  }
}
