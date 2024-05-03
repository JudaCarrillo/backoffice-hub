import React, { useState } from "react";
import styled from "styled-components";
import Button from '../components/atoms/Button/button'
import Field from '../components/molecules/Field/field';
import LongText from "../components/molecules/LongText/longText";

export function Pruebas() {
  const [employeeData, setEmployeeData] = useState({
    EmployeeID: '', // Si es un autoincremento, déjalo vacío
    LastName: '',
    FirstName: '',
    Title: '',
    TitleOfCourtesy: '',
    BirthDate: '',
    HireDate: '',
    Address: '',
    City: '',
    Region: '',
    PostalCode: '',
    Country: '',
    HomePhone: '',
    Extension: '',
    Notes: '',
    ReportsTo: '',
    PhotoPath: '',
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes manejar la solicitud de acuerdo a tus necesidades
    console.log(employeeData);
  }

  const handleCancel = (e) => {
    // Aquí puedes agregar la lógica para cancelar la acción o restablecer el estado, por ejemplo:
    console.log('Se ha cancelado la acción');
  };

  return (
    <FormContainer>
      <FormColumn>
		<Field
			name="LastName"
			labelFor="LastName"
			labelText="Apellido:"
			inputId="LastNameInput"
			type="text"
			value={employeeData.LastName}
			onChange={handleChange}
		/>

		<Field
			name="FirstName"
			labelFor="FirstName"
			labelText="Nombre:"
			inputId="FirstNameInput"
			type="text"
			value={employeeData.FirstName}
			onChange={handleChange}
		/>

		<Field
			name="Title"
			labelFor="Title"
			labelText="Título:"
			inputId="TitleInput"
			type="text"
			value={employeeData.Title}
			onChange={handleChange}
		/>

		<Field
			name="TitleOfCourtesy"
			labelFor="TitleOfCourtesy"
			labelText="Título de cortesía:"
			inputId="TitleOfCourtesyInput"
			type="text"
			value={employeeData.TitleOfCourtesy}
			onChange={handleChange}
		/>

		<Field
			name="BirthDate"
			labelFor="BirthDate"
			labelText="Fecha de nacimiento:"
			inputId="BirthDateInput"
			type="date"
			value={employeeData.BirthDate}
			onChange={handleChange}
		/>

		<Field
			name="HireDate"
			labelFor="HireDate"
			labelText="Fecha de contratación:"
			inputId="HireDateInput"
			type="date"
			value={employeeData.HireDate}
			onChange={handleChange}
		/>

		<Field
			name="Address"
			labelFor="Address"
			labelText="Dirección:"
			inputId="AddressInput"
			type="text"
			value={employeeData.Address}
			onChange={handleChange}
		/>

		<Field
			name="City"
			labelFor="City"
			labelText="Ciudad:"
			inputId="CityInput"
			type="text"
			value={employeeData.City}
			onChange={handleChange}
		/>

		<Field
			name="Region"
			labelFor="Region"
			labelText="Región:"
			inputId="RegionInput"
			type="text"
			value={employeeData.Region}
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
			maxLength={10} required
			value={employeeData.PostalCode}
			onChange={handleChange}
		/>

		<Field
			name="Country"
			labelFor="Country"
			labelText="País:"
			inputId="CountryInput"
			type="text"
			value={employeeData.Country}
			onChange={handleChange}
		/>

		<Field
			name="HomePhone"
			labelFor="HomePhone"
			labelText="Teléfono de casa:"
			inputId="HomePhoneInput"
			type="tel"
			value={employeeData.HomePhone}
			onChange={handleChange}
		/>
		<Field
			name="Extension"
			labelFor="Extension"
			labelText="Extensión:"
			inputId="ExtensionInput"
			type="text"
			value={employeeData.Extension}
			onChange={handleChange}
		/>

		<LongText
			id="notes"
			name="Notes"
			value={employeeData.Notes}
			onChange={handleChange}
			labelFor="notes"
			labelText="Notas:"
			placeholder="Escribe notas..."
		/>
       <Field
			name="ReportsTo"
			labelFor="ReportsTo"
			labelText="Reporta a:"
			inputId="ReportsToInput"
			type="number"
			value={employeeData.ReportsTo}
			onChange={handleChange}
		/>

        <Field 
			id="PicturePath"
			name="PicturePath"
			type="file"
			labelFor="PicturePath"
			labelText="Imagen:"
			accept=".jpeg, .jpg, .png" 
			value={employeeData.PicturePath}
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
