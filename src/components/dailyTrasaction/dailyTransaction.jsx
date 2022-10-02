import {
  faArrowTrendDown,
  faArrowTrendUp,
  faCalendarAlt,
  faCircle,
  faClock,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { useParams } from 'react-router-dom';
import { cointrolDB } from '../../database/db';
import { getCurrencyFromCents } from '../../utils/moneyHandler/moneyHandler';
import './dailyTransaction.scss';

function DailyTransaction({ dailyData, categoryList }) {
  let isIncome = useParams().transactionTypeFilter === 'income';
  const categories = useLiveQuery(() => cointrolDB.categories.toArray());
  const wallets = useLiveQuery(() => cointrolDB.wallets.toArray());

  function getCatColor(name) {
    let color = '#000';
    if (!categories) return color;
    for (const cat of categories) {
      if (cat.name === name) {
        color = cat.color;
      }
    }
    return color;
  }
  function getWalletName(name) {
    let wName = name;
    if (!wallets) return wName;
    for (const wallet of wallets) {
      if (wallet.name === name) {
        wName = wallet.displayName;
      }
    }
    return wName;
  }

  return dailyData.map((item) => {
    isIncome = item.type === 'income';
    const categoryColor = getCatColor(item.category);
    return (
      <article className='transaction' key={item.id}>
        <div className='transaction__icon'>
          <FontAwesomeIcon
            icon={isIncome ? faArrowTrendUp : faArrowTrendDown}
            style={{
              color: isIncome ? 'var(--income-color)' : 'var(--outcome-color)',
            }}
          />
        </div>
        <p className='transaction__description'>{item.description}</p>
        <span
          className={`transaction__value ${isIncome ? 'positive' : 'negative'}`}
        >
          {getCurrencyFromCents(item.value)}
        </span>
        <div className='transaction__details'>
          <p className='transaction__details__detail category'>
            <FontAwesomeIcon icon={faCircle} style={{ color: categoryColor }} />
            {item.category}
          </p>
          <p className='transaction__details__detail wallet'>
            <FontAwesomeIcon icon={faWallet} />
            {getWalletName(item.wallet)}
          </p>

          {item.displayDate && (
            <p className='transaction__details__detail wallet'>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {item.date.getDate()}/{item.date.getMonth() + 1}/
              {item.date.getFullYear()}
            </p>
          )}
          <p className='transaction__details__detail time'>
            <FontAwesomeIcon icon={faClock} />
            {item.date.getHours()}:{item.date.getMinutes()}
          </p>
        </div>
      </article>
    );
  });
}

export default DailyTransaction;
