import { Appointment } from "./appointment";
import { BreakTime } from "./break_time";
import { Odontologist } from "./odontologist";
import { Schedule } from "./schedule";

export class ScheduleOdontologists {
  public schedule: Schedule = new Schedule();
  public odontologists: Odontologist[] = [];
}

export class BreakTimeSchedules {
  public breakTime: BreakTime = new BreakTime();
  public schedules: Schedule[] = [];
}

export class AppointmentSchedules {
  public appointment: Appointment = new Appointment();
  public schedules: Schedule[] = [];
}
