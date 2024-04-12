import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonHead } from "../components/button";
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const eliminar = ({ message, onConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsModalOpen(false); 
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleDelete}>Eliminar</button>
      {isModalOpen && (
        <ModalOverlay onClick={handleCancel}>
          <ModalContent>
            <p>{message}</p>
            <ButtonContainer>
              <ButtonHead onClick={handleConfirm} name={'Aceptar'} buttonColor="#969593"/>
              <ButtonHead onClick={handleCancel} name={'Cancelar'} buttonColor="#969593"/>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default eliminar;
