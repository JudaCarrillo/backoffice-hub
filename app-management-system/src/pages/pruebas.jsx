import React from 'react'
import { ButtonHead } from "../components/button";
import styled from 'styled-components';
import { ModalCreateCustomers } from '../components/organisms/CreateModals/ModalCreateCustomers';
export function Pruebas(handleReceiveRows){
  return (
	<ContainerBotones>
       <ButtonHead
            name={"Descargar"}
            onClick={() =>
              getCsv({ callback: exportProductsToCsv, name: "products_data" })
            }
            buttonColor="#969593"
          />
		<ModalCreateCustomers
            modalName={"Nuevo producto"}
            title={"Crear producto"}
            onReceiveRows={handleReceiveRows}
        />
	</ContainerBotones>
  )
}

export default Pruebas

const ContainerBotones = styled.div`
	padding: 40px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;