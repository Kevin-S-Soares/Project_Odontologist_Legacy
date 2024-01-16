export class Appointment {
  public id = 0;
  public scheduleId = 0;
  public start = "";
  public end = "";
  public patientName = "";
  public description = "";

  [key: string]: number | string;
}
