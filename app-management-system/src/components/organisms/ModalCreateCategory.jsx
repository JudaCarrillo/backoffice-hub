import React, { useState } from "react";
import Button from '../components/atoms/Button/button'
import TextAreaWithLabel from "../components/molecules/TextAreaWithLabel/textwithlabel";
import styled from "styled-components";
import Field from "../components/molecules/Field/field";
export function ModalCreateCategory() {
  const [categoryData, setCategoryData] = useState({
    CategoryID: '', //Autoincremento
    CategoryName: '',
    Description: '',
    PicturePath: '',
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes manejar la solicitud de acuerdo a tus necesidades
    console.log(categoryData);
  }

  const handleCancel = (e) => {
    // Aquí puedes agregar la lógica para cancelar la acción o restablecer el estado, por ejemplo:
    console.log('Se ha cancelado la acción');
  };

  return (
	<FormContainer>
      <FormColumn>
        <Field 
          name="CategoryName"
          labelFor="CategoryName" 
          labelText="Nombre de la empresa:" 
          inputId="CompanyNameInput" 
          type="text" 
		      value={categoryData.CategoryID}
          onChange={handleChange}
        />
      <TextAreaWithLabel
        id="description"
        name="description"
        value={categoryData.Description}
        onChange={handleChange}
        placeholder="Ingresa la descripción..."
        labelFor="description"
        labelText="Descripción:"
      />
      <Field 
        id="PicturePath"
        name="PicturePath"
        type="file"
        labelFor="PicturePath"
        labelText="Imagen:"
        accept=".jpeg, .jpg, .png" 
        value={categoryData.PicturePath}
        onChange={handleChange} 
      />
      <ContainerButton>
        <Button type="submit" onClick={handleCancel} variant="cancel">Cancelar</Button>
          <Button type="submit" onClick={handleSubmit}>Agregar</Button>
      </ContainerButton>
      </FormColumn> 
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerButton = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;