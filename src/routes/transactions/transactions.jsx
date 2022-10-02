import {
  faArrowLeft,
  faArrowRight,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DailyTransaction from '../../components/dailyTrasaction/dailyTransaction';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { cointrolDB } from '../../database/db';
import {
  cicleMonths,
  getMonthEndString,
  getMonthStartString,
  monthList,
} from '../../utils/timaHendler/timeHandler';
import { getTransactionSortedByDays } from './transactionLogic';
import './transactions.scss';

function Transactions(props) {
  const URLparams = useParams();
  const transactionType = URLparams.transactionTypeFilter
    ? URLparams.transactionTypeFilter
    : 'all';
  const walletFilter = URLparams.walletFilter;

  const [allTransactions, setAllTransactions] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const currentYear = useRef(new Date().getFullYear());

  async function queryData() {
    const monthStart = getMonthStartString(currentMonth, currentYear.current);
    const monthEnd = getMonthEndString(currentMonth, currentYear.current);

    const data = await cointrolDB.transactions
      .where('date')
      .between(monthStart, monthEnd, true, true);

    if (walletFilter) {
      return data?.filter((i) => i.wallet === walletFilter).toArray();
    }

    return data
      ?.filter((item) =>
        transactionType === 'all' ? true : item.type === transactionType
      )
      .toArray();
  }

  const fetchData = () => queryData().then((data) => setAllTransactions(data));

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth]);

  const itemObject = getTransactionSortedByDays(allTransactions);

  const changeMonth = (m) => {
    const [newMont, newYeah] = cicleMonths(m);
    currentYear.current += newYeah;
    setCurrentMonth(newMont);
  };

  const walletName = useLiveQuery(() =>
    cointrolDB.wallets.where('name').equals(walletFilter||'').first()
  );

  return (
    <div className='transactions'>
      <Header>
        <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1 id='transaction-title'>
          {{ income: 'receitas', outcome: 'despesas' }[transactionType] ||
            walletName?.displayName ||
            props.defaultTitle}
        </h1>
        <button>
          <FontAwesomeIcon icon={faFilter} />
        </button>
      </Header>
      <section className='month-select'>
        <button onClick={() => changeMonth(currentMonth - 1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span>
          {monthList[currentMonth]} - {currentYear.current}
        </span>
        <button onClick={() => changeMonth(currentMonth + 1)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </section>
      <section className='transaction-list'>
        {Object.keys(itemObject).map((transaction, idx) => {
          return (
            <article className='transaction-list__daily-view' key={idx}>
              <DailyTransaction dailyData={itemObject[transaction]} />
              <span className='transaction-list__daily-view__title'>
                {transaction}, {monthList[currentMonth]}, {currentYear.current}
              </span>
            </article>
          );
        })}
      </section>
      <Footer formSubmitCallback={() => fetchData()} />
    </div>
  );
}

export default Transactions;
