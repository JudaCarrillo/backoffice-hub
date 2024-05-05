import React, { useState } from "react";
import styled from "styled-components";
import Field from "../components/molecules/Field/field"
import Button from "../../atoms/Button/button";

export function CreateOrderDetails() {
  const [orderDetailsData, setOrderDetailsData] = useState({
    OrderID: '',
    ProductID: '',
    UnitPrice: '',
    Quantity: '',
    Discount: '',
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setOrderDetailsData({ ...orderDetailsData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //Solicitud
    console.log(orderDetailsData);
  }
  
  const handleCancel = (e) => {
    // Aquí puedes agregar la lógica para cancelar la acción o restablecer el estado, por ejemplo:
    console.log('Se ha cancelado la acción');
  };

  return (
	<FormContainer>
    <FormColumn>
		<Field 
			name="OrderID"
			labelFor="OrderID" 
			labelText="OrderID:" 
			inputId="OrderIDInput" 
			type="number"
			value={orderDetailsData.OrderID}
			onChange={handleChange}
		/>

		<Field 
			name="ProductID"
			labelFor="ProductID" 
			labelText="ProductID:" 
			inputId="ProductIDInput" 
			type="number" 
			value={orderDetailsData.ProductID}
			onChange={handleChange}
		/>

		<Field 
			name="UnitPrice"
			labelFor="UnitPrice" 
			labelText="Precio unitario:" 
			inputId="UnitPriceInput" 
			type="number" 
            min="0" 
			step="0.01" required 
			value={orderDetailsData.UnitPrice}
			onChange={handleChange}
		/>

		<Field 
			name="Quantity"
			labelFor="Quantity" 
			labelText="Cantidad:" 
			inputId="QuantityInput" 
			type="text" 
			min="0" required
			value={orderDetailsData.Quantity}
			onChange={handleChange}
		/>

		<Field 
			name="Discount"
			labelFor="Discount" 
			labelText="Descuento:" 
			inputId="DiscountInput" 
			type="number" 
			min="0" step="0.01" required
			value={orderDetailsData.Discount}
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
