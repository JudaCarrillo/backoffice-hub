import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonHead } from "../components/button";

function CrearProducto({ onProductoCreado }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleCrearProducto = () => {
    // Aquí podrías realizar la validación de los campos del formulario
    // Por ejemplo, puedes verificar si todos los campos requeridos están completos.
    // Si los campos son válidos, puedes llamar a la función onProductoCreado para crear el producto.
    // Esto es solo un ejemplo de simulación de creación de producto:
    if (id && name && description && price && category && stock) {
      // Crear objeto de producto
      const producto = {
        id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
      };
      // Llamar a la función para notificar que se ha creado el producto
      onProductoCreado(producto);
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <div>
      <ButtonHead name={'Abrir Modal'} onClick={openModal} buttonColor="#969593"/>
      <ModalContainer isOpen={modalOpen}>
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
              <option value="" disabled>Seleccione una categoría</option>
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
              value={form.stock}
              onChange={handleChange}
            />
            <button type="button" onClick={event => { { handleCrearProducto; } }}>
              Cancelar
            </button>
            <button type="button" onClick={event => { { handleCrearProducto; } }}>
              Crear Producto
            </button>
          </form>
          
        </ModalContent>
      </ModalContainer>
    </div>
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
  display: ${props => props.isOpen ? 'block' : 'none'};
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default CrearProducto;
