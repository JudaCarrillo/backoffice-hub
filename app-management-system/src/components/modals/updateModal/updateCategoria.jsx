import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCategoriById,
  getCategories,
  updateCategory,
} from "../../../services/categories";
import Img_input from "../../molecules/Img/img_input";
import { Modal } from "../../modals/modal";
import Field from "../../molecules/Field/field";
import LongText from "../../molecules/LongText/longText";

export function UpdateCategoryModal({
  title,
  label,
  open, 
  onClose, 
  categoryId, 
  onReceiveRows 
}) {
  const [category, setCategory] = useState({
    id:"",
    name: "",
    description: "",
    picture:"",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getCategoriById(categoryId);
        const { success, data, message } = category.data;
        if (!success) {
          throw new Error(message);
        }
        setCategory({
          id: data.id,
          name: data.name,
          description: data.description,
          picture: data.picture,
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
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (event) => {
    setPicture(event.files[0]);
  };

  const handleUpdate = async () => {
    try {
      await updateCategory(categoryId, category);
      const rows = await getCategoriById();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setCategory({
      id: "",
      name: "",
      description: "",
      picture: "",
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
                  name="id"
                  labelFor="id"
                  labelText="Id de la categoria :"
                  inputId="Idcategory"
                  type="text"
                  value={category.name}
                  onChange={handleChange}
                />
                <Field
                  name="name"
                  labelFor="name"
                  labelText="Nombre de la empresa:"
                  inputId="CompanyNameInput"
                  type="text"
                  value={category.name}
                  onChange={handleChange}
                />
                </FormColumn>
                <FormColumn>
                <LongText
                  id="description"
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                  labelFor="description"
                  labelText="Descripción:"
                  placeholder="Descripción de la categoría..."
                />
                <Img_input
                  name="photo"
                  id="photo"
                  onChange={handleImageChange}
                  accept="image/*"
                  chooseLabel="Seleccionar Archivo"
                />
        </FormColumn>
    </FormContainer>
        )}
      />
      
)}</Container>
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

const FormContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
