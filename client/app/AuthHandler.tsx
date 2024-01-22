import React, { ReactNode, useEffect, useState } from "react";

import { CookieHandler } from "./utilities/CookieHandler";
import { Role, Authentication, Authorization } from "./models/enums";

class State {
  authenticated: Authentication = Authentication.LOADING;
  authorized: Authorization = Authorization.LOADING;
}

interface IConstructor {
  roles: Role[];
  children?: ReactNode;
}

export const AuthHandler = (props: IConstructor): ReactNode => {
  const [state, setState] = useState(new State());

  useEffect(() => {
    const authenticated = CookieHandler.isAuthenticated()
      ? Authentication.AUTHENTICATED
      : Authentication.UNAUTHENTICATED;

    const role = CookieHandler.getRole();
    const roles = new Set<Role>(props.roles);
    const authorized = roles.has(role)
      ? Authorization.AUTHORIZED
      : Authorization.UNAUTHORIZED;

    setState({
      ...state,
      authenticated: authenticated,
      authorized: authorized,
    });
  }, []);

  if (state.authenticated === Authentication.LOADING) {
    return <></>;
  }

  if (state.authenticated === Authentication.UNAUTHENTICATED) {
    window.location.replace("/user/sign_in");
    return;
  }

  if (state.authenticated === Authentication.AUTHENTICATED) {
    if (state.authorized === Authorization.LOADING) {
      return <></>;
    }

    if (state.authorized === Authorization.UNAUTHORIZED) {
      window.location.replace("/errors?status=403");
      return;
    }

    if (state.authorized === Authorization.AUTHORIZED) {
      return props.children;
    }
  }
};
