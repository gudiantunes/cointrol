import { cointrolDB } from '../../database/db';
import { getCentsFromStr } from '../../utils/moneyHandler/moneyHandler';

function useNewFormLogic(props) {
  async function addNew(data) {
    let newDesc = data.description;
    if (!newDesc) {
      newDesc = `${data.category} em ${data.wallet}`;
    }
    const valueInCents = getCentsFromStr(data.value);
    const cDate = new Date();
    const newDate = new Date(`${data.date}T00:00`);

    newDate.setHours(cDate.getHours());
    newDate.setMinutes(cDate.getMinutes());

    const oldWalletName = data.wallet;
    const newWalletName = data.wallet
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase();

    await cointrolDB.transactions.add({
      ...data,
      date: newDate,
      value: valueInCents,
      description: newDesc,
      wallet: newWalletName
    });

    const wallet = await cointrolDB.wallets
      .where('name')
      .equals(newWalletName)
      .modify((wallet) => {
        wallet.value += data.type === 'income' ? valueInCents : -valueInCents;
      })
      .catch((err) => console.log('Modify Error:', err));

    if (props.onSubmitCallback) {
      props.onSubmitCallback();
    }
  }
  function getCurrentDay() {
    let mZero = '';
    let dZero = '';
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) {
      mZero = '0';
    }
    if (day < 10) {
      dZero = '0';
    }
    return `${year}-${mZero}${month}-${dZero}${day}`;
  }

  return { addNew, getCurrentDay };
}

export default useNewFormLogic;
