const LANG = 'pt-BR';
const CURR = 'BRL';

export function getCentsFromStr(strValue) {
  let mArray = strValue.split(',');
  if (strValue.includes('.')) {
    mArray = strValue.split('.');
  }
  const cents = Number.parseInt(mArray[1]);
  const dolls = Number.parseInt(mArray[0]) * 100;
  const totalValue = cents + dolls;
  return totalValue;
}

export function getCurrencyFromCents(totalCents) {
  const cents = totalCents / 100;
  return cents.toLocaleString(LANG, { style: 'currency', currency: CURR });
}
