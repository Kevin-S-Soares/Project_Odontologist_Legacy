import { Status } from "./enums";

export class Response<T> {
  public status: Status = Status.LOADING;
  public data: T | null = null;
  public errorMessage: string | null = null;
  private callBackFn: (arg: Response<T>) => void = (_) => {
    _;
  };

  public isWaiting(): void {
    this.status = Status.WAITING;
    this.data = null;
    this.errorMessage = null;
    this.callBackFn(this);
  }

  public isLoading(): void {
    this.status = Status.LOADING;
    this.data = null;
    this.errorMessage = null;
    this.callBackFn(this);
  }

  public isSuccessful(data: T): void {
    this.status = Status.SUCCESS;
    this.data = data;
    this.errorMessage = null;
    this.callBackFn(this);
  }

  public isUnsuccessful(errorMessage: string): void {
    this.status = Status.ERROR;
    this.errorMessage = errorMessage;
    this.data = null;
    this.callBackFn(this);
  }

  public callFunction(): void {
    this.callBackFn(this);
  }

  public setCallBackFunction(arg: (fn: Response<T>) => void): void {
    this.callBackFn = arg;
  }
}
