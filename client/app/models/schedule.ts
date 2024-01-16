export class Schedule {
  public id = 0;
  public odontologistId = 0;
  public name = "";
  public startDay = 0;
  public startTime = "";
  public endDay = 0;
  public endTime = "";

  [key: string]: number | string;
}
