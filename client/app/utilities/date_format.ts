export function getDate(date: Date) {
  return (
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
    "/" +
    (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth()) +
    "/" +
    date.getFullYear()
  );
}

export function getTime(date: Date) {
  return (
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":" +
    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
  );
}

export function getDateTime(date: Date) {
  return getDate(date) + " " + getTime(date);
}
