import React, { useState } from 'react';
import styled from 'styled-components';
import { InputComponent } from '../input';
import { ModalCompleto } from '../modalCompleto';
import { createProduct } from '../../../api/products';
import { getProducts } from '../../../api/usuarios';

export function ModalProductos({ modalName, title }) {
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState({
      name: '',
      price: '',
      stock: '',
      description: '',
    });
    const [error, setError] = useState('');
  
    const toggleModal = () => setShowModal(!showModal);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };
  
    const handleCreateProduct = async () => {
      try {
        // Validar campos obligatorios
        if (!product.name || !product.price || !product.stock || !product.description ) {
          throw new Error('Todos los campos son obligatorios');
        }
  
        // Realizar solicitud para crear el producto
        const response = await createProduct(product);
        const { success, data, message } = response.data;
  
        if (success) {
          // Actualizar la lista de productos después de la creación exitosa
          const rows = await getProducts();
          const { data } = rows.data;
          setProduct({
            name: '',
            price: '',
            stock: '',
            description: '',
          });
          toggleModal();
        } else {
          throw new Error(message);
        }
      } catch (error) {
        setError(error.message);
      }
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
                  value={product.name}
                  onChange={handleChange}
                />
                <InputComponent
                  name="price"
                  label="Precio"
                  type="number"
                  id="price"
                  value={product.price}
                  onChange={handleChange}
                />
                <InputComponent
                  name="stock"
                  label="Stock"
                  type="number"
                  id="stock"
                  value={product.stock}
                  onChange={handleChange}
                />
                <InputComponent
                  name="description"
                  label="Descripción"
                  type="text"
                  id="description"
                  value={product.description}
                  onChange={handleChange}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </>
            )}
            onClose={toggleModal}
            onCreate={handleCreateProduct}
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