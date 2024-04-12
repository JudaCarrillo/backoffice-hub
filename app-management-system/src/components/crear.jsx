import React, { useState } from 'react';
import styled from 'styled-components';

export const CrearProducto = ({ isOpen, closeModal, onProductoCreado }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  const handleCrearProducto = () => {
    if (id && name && description && price && category && stock) {
      const producto = { id, name, description, price, category, stock };
      onProductoCreado(producto);
      closeModal();
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <h3>Nuevo producto</h3>
        <form>
          <Input
            label="ID"
            type="number"
            name="id"
            placeholder="Ingrese el ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            label="Nombre"
            type="text"
            name="name"
            placeholder="Ingrese el nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Descripción"
            type="textarea"
            name="description"
            placeholder="Ingrese la descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Precio"
            type="number"
            name="price"
            placeholder="Ingrese el precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            <option value="Tecnologías">Tecnologías</option>
            <option value="Moda">Moda</option>
            <option value="Hogar">Hogar</option>
            <option value="Salud">Salud</option>
            <option value="Alimentos">Alimentos</option>
          </select>
          <Input
            label="Stock"
            type="number"
            name="stock"
            placeholder="Ingrese la cantidad disponible"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
          <button type="button" onClick={handleCrearProducto}>
            Agregar
          </button>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export function Input({ label, type, name, placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
`;

export default CrearProducto;