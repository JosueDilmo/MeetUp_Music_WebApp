// 15:00 -> 900
// 15:00 -> ["15", "00"] -> 15 * 60 + 00 -> 900

export function convertHourStringToMinutes(hourString: string) {
  const [hour, minutes] = hourString.split(":").map(Number);
  return Number(hour) * 60 + Number(minutes);
}
