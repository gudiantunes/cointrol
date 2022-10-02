import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './modal.scss';
function Modal({ children, isOpen, handleClose, modalText }) {
  if (!isOpen) return null;

  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <header>
          <span className='modal__title'>{modalText}</span>
          <button className='modal__title__close' onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </header>
        <section className='modal__content'>{children}</section>
      </div>
    </div>
  );
}

export default Modal;
