// A function that returns a random date between two set dates
export function randomDate(
  start: Date,
  end: Date,
  startHour: number,
  endHour: number
) {
  // @ts-ignore
  var date = new Date(+start + Math.random() * (end - start));
  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
  date.setHours(hour);
  return date.toString();
}

export const timeString12hr = () =>
  new Date(
    '1970-01-01T' +
      randomDate(new Date(2020, 0, 1), new Date(), 0, 24).slice(16, 24) +
      'Z'
  ).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  });
