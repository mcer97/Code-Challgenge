export function AddHours(dateObject: Date, hours: number): Date {
  const newDate = new Date(dateObject);
  newDate.setTime(dateObject.getTime() + hours * 60 * 60 * 1000);

  return newDate;
}
