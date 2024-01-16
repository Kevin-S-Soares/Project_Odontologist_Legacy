import { Appointment } from "../models/appointment";
import { CookieHandler } from "../utilities/CookieHandler";

export function addAppointmentAPI(arg: Appointment): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "POST",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/appointment", options).then((response) => {
      if (response.status === 201) {
        success("Appointment created!");
      } else {
        error(new Error("Something went wrong!"));
      }
    });
  });
}

export function findAllAppointmentAPI(): Promise<Appointment[]> {
  return new Promise<Appointment[]>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch("/api/appointment", options).then((response) => {
      if (response.status === 200) {
        success(response.json());
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function findByIdAppointmentAPI(arg: number): Promise<Appointment> {
  return new Promise<Appointment>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch(`/api/appointment/${arg}`, options).then((response) => {
      if (response.status === 200) {
        success(response.json());
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Appointment does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function editAppointmentAPI(arg: Appointment): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "PUT",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/appointment", options).then((response) => {
      if (response.status === 200) {
        success("Appointment edited!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Appointment does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function removeAppointmentAPI(arg: number): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "DELETE",
    };

    fetch(`/api/appointment?id=${arg}`, options).then((response) => {
      if (response.status === 200) {
        success("Appointment removed!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Appointment does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}
