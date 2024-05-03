import React, { useState } from "react";
import styled from "styled-components"
import Field from "../components/molecules/Field/field";
import Button from '../components/atoms/Button/button'
import TextAreaWithLabel from "../components/molecules/TextAreaWithLabel/textwithlabel";

export function CreateSuppliers() {
  const [supplierData, setSupplierData] = useState({
    SupplierID: '', // Si es un autoincremento, déjalo vacío
    CompanyName: '',
    ContactName: '',
    ContactTitle: '',
    Address: '',
    City: '',
    Region: '',
    PostalCode: '',
    Country: '',
    Phone: '',
    Fax: '',
    HomePage: '',
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes manejar la solicitud de acuerdo a tus necesidades
    console.log(supplierData);
  }

  const handleCancel = (e) => {
    // Aquí puedes agregar la lógica para cancelar la acción o restablecer el estado, por ejemplo:
    console.log('Se ha cancelado la acción');
  };

  return (
    <FormContainer>
      <FormColumn>
        <Field 
          name="CompanyName"
          labelFor="CompanyName" 
          labelText="Nombre de la empresa:" 
          inputId="CompanyNameInput" 
          type="text" 
		  value={supplierData.CompanyName}
          onChange={handleChange}
        />
        <Field 
          name="ContactName"
          labelFor="ContactName" 
          labelText="Nombre de contacto:" 
          inputId="ContactNameInput" 
		  type="text" 
		  value={supplierData.ContactName}
          onChange={handleChange}
        />
        <Field 
          name="ContactTitle"
          labelFor="ContactTitle" 
          labelText="Título de contacto:" 
          inputId="ContactTitleInput" 
		  type="text" 
		  value={supplierData.ContactTitle}
          onChange={handleChange}
        />
        <Field 
          name="Address"
          labelFor="Address" 
          labelText="Dirección:" 
          inputId="AddressInput" 
		  type="text" 
		  value={supplierData.Address}
          onChange={handleChange}
        />
      
        <Field 
          name="City"
          labelFor="City" 
          labelText="Ciudad:" 
          inputId="CityInput" 
		  type="text" 
		  value={supplierData.City}
          onChange={handleChange}
        />
	  
        <Field 
          name="Region"
          labelFor="Region" 
          labelText="Región:" 
          inputId="RegionInput" 
		  type="text" 
          value={supplierData.Region}
          onChange={handleChange}
        /> 
	  </FormColumn>
      <FormColumn>
        <Field 
          name="PostalCode"
          labelFor="PostalCode" 
          labelText="Código Postal:" 
          inputId="PostalCodeInput" 
          type="text" 
		  maxLength={10} 
		  value={supplierData.PostalCode}
          onChange={handleChange}
        />
	 
        <Field 
          name="Country"
          labelFor="Country" 
          labelText="País:" 
          inputId="CountryInput" 
          type="text" 
		  value={supplierData.Country}
          onChange={handleChange}
        />
        <Field 
          name="Phone"
          labelFor="Phone" 
          labelText="Teléfono:" 
          inputId="PhoneInput" 
          type="tel" 
		  value={supplierData.Phone}
          onChange={handleChange}
        />
        <Field 
          name="Fax"
          labelFor="Fax" 
          labelText="Fax:" 
          inputId="FaxInput" 
          type="text" 
		  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
		  value={supplierData.Fax}
          onChange={handleChange}
        /> 
		<TextAreaWithLabel
			id="homePage"
			name="homePage"
			value={supplierData.HomePage}
			onChange={handleChange}
			placeholder="Ingresa la URL de la página de inicio..."
			labelFor="homePage"
			labelText="Página de inicio:"
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
