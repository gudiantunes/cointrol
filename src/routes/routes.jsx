import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './home/home';
import SingleWallet from './singleWallet/singleWallet';
import Transactions from './transactions/transactions';
import Wallets from './wallets/wallets';

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' exact />
        <Route element={<Transactions defaultTitle='Transactions' />} path='/transactions' />
        <Route
          element={<Transactions />}
          path='/transactions/:transactionTypeFilter'
        />
        <Route
          element={<Transactions />}
          path='/transactions/:transactionTypeFilter/:walletFilter'
        />
        <Route element={<Wallets />} path='/wallets' />
        <Route element={<SingleWallet />} path='/wallets/:walletName' />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
