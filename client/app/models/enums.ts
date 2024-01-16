export enum Status {
  LOADING,
  WAITING,
  ERROR,
  SUCCESS,
}

export enum Authentication {
  LOADING,
  UNAUTHENTICATED,
  AUTHENTICATED,
}

export enum Authorization {
  LOADING,
  UNAUTHORIZED,
  AUTHORIZED,
}

export enum Role {
  NONE = "",
  ATTENDANT = "Attendant",
  ODONTOLOGIST = "Odontologist",
  ADMIN = "Admin",
}
