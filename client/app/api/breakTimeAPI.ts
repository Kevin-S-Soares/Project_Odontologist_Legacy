import { BreakTime } from "../models/break_time";
import { CookieHandler } from "../utilities/CookieHandler";

export function addBreakTimeAPI(arg: BreakTime): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "POST",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/break_time", options).then((response) => {
      if (response.status === 201) {
        success("Break Time created!");
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

export function findAllBreakTimeAPI(): Promise<BreakTime[]> {
  return new Promise<BreakTime[]>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch("/api/break_time", options).then((response) => {
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

export function findByIdBreakTimeAPI(arg: number): Promise<BreakTime> {
  return new Promise<BreakTime>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch(`/api/break_time/${arg}`, options).then((response) => {
      if (response.status === 200) {
        success(response.json());
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Break Time does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function editBreakTimeAPI(arg: BreakTime): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "PUT",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/break_time", options).then((response) => {
      if (response.status === 200) {
        success("Break Time edited!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Break Time does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function removeBreakTimeAPI(arg: number): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "DELETE",
    };

    fetch(`/api/break_time?id=${arg}`, options).then((response) => {
      if (response.status === 200) {
        success("Break Time removed!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Break Time does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}
