export function timeToDate(time: string) {
  const [hour, minute, seconds] = time.split(':')
  return new Date(0, 0, 0, parseInt(hour), parseInt(minute), parseInt(seconds))
}
