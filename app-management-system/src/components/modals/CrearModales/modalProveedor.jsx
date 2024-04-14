import React, { useState } from 'react';
import styled from 'styled-components';
import { InputComponent } from '../input';
import { ModalCompleto } from '../modalCompleto';
import { ComboBox } from '../comboBox'; 
import { createVendor } from '../../../api/vendors';
import { getVendors } from '../../../api/usuarios';

export function ModalProveedor({ modalName, title }) {
  const [showModal, setShowModal] = useState(false);

  
  const [vendors, setVendors] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const toggleModal = () => setShowModal(!showModal);

  const handleCrearVendors = async () => {
    try {
      const data2 = {"name": vendors.name, "email": vendors.email, "address": vendors.address, "phone": vendors.phone};
      const response = await createVendor(data2);
      const { success, data, message } = response.data;
      if (success) {
        const rows = await getVendors();
        const { data } = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      } 
    
    } catch (error) {
        console.error('Error al crear nuevo proveedor:', error);
    }
  };

  const handleChange = (e) => {
    setVendors({ ...vendors, [e.target.name]: e.target.value });
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
                id="nombre"
                onChange={handleChange}
              />
              <InputComponent
                name="email"
                label="E-mail"
                type="email"
                id="email"
                onChange={handleChange}
              />
              <InputComponent
                name="address"
                label="Dirección"
                type="text"
                id="direccion"
                onChange={handleChange}
              />
              <InputComponent
                name="phone"
                label="Teléfono"
                type="number"
                id="telefono"
                onChange={handleChange}
              />
            </>
          )}
          onClose={toggleModal}
          onCreate={handleCrearVendors}

        />
      )}
    </Container>
  );
}

export default ModalProveedor;

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
