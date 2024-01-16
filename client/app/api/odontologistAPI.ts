import { Odontologist } from "../models/odontologist";
import { CookieHandler } from "../utilities/CookieHandler";

export function addOdontologistAPI(arg: Odontologist): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "POST",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/odontologist", options).then((response) => {
      if (response.status === 201) {
        success("Odontologist created!");
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

export function findAllOdontologistAPI(): Promise<Odontologist[]> {
  return new Promise<Odontologist[]>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch("/api/odontologist", options).then((response) => {
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

export function findByIdOdontologistAPI(arg: number): Promise<Odontologist> {
  return new Promise<Odontologist>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "GET",
    };

    fetch(`/api/odontologist/${arg}`, options).then((response) => {
      if (response.status === 200) {
        success(response.json());
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Odontologist does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function editOdontologistAPI(arg: Odontologist): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      method: "PUT",
      headers: CookieHandler.getAuthorizedHeader(),
      body: JSON.stringify(arg),
    };

    fetch("/api/odontologist", options).then((response) => {
      if (response.status === 200) {
        success("Odontologist edited!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Odontologist does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function removeOdontologistAPI(arg: number): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: CookieHandler.getAuthorizedHeader(),
      method: "DELETE",
    };

    fetch(`/api/odontologist?id=${arg}`, options).then((response) => {
      if (response.status === 200) {
        success("Odontologist removed!");
      } else {
        if (response.status === 401) {
          error(new Error("Not authenticated!"));
        } else if (response.status === 403) {
          error(new Error("Not authorized!"));
        } else if (response.status === 404) {
          error(new Error("Odontologist does not exist!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}
