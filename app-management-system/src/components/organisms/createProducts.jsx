import React, { useState } from "react";
import styled from "styled-components";
import Field from "../components/molecules/Field/field";
import Button from "../components/atoms/Button/button";

export function CreateProducts() {
  const [productData, setProductData] = useState({
    ProductID: "", //Autoincremento
    ProductName: "",
    SupplierID: "",
    CategoryID: "",
    QuantityPerUnit: "",
    UnitPrice: 0,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes manejar la solicitud de acuerdo a tus necesidades
    console.log(productData);
  }
  const handleCancel = (e) => {
    // Aquí puedes agregar la lógica para cancelar la acción o restablecer el estado, por ejemplo:
    console.log('Se ha cancelado la acción');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
	    <FormColumn>
		<Field
			name="QuantityPerUnit"
			labelFor="QuantityPerUnit"
			labelText="Cantidad por unidad"
			inputId="QuantityPerUnitInput"
			type="text"
			value={productData.QuantityPerUnit}
			onChange={handleChange}
		/>
		<Field
			name="UnitPrice"
			labelFor="UnitPrice"
			labelText="Precio Unitario"
			inputId="UnitPriceInput"
			type="number"
			min="0" 
			step="0.01" required 
			value={productData.UnitPrice}
			onChange={handleChange}
		/>
		</FormColumn>
	    <FormColumn>
		<Field
			name="UnitsInStock"
			labelFor="UnitsInStock"
			labelText="Unidades en stock"
			inputId="UnitsInStockInput"
			type="number"
			min="0" 
			value={productData.UnitsInStock}
			onChange={handleChange}
		/>
        
		<Field
			name="UnitsOnOrder"
			labelFor="UnitsOnOrder"
			labelText="Unidades en pedido"
			inputId="UnitsOnOrderInput"
			type="number"
			min="0" 
				max= "6" required 
			value={productData.UnitsOnOrder}
			onChange={handleChange}
		/>
		<Field
			name="ReorderLevel"
			labelFor="ReorderLevel"
			labelText="Nivel de reordenamiento"
			inputId="ReorderLevelInput"
			type="number"
			min="0" 
				max= "6" required 
			value={productData.ReorderLevel}
			onChange={handleChange}
		/>
		<Field
			name="Discontinued"
			labelFor="Discontinued"
			labelText="Descontinuado"
			inputId="DiscontinuedInput"
			type="number"
			min="0"
			    max="1" required
			value={productData.Discontinued}
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