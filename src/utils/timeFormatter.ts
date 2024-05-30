export const formatTime = (date: Date): string => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const hours: string = String(date.getUTCHours()).padStart(2, "0");
  const minutes: string = String(date.getUTCMinutes()).padStart(2, "0");
  const time: string = `${dayOfWeek}, ${hours}:${minutes}`;

  return time;
};
