export class Time {
  private hours;
  private minutes;

  public getHours(): number {
    return this.hours;
  }

  public getMinutes(): number {
    return this.minutes;
  }

  constructor(hours: number, minutes: number) {
    if (hours < 0) {
      throw new Error("negative numbers are not allowed");
    }
    if (minutes < 0) {
      throw new Error("negative numbers are not allowed");
    }

    if (minutes > 59) {
      while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      }
    }

    this.hours = hours;
    this.minutes = minutes;
  }

  public static getTimefromString(arg: string): Time {
    const expression = /([0-9]?[0-9][0-9]):([0-5][0-9]):([0-5][0-9])/;
    const match = arg.match(expression);
    let hours: number;
    let minutes: number;
    if (match !== null) {
      hours = parseInt(match[1]);
      minutes = parseInt(match[2]);
    } else {
      hours = 0;
      minutes = 0;
    }

    return new Time(hours, minutes);
  }

  public static getTimefromDate(arg: Date): Time {
    const hours = arg.getHours() * arg.getDay();
    const minutes = arg.getMinutes();

    return new Time(hours, minutes);
  }

  public add(arg: Time): Time {
    let hours = this.hours + arg.getHours();
    let minutes = this.minutes + arg.getMinutes();

    [hours, minutes] =
      minutes > 59 ? [hours + 1, minutes - 60] : [hours, minutes];

    return new Time(hours, minutes);
  }

  public subtract(arg: Time): Time {
    let hours = this.hours - arg.getHours();
    let minutes = this.minutes - arg.getMinutes();

    [hours, minutes] =
      minutes < 0 ? [hours - 1, minutes + 60] : [hours, minutes];

    return new Time(hours, minutes);
  }

  public addMinutes(arg: number): Time {
    arg = Math.round(arg);
    let aux = this.minutes + arg;
    let increment = 0;
    let condition = true;
    while(condition){
      if(aux > 59){
        increment++;
        aux -= 60;
        condition = true;
      }
      else{
        condition = false;
      }
    }
    return new Time(this.hours + increment, aux);
  }

  public getTotalMinutes(): number {
    return this.getHours() * 60 + this.getMinutes();
  }

  public toString(): string {
    return String(this.hours).padStart(2, "0") + ":" + String(this.minutes).padStart(2, "0");
  }
}
