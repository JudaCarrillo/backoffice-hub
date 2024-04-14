import React, { useState } from 'react';
import styled from 'styled-components';
import { InputComponent } from '../input';
import { ModalCompleto } from '../modalCompleto';
import { createProduct } from '../../../api/products'; 
import { getProducts } from '../../../api/usuarios'; 
import ComboBox from '../comboBox';

export function ModalProductos({ modalName, title, onReceiveRows }) { // Asegúrate de pasar onReceiveRows como prop
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: 0, 
    stock: 0, 
    description: '',
  });

  const toggleModal = () => setShowModal(!showModal);

  const handleCrearProduct = async () => {
    try {
      const data2 = {"name": product.name, "price": product.price, "stock": product.stock, "description": product.description};
      const response = await createProduct(data2);
      const { success, data, message } = response.data;
      if (success) {
        const rows = await getProducts();
        const data = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
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
                name="price"
                label="Precio"
                type="number"
                id="price"
                onChange={handleChange}
              />
              <InputComponent
                name="stock"
                label="Stock"
                type="number"
                id="stock"
                onChange={handleChange}
              />
              <InputComponent
                name="description"
                label="Descripción"
                type="text"
                id="description"
                onChange={handleChange}
              />
              <ComboBox
                name="id"
                label="ID"
                options={[
                  { value: '', label: 'Seleccionar' },
                  { value: 'option1', label: '1' },
                  { value: 'option2', label: '2' },
                  { value: 'option3', label: '3' }
                ]}
                onChange={handleChange}
              />
            </>
          )}
          onClose={toggleModal}
          onCreate={handleCrearProduct}
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
