import { Schedule } from "../models/schedule";
import { CookieHandler } from "../utilities/CookieHandler";

export function addScheduleAPI(arg: Schedule): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "POST",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/schedule", options).then((response) => {
      if (response.status === 201) {
        success("Schedule created!");
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

export function findAllScheduleAPI(): Promise<Schedule[]> {
  return new Promise<Schedule[]>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch("/api/schedule", options).then((response) => {
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

export function findByIdScheduleAPI(arg: number): Promise<Schedule> {
  return new Promise<Schedule>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch(`/api/schedule/${arg}`, options).then((response) => {
      if (response.status === 200) {
        success(response.json());
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Schedule does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function editScheduleAPI(arg: Schedule): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "PUT",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/schedule", options).then((response) => {
      if (response.status === 200) {
        success("Schedule edited!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Schedule does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function removeScheduleAPI(arg: number): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "DELETE",
    };

    fetch(`/api/schedule?id=${arg}`, options).then((response) => {
      if (response.status === 200) {
        success("Schedule removed!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Schedule does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}
