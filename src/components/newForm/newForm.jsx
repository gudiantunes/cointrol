import {
  faAdd,
  faArrowTrendDown,
  faArrowTrendUp,
  faBrazilianRealSign,
  faCalendarAlt,
  faCircle,
  faFileLines,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useNewFormLogic from './newFormLogic';
import './newForm.scss';
import CreateCategory from '../createCategory/createCategory';
import { useLiveQuery } from 'dexie-react-hooks';
import { cointrolDB } from '../../database/db';
import SelectWithDynamicOptions from '../selectWithDynamicOptions/selectWithDynamicOptions';

function NewForm(props) {
  const { register, handleSubmit, reset, submittedData, formState } = useForm();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [currentCategoryColor, setCurrentCategoryColor] = useState('#fff');
  const { addNew, getCurrentDay } = useNewFormLogic(props);
  const urlParam = useParams().transactionTypeFilter;
  const [currentType, setCurrentType] = useState(
    urlParam ? urlParam : 'income'
  );
  const valueVariant = currentType === 'income' ? 'positive' : 'negative';

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        value: '',
        description: '',
      });
    }
  }, [formState, submittedData, reset]);

  const allCategories = useLiveQuery(() => cointrolDB.categories.toArray());
  const allWallets = useLiveQuery(() => cointrolDB.wallets.toArray());

  function getCategoryColor(catName) {
    let catColor = '#fff';
    if (!allCategories) return catColor;
    for (const cat of allCategories) {
      if (cat.name === catName) {
        catColor = cat.color;
      }
    }
    return catColor;
  }

  return (
    <>
      <form className='add-new-form' onSubmit={(e) => e.preventDefault()}>
        <div className='ipt-wrapper value-ipt'>
          <div>
            <FontAwesomeIcon
              icon={faBrazilianRealSign}
              className={`value-ipt__icon ${valueVariant}`}
            />
            <input
              className={`value-ipt__input ${valueVariant}`}
              inputMode='numeric'
              type='text'
              step={0.01}
              placeholder={'0,00'}
              pattern={'[0-9]{1,}[,-.][0-9]{2}'}
              autoComplete='off'
              {...register('value', { required: true })}
            />
          </div>
          <div className='value-ipt__checkbox'>
            <input
              type='checkbox'
              id='is-paid'
              {...register('isPaid')}
              defaultChecked='true'
            />
            <label htmlFor='is-paid'>Pago</label>
          </div>
        </div>
        <div className='ipt-wrapper description-ipt'>
          <FontAwesomeIcon icon={faFileLines} />
          <input
            type='text'
            placeholder='Descrição'
            autoComplete='off'
            {...register('description')}
          />
        </div>
        <div className='ipt-wrapper type-ipt'>
          <FontAwesomeIcon
            icon={currentType === 'income' ? faArrowTrendUp : faArrowTrendDown}
            style={
              currentType === 'income' ? { color: 'green' } : { color: 'red' }
            }
          />
          <select
            className='type-select'
            {...register('type')}
            onChange={(e) => {
              setCurrentType(e.target.value);
              // setCurrentCategoryColor(getCategoryColor(e.target.value));
            }}
            defaultValue={currentType === 'income' ? 'income' : 'outcome'}
          >
            <option value='income'>Receita</option>
            <option value='outcome'>Despesa</option>
          </select>
        </div>
        <div className='ipt-wrapper category-ipt'>
          <FontAwesomeIcon
            icon={faCircle}
            className='icon'
            style={{ color: getCategoryColor(currentCategoryColor) }}
          />
          <SelectWithDynamicOptions
            allOptions={allCategories}
            onOptionFilter={(item) => item.type === currentType}
            onFormRegister={() => register('category', { required: true })}
            handleChange={(e) => {
              setCurrentCategoryColor(e.target.value);
            }}
            firstOption = {()=><option value={''}>{'Sem Categoria'}</option>}
            onOptionLoad={(i, idx) => (
              <option key={idx} value={i.name}>
                {i.name}
              </option>
            )}
          />
          <button>
            <FontAwesomeIcon
              icon={faAdd}
              className='icon'
              onClick={(e) => {
                setShowAddCategory(true);
              }}
            />
          </button>
        </div>
        <div className='ipt-wrapper wallet-ipt'>
          <FontAwesomeIcon icon={faWallet} className='wallet-ipt__icon' />
          <SelectWithDynamicOptions
            allOptions={allWallets}
            onFormRegister={() => register('wallet', { required: true })}
            firstOption = {()=><option value={'Sem Carteira'}>{'Sem Carteira'}</option>}
            onOptionLoad={(i, idx) => (
              <option key={idx} value={i.name}>
                {i.name}
              </option>
            )}
          />
        </div>
        <div className='ipt-wrapper date-ipt'>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <input
            className='date-ipt__date'
            type='date'
            defaultValue={getCurrentDay()}
            {...register('date', { required: true })}
          />
          <div className='date-ipt__checkbox'>
            <input type='checkbox' id='is-paid' {...register('repeat')} />
            <label htmlFor='is-paid'>Mensal(WIP)</label>
          </div>
        </div>
        <input
          type='submit'
          value='Adicionar'
          className='submit-btn'
          onClick={handleSubmit(addNew, (err) => console.log('error', err))}
        />
      </form>
      <div className='add-category-wrapper'>
        {showAddCategory && (
          <CreateCategory
            onClose={() => setShowAddCategory(false)}
            catType={currentType}
          />
        )}
      </div>
    </>
  );
}

export default NewForm;
