import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import { cointrolDB } from '../../database/db';

function Wallets(props) {
  const { register, handleSubmit } = useForm();
  const URLparams = useParams();
  const walletFilter = URLparams.walletName;
  async function createWallet(formData) {
    const newName = formData.displayName
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();
    const data = { ...formData, name: newName, color: '#ffffff', value: 0 };
    await cointrolDB.wallets.add(data);
  }
  const walletList = useLiveQuery(() => {
    console.log(walletFilter);
    return !walletFilter
      ? cointrolDB.wallets.toArray()
      : cointrolDB.wallets.where('name').equals(walletFilter).toArray();
  });
  return (
    <>
      <Header>
        <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h1>Carteiras</h1>
      </Header>
      <main className='wallet-list'>
        {walletList?.map((wallet) => (
          <Link
            to={`./${wallet.name}`}
            key={wallet.id}
          >
            {wallet.displayName}
          </Link>
        ))}
      </main>
      <footer className='fixed wallet-list-footer'>
        <form onSubmit={(e) => e.preventDefault()}>
          <span>Nova Carteira:</span>
          <input
            type='text'
            placeholder='name'
            {...register('displayName', { required: 'true' })}
          />
          <button onClick={handleSubmit(createWallet)}>Adicionar</button>
        </form>
      </footer>
    </>
  );
}

export default Wallets;
