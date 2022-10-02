import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { cointrolDB } from '../../database/db';
import { colorCodes } from '../../utils/colordata/colordata';
import './createCategory.scss';

function CreateCategory({ onClose, catType }) {
  const { register, handleSubmit } = useForm();
  const [selectedColor, setSelectedColor] = useState('#ff0000');

  const handleSelectColor = (e) => {
    setSelectedColor(e.target.id);
  };

  async function onSubmit(data) {
    const newData = { ...data, color: selectedColor, type: catType };
    try {
      await cointrolDB.categories.add(newData);
      onClose();
    } catch {alert(`Categora ${newData.name} já existe`)}
  }

  return (
    <div className='nc-wrapper'>
      <form className='new-category' onSubmit={(e) => e.preventDefault()}>
        <div className='new-category__header'>
          <label>Nova Categoria</label>
          <input
            type='text'
            className='new-category__name'
            placeholder='Nome'
            {...register('name', { required: 'true' })}
          />
        </div>
        <div className='new-category__colors'>
          {/* <input
            type='color'
            id='color-picker'
            defaultValue={selectedColor}
            ref={colorRef}
            {...register('color', { required: 'true' })}
          /> */}
          {colorCodes.map((color, idx) => {
            return (
              <button
                className='new-category__colors__color'
                style={{ backgroundColor: color }}
                key={color}
                onClick={handleSelectColor}
                id={color}
              >
                {selectedColor === color && <FontAwesomeIcon icon={faCheck} />}
              </button>
            );
          })}
        </div>
        <div className='new-category__footer'>
          <button onClick={onClose}>Cancelar</button>
          <input type='submit' value='OK' onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
