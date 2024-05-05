import React, { useState } from "react";
import styled from "styled-components";
import { createCategory, getCategories } from "../../../services/categories";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";
import Img_input from "../../molecules/Img/img_input";
import LongText from "../../molecules/LongText/longText";

export function ModalCreateCategories({
  modalName,
  title,
  onReceiveRows,
  label,
}) {
  const [showModal, setShowModal] = useState(false);
  const [picture, setPicture] = useState(null);
  const [category, setCategories] = useState({
    name: "",
    description: "",
    picture: "",
  });

  const toggleModal = () => setShowModal(!showModal);

  const handleCrearCategory = async () => {
    try {
      const formData = new FormData();

      Object.keys(category).forEach((key) => {
        formData.append(key, category[key]);
      });

      if (picture) {
        formData.delete("picture");
        formData.append("picture", picture);
      }

      const response = await createCategory(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getCategories();
        const {
          data
        } = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear una categoría:", error);
    }
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setCategories({ ...category, [name]: value });
  }

  const handleImageChange = (event) => {
    setPicture(event.files[0]);
  };

  return (
    <Container>
      <button className="button_head" onClick={toggleModal}>
        {modalName}
      </button>
      {showModal && (
        <Modal
          label={label}
          onClose={toggleModal}
          onAction={handleCrearCategory}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="bg-slate-400 p-5">
              <FormColumn>
                <Field
                  name="name"
                  labelFor="name"
                  labelText="Nombre de la empresa:"
                  inputId="CompanyNameInput"
                  type="text"
                  value={category.name}
                  onChange={handleChange}
                  minLength={1}
                  maxLength={255}
                  isRequired={true}
                />
                <LongText
                  id="description"
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                  labelFor="description"
                  labelText="Descripción:"
                  placeholder="Descripción de la categoría..."
                  minLength={1}
                  maxLength={255}
                  isRequired={true}
                />
                <Img_input
                  name="photo"
                  id="photo"
                  onChange={handleImageChange}
                  accept="image/*"
                  chooseLabel="Seleccionar Archivo"
                  isRequired={true}
                />
              </FormColumn>
            </FormContainer>
          )}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  /* Estilos para el contenedor principal */
  height: 45px;
  width: 170px;

  .button_head {
    /* Estilos para el botón dentro del contenedor */
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) =>
      props.buttonColor || props.theme.bgbtton}; /* Color de fondo del botón */
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    font-size: 17px; /* Tamaño de la fuente */
    font-weight: 800; /* Peso de la fuente */
    color: ${(props) => props.theme.text}; /* Color del texto */
    box-shadow: 0.1rem 0.3rem #00000040; /* Sombra del botón */

    /* Efecto hover */
    &:hover {
      background: ${(props) =>
        props.theme.gray700}; /* Cambia el color de fondo al pasar el ratón */
      color: ${(props) =>
        props.theme.body}; /* Cambia el color del texto al pasar el ratón */
    }
  }
`;

const FormContainer = styled.div`
  /* Estilos para el contenedor del formulario */
  display: flex;
  gap: 25px; /* Espacio entre elementos hijos */
`;

const FormColumn = styled.div`
  /* Estilos para una columna dentro del formulario */
  display: flex;
  flex-direction: column; /* Orientación de los elementos: vertical */
`;
