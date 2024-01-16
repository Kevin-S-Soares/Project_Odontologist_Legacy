"use client";

import { Role } from "../models/enums";

export class CookieHandler {
  static getAuthorizationCookie(): string {
    const expression = "bearer\\s[A-z0-9\\.\\-\\_]+";
    const match = document.cookie.match(expression);
    if (match === null) {
      return "";
    }
    return match[0];
  }

  static getAuthorizedHeader(): Headers {
    return new Headers({
      "Content-Type": "application/json",
      Authorization: this.getAuthorizationCookie(),
    });
  }

  static setAuthorizationCookie(token: string) {
    const today = new Date();
    const nextMonth = new Date(
      today.getFullYear(),
      // today.getMonth() + 1, today.getDate()).toUTCString();
      today.getMonth(),
      today.getDate() + 1,
    ).toUTCString();
    document.cookie =
      "authorization=bearer " + token + "; expires=" + nextMonth + "; path=/";
  }

  static isAuthenticated(): boolean {
    return CookieHandler.getAuthorizationCookie() !== "";
  }

  static getRole(): Role {
    if (!this.isAuthenticated()) {
      return Role.NONE;
    }
    const token = this.getAuthorizationCookie();
    const object = JSON.parse(window.atob(token.split(".")[1]));
    const result =
      object["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    return result;
  }

  static getId(): number {
    if (!this.isAuthenticated()) {
      return -1;
    }
    const token = this.getAuthorizationCookie();
    const object = JSON.parse(window.atob(token.split(".")[1]));
    const result = parseInt(
      object["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid"],
    );
    return result;
  }
}
