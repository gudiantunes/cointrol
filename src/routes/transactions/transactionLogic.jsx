export function getTransactionSortedByDays(data) {
  const tmp = {};
  
  for (const item of data) {
    if (tmp[item.date.getDate()]) {
      tmp[item.date.getDate()].push(item);
    } else {
      tmp[item.date.getDate()] = [item];
    }
  }
  return tmp;
}
