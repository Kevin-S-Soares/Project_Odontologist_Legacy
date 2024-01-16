export class SignIn {
  public email = "";
  public password = "";

  [key: string]: string;
}

export class SignUp {
  public email = "";
  public password = "";
  public confirmPassword = "";

  [key: string]: string;
}

export class ResetPassword {
  public token = "";
  public password = "";
  public confirmPassword = "";

  [key: string]: string;
}
