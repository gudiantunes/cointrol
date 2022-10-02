import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from '../modal/modal';
import NewForm from '../newForm/newForm';
import ReactPortal from '../reactPortal/reactPortal';
import './footer.scss';

function Footer(props) {
  const [isAddNewOpen, setIsAddNewOpen] = useState(false);

  const handleModalClose = () => setIsAddNewOpen(false);

  return (
    <footer className='fixed main-footer'>
      <button className='open-form' onClick={() => setIsAddNewOpen(true)}>
        <FontAwesomeIcon icon={faPlus} />
        <span>Novo</span>
      </button>
      <ReactPortal
        children={
          <Modal
            isOpen={isAddNewOpen}
            handleClose={handleModalClose}
            modalText='Adicionar'
            children={
              <NewForm
                onSubmitCallback={() => {
                  setIsAddNewOpen(true);
                  props.formSubmitCallback();
                }}
              />
            }
          />
        }
        wrapperId='modal-root'
      />
    </footer>
  );
}

export default Footer;
