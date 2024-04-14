import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputComponent } from '../input';
import { getCategoriById, updateCategory } from '../../../api/categories';
import { getCategories } from '../../../api/usuarios';
import { ModalParaUpdate } from '../modalparaUpdate';
export function UpdateModal({ open, onClose, categoryId, onReceiveRows }) {
    const [categori, setCategori] = useState({
      name: '',
      description: '',
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const category = await getCategoriById(categoryId);
          const { success, data, message } = category.data;
          if (!success) {
            throw new Error(message);
          }
          setCategori({
            name: data.name,
            description: data.description,
          });
        } catch (error) {
          console.error('Error al obtener los detalles de la categoría:', error);
        }
      };
  
      if (open && categoryId) {
        fetchData();
      }
    }, [open, categoryId]);
  
    const handleChange = (e) => {
      setCategori({
        ...categori,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleUpdate = async () => {
      try {
        await updateCategory(categoryId, categori);
        const rows = await getCategories();
        const {  data } = rows.data;
        onReceiveRows(data);
      } catch (error) {
        console.error('Error al actualizar la categoría:', error);
      }
    };
    const clearFormFields = () => {
      setCategori({
        name: '',
        description: '',
      });
    };

    const handleClose = () => {
        clearFormFields(); // Limpia los campos del formulario
        onClose(); // Cierra el modal
      };
    
  
    return (
      <ModalContainer open={open}>
        <ModalParaUpdate
          title="Actualizar Categoría"
          showModalContent={() => (
            <>
              <InputComponent
                name="name"
                label="Nombre"
                type="text"
                id="name"
                value={categori.name}
                onChange={handleChange}
              />
              <InputComponent
                name="description"
                label="Descripción"
                type="text"
                id="description"
                value={categori.description}
                onChange={handleChange}
              />
            </>
          )}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      </ModalContainer>
    );
  }
  
  const ModalContainer = styled.div`
    display: ${({ open }) => (open ? 'block' : 'none')};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  `;