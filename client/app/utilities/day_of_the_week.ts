export function getDayOfTheWeek(arg: number): string {
  const days = new Map<number, string>();
  days.set(0, "Sunday");
  days.set(1, "Monday");
  days.set(2, "Tuesday");
  days.set(3, "Wednesday");
  days.set(4, "Thursday");
  days.set(5, "Friday");
  days.set(6, "Saturday");
  return days.get(arg) ?? "";
}
