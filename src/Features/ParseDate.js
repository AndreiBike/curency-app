export const todayDate = new Date();
export const prevWeekDate = new Date();
prevWeekDate.setDate(prevWeekDate.getDate() - 7);

export const MIN_DATE = "2016-07-01";
export const MAX_DATE = parseDate(todayDate);

export function parseDate(fullDate) {
  const fullYear = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();
  return `${fullYear}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;
}