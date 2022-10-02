import {
  faBrazilianRealSign,
  // eslint-disable-next-line no-unused-vars
  faMoon,
  faPlus,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Balance from '../../components/balance/balance';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import './home.scss';
import { cointrolDB } from '../../database/db';
import {
  getMonthEndString,
  getMonthStartString,
} from '../../utils/timaHendler/timeHandler';
import { useLiveQuery } from 'dexie-react-hooks';
import { getCurrencyFromCents } from '../../utils/moneyHandler/moneyHandler';

function Home(props) {
  const [sums, setSums] = useState([0, 0]);

  async function queryData() {
    const monthStart = getMonthStartString(8);
    const monthEnd = getMonthEndString(8);

    const data = await cointrolDB.transactions
      ?.where('date')
      .between(monthStart, monthEnd, true, true)
      .toArray();

    const inSum = data
      .filter((i) => i.type === 'income')
      .reduce((initial, item) => {
        return initial + item.value;
      }, 0);

    const outSum = data
      .filter((i) => i.type === 'outcome')
      .reduce((initial, item) => {
        return initial + item.value;
      }, 0);
    return [inSum, outSum];
  }

  function fetchData() {
    queryData().then((data) => {
      setSums(data);
    });
  }

  const walletList = useLiveQuery(() => cointrolDB.wallets.toArray());
  let walletsSum = 0;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='home'>
      <Header>
        <button>
          <FontAwesomeIcon icon={faBrazilianRealSign} />
        </button>
        <h1 id='home-title'>coin.trol</h1>
        <button>
          <FontAwesomeIcon icon={faSun} />
        </button>
      </Header>

      <section className='home__section balances'>
        <span className='home__section balances__title'>Resumo Mensal</span>
        <Link to='./transactions/'>
          {/* <Balance text='Receitas' value={sums[0]} colorVariant='positive' /> */}
          <Balance
            text='Balanço mensal'
            value={sums[0] - sums[1]}
            className='space_bottom'
          />
        </Link>
        <Link to='./transactions/income'>
          <Balance text='Receitas' value={sums[0]} colorVariant='positive' />
        </Link>
        <Link to='./transactions/outcome'>
          <Balance text='Despesas' value={sums[1]} colorVariant='negative' />
        </Link>
      </section>

      <Link className='home__section'>Plans (WIP)</Link>

      <section className='home__section wallet-list'>
        <div className='wallet-list__wallets'>
          {walletList?.map((wallet) => {
            walletsSum += wallet.value;
            return (
              <Link
                to={`./transactions/all/${wallet.name}`}
                className='wallet-list__wallets__wallet'
                key={wallet.id}
              >
                <span className='wallet-list__wallets__wallet__name'>
                  {wallet.displayName}
                </span>
                <span
                  className={`wallet-list__wallets__wallet__value ${
                    wallet.value < 0 ? 'negative' : 'positive'
                  }`}
                >
                  {getCurrencyFromCents(wallet.value)}
                </span>
              </Link>
            );
          })}
        </div>
        <div className='wallet-list__header'>
          <span className='wallet-list__header__title'>Carteiras:</span>
          {/* <Link to='./wallets' className='wallet-list__header__icon'>
            {'Todas ->'}
          </Link> */}
          <span>{getCurrencyFromCents(walletsSum)}</span>
        </div>
      </section>

      <Footer formSubmitCallback={() => fetchData()} />
    </section>
  );
}

export default Home;
