import React, { useState } from 'react';
import styled from 'styled-components';
import Field from '../components/molecules/Field/field';
import Button from '../components/atoms/Button/button';

export function CreateOrder() {
  const [orderData, setOrderData] = useState({
    OrderID: '',
    CustomerID: '',
    EmployeeID: '',
    OrderDate: '',
    RequiredDate: '',
    ShippedDate: '',
    ShipVia: '',
    Freight: 0,
    ShipName: '',
    ShipAddress: '',
    ShipCity: '',
    ShipRegion: '',
    ShipPostalCode: '',
    ShipCountry: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Solicitud
    console.log(orderData);
  }

  const handleCancel = (e) => {
    // Aquí puedes agregar la lógica para cancelar la acción o restablecer el estado, por ejemplo:
    console.log('Se ha cancelado la acción');
  };

  return (
	<FormContainer>
	  <FormColumn>
		<Field
			name="OrderDate"
			labelFor="OrderDate"
			labelText="Fecha del pedido:"
			inputId="OrderDateInput"
			type="date"
			value={orderData.OrderDate}
			onChange={handleChange}
		/>

		<Field
			name="RequiredDate"
			labelFor="RequiredDate"
			labelText="Fecha requerida"
			inputId="RequiredDateInput"
			type="date"
			value={orderData.RequiredDate}
			onChange={handleChange}
		/>

		<Field
			name="ShippedDate"
			labelFor="ShippedDate"
			labelText="Fecha de envío"
			inputId="ShippedDateInput"
			type="date"
			value={orderData.ShippedDate}
			onChange={handleChange}
		/>
      
		<Field
			name="ShipVia"
			labelFor="ShipVia"
			labelText="Método de envío"
			inputId="ShipViaInput"
			type=""
			value={orderData.ShipVia}
			onChange={handleChange}
		/>
      
		<Field
			name="Freight"
			labelFor="Freight"
			labelText="Flete"
			inputId="FreightInput"
			type="number" id="freight" 
			step="0.01" required
			min="0" 
			value={orderData.Freight}
			onChange={handleChange}
		/>
      
		<Field
			name="ShipName"
			labelFor="ShipName"
			labelText="Nombre del destinatario"
			inputId="ShipNameInput"
			type="text"
			value={orderData.ShipName}
			onChange={handleChange}
		/>
      </FormColumn>
      <FormColumn>
		<Field
			name="ShipAddress"
			labelFor="ShipAddress"
			labelText="Dirección de envío"
			inputId="ShipAddressInput"
			type="text"
			value={orderData.ShipAddress}
			onChange={handleChange}
		/>

		<Field
			name="ShipCity"
			labelFor="ShipCity"
			labelText="Ciudad de envío"
			inputId="ShipCityInput"
			type="text"
			value={orderData.ShipCity}
			onChange={handleChange}
		/>

		<Field
			name="ShipRegion"
			labelFor="ShipRegion"
			labelText="Región de envío"
			inputId="ShipRegionInput"
			type="text"
			placeholder="ShipRegion"
			value={orderData.ShipRegion}
			onChange={handleChange}
		/>

		<Field
			name="ShipPostalCode"
			labelFor="ShipPostalCode"
			labelText="Código postal de envío"
			inputId="ShipPostalCodeInput"
			type="text"
	        maxLength={10} 
			value={orderData.ShipPostalCode}
			onChange={handleChange}
		/>

		<Field
			name="ShipCountry"
			labelFor="ShipCountry"
			labelText="País de envío"
			inputId="ShipCountryInput"
			type="text"
			placeholder="ShipCountry"
			value={orderData.ShipCountry}
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
