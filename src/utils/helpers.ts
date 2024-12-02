export function getYearFromUTCString(utcString: string) {
  const date = new Date(utcString)
  return date.getUTCFullYear()
}
