export default function getSemester() {
  const month = new Date().getMonth()
  if (month > 1 || month < 7) {
    return '2'
  }
  return '1'
}
