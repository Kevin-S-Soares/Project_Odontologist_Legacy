import { ResetPassword, SignIn, SignUp } from "../models/user";

export function signInAPI(arg: SignIn): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arg),
      method: "POST",
    };

    fetch("/api/user/sign_in", options).then((response) => {
      if (response.status === 200) {
        success(response.text());
      } else {
        if (response.status === 401) {
          error(new Error("Invalid email or password!"));
        } else if (response.status === 409) {
          error(new Error("Email is not verified!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function signUpAPI(arg: SignUp): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: arg.email,
        password: arg.password,
      }),
      method: "POST",
    };

    fetch("/api/user/sign_up", options).then((response) => {
      if (response.status === 201) {
        success("User successfully created!");
      } else {
        if (response.status === 400) {
          error(new Error("Invalid email or password!"));
        } else if (response.status === 409) {
          error(new Error("User already exists!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}

export function forgetPasswordAPI(arg: string): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
    };

    fetch(`/api/user/forget_password?email=${arg}`, options).then(
      (response) => {
        if (response.status === 200) {
          success("Verify your email!");
        } else {
          error(new Error("Something went wrong!"));
        }
      },
    );
  });
}

export function resetPasswordAPI(arg: ResetPassword): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        token: arg.token,
        password: arg.password,
      }),
      method: "POST",
    };

    fetch("/api/user/reset_password", options).then((response) => {
      if (response.status === 200) {
        success("Password reseted successfully!");
      } else {
        error(new Error("Something went wrong!"));
      }
    });
  });
}

export function verifyTokenAPI(arg: string): Promise<string> {
  return new Promise<string>((success, error) => {
    const options: RequestInit = {
      headers: { "content-type": "application/json" },
      method: "POST",
    };

    fetch(`/api/user/verify?token=${arg}`, options).then((response) => {
      if (response.status === 200) {
        success("Email verified!");
      } else {
        if (response.status === 400) {
          error(new Error("Invalid token!"));
        } else {
          error(new Error("Something went wrong!"));
        }
      }
    });
  });
}
