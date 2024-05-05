import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCategoriById,
  getCategories,
  updateCategory,
} from "../../../services/categories";
import { InputComponent } from "../input";
import { ModalParaUpdate } from "../modalparaUpdate";
export function UpdateModal({ open, onClose, categoryId, onReceiveRows }) {
  const [categori, setCategori] = useState({
    id:"",
    name: "",
    description: "",
    pictura:"",
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
          id: data.id,
          name: data.name,
          description: data.description,
          pictura: data.pictura,
        });
      } catch (error) {
        console.error("Error al obtener los detalles de la categoría:", error);
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
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setCategori({
      id: "",
      name: "",
      description: "",
      pictura: "",
    });
  };

  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
  };

  return (
    <Container>
      {open && categoryId && (
    <Modal
    label={label}
    onClose={handleClose}
    onAction={handleUpdate}
    title={title}
    showModalContent={(handleCloseModal) => (
      <FormContainer className="bg-slate-400 p-5">
      <FormColumn>
      <Field 
          name="CompanyName"
          labelFor="CompanyName" 
          labelText="Nombre de la empresa:" 
          inputId="CompanyNameInput" 
          type="text" 
		      value={vendors.company_name}
          onChange={handleChange}
        />
        <Field 
          name="ContactName"
          labelFor="ContactName" 
          labelText="Nombre de contacto:" 
          inputId="ContactNameInput" 
		      type="text" 
		      value={vendors.contact_title}
          onChange={handleChange}
        />
        <Field 
          name="ContactTitle"
          labelFor="ContactTitle" 
          labelText="Título de contacto:" 
          inputId="ContactTitleInput" 
		      type="text" 
		      value={vendors.contact_title}
          onChange={handleChange}
        />
        </FormColumn>
    </FormContainer>
        )}
      />
      
)}</Container>
  );
  
}

const ModalContainer = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
