export function getMonthStartString(month, year = new Date().getFullYear()) {
  return new Date(year, month, 1);
}

export function getMonthEndString(month, year = new Date().getFullYear()) {
  return new Date(year, month + 1, 0, 23, 59, 59);
}
export const monthList = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function cicleMonths(monthIdx) {
  let newMonth = monthIdx;
  let newYear = 0;
  if (newMonth < 0) {
    newMonth = 11;
    newYear = -1;
  } else if (newMonth > 11) {
    newMonth = 0;
    newYear = +1;
  }
  return [newMonth, newYear];
}