import { useEffect, useState } from "react";
import Button from '../components/atoms/Button/button'
import Field from '../components/molecules/Field/field'
import styled from "styled-components";

export function CreateCustomers() {
  const [customerData, setCustomerData] = useState({
    CustomerID: '',
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
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //Solicitud
    console.log(customerData);
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
          onChange={handleChange}
        />
        <Field 
          name="ContactName"
          labelFor="ContactName" 
          labelText="Nombre de contacto:" 
          inputId="ContactNameInput" 
		  type="text" 
          onChange={handleChange}
        />
        <Field 
          name="ContactTitle"
          labelFor="ContactTitle" 
          labelText="Título de contacto:" 
          inputId="ContactTitleInput" 
		  type="text" 
          onChange={handleChange}
        />
        <Field 
          name="Address"
          labelFor="Address" 
          labelText="Dirección:" 
          inputId="AddressInput" 
		  type="text" 
          onChange={handleChange}
        />
      
        <Field 
          name="City"
          labelFor="City" 
          labelText="Ciudad:" 
          inputId="CityInput" 
		  type="text" 
          onChange={handleChange}
        />
	  </FormColumn>
      <FormColumn>
        <Field 
          name="Region"
          labelFor="Region" 
          labelText="Región:" 
          inputId="RegionInput" 
          placeholder="Ingresar región"
          onChange={handleChange}
        />
        <Field 
          name="PostalCode"
          labelFor="PostalCode" 
          labelText="Código Postal:" 
          inputId="PostalCodeInput" 
          type="text" 
		  maxLength={10} required
          onChange={handleChange}
        />
        <Field 
          name="Country"
          labelFor="Country" 
          labelText="País:" 
          inputId="CountryInput" 
          type="text" 
          onChange={handleChange}
        />
        <Field 
          name="Phone"
          labelFor="Phone" 
          labelText="Teléfono:" 
          inputId="PhoneInput" 
          type="tel" 
          onChange={handleChange}
        />
        <Field 
          name="Fax"
          labelFor="Fax" 
          labelText="Fax:" 
          inputId="FaxInput" 
          type="text" 
		  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
