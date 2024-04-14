import styled from 'styled-components';
import React, { useState } from 'react';
import { InputComponent } from '../input';
import { ModalCompleto } from '../modalCompleto';
import { createCategory } from '../../../api/categories';
import { getCategories } from '../../../api/usuarios';

export function ProductsModal({ modalName, title , onReceiveRows }) {
  const [showModal, setShowModal] = useState(false);
  const [categori, setCategori] = useState({
    name: '',
    description: '',
  });
  
  const toggleModal = () => setShowModal(!showModal);

  const handleCrear = async () => {
    try {
      const data2 = {"name": categori.name, "description": categori.description};
      const response = await createCategory(data2);
      const { success, data, message } = response.data;
      if (success) {
        const rows = await getCategories();
        const {  data } = rows.data;
        onReceiveRows(data);
        toggleModal(); // Cierra el modal después de la creación exitosa
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error al crear la categoría:', error);
    }
  };

  const handleChange = (e) => {
    setCategori({ ...categori, [e.target.name]: e.target.value });
  };
  

  return (
    <Container>
      <button className="button_head" onClick={toggleModal}>{modalName}</button>
      {showModal && (
        <ModalCompleto
          title={title}
          showModalContent={(handleCloseModal) => (
            <>
              <InputComponent
                name="name"
                label="Nombre"
                type="text"
                id="name"
                onChange={handleChange}
              />
              <InputComponent
                name="description"
                label="Descripción"
                type="text"
                id="description"
                onChange={handleChange}
              />
              
            </>
          )}
          onClose={toggleModal}
          onCreate={handleCrear}
        />
      )}
    </Container>
  );
}


const Container = styled.div`
height: 45px;
width: 170px;
    .button_head {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${(props) => props.buttonColor || props.theme.bgbtton};
        cursor: pointer;
        border: none;
        border-radius: 1rem;
        font-size: 17px;
        font-weight: 800;
        color: ${(props) => props.theme.text};
        box-shadow: 0.1rem 0.3rem #00000040;
        &:hover {
            background: ${(props) => props.theme.gray700};
            color: ${(props) => props.theme.body};
        }
    }
 
`;
