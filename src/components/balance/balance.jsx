import React from 'react';
import { getCurrencyFromCents } from '../../utils/moneyHandler/moneyHandler';
import './balance.scss';
function Balance({ text = 'Placeholder', value = 0, colorVariant=''}) {
  const otherVariant = value >= 0 ? 'positive' : 'negative';
  return (
    <article className='balance'>
      <span className='balance__text'>{text}</span>
      <span className={`balance__value ${otherVariant} ${colorVariant}`}>{getCurrencyFromCents(value)}</span>
    </article>
  );
}

export default Balance;
