import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DailyTransaction from '../../components/dailyTrasaction/dailyTransaction';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { cointrolDB } from '../../database/db';
import './singleWallet.scss';

function SingleWallet(props) {
  const walletName = useParams().walletName;
  const currentWallet = useLiveQuery(() =>
    cointrolDB.wallets.where('name').equals(walletName).first()
  );
  const allTransactions = useLiveQuery(() =>
    cointrolDB.transactions.where('wallet').equals(walletName).toArray()
  );

  return (
    <>
      <Header>
        <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>{currentWallet?.displayName}</h1>
      </Header>
      <div style={{ color: 'white' }} className='transaction-list'>
        {allTransactions?.map((i) => (
          <DailyTransaction dailyData={[{ ...i, displayDate:'sim' }]} key={i.id}/>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default SingleWallet;
