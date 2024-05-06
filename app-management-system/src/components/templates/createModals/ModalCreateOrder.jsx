import React, { useState } from "react";
import styled from "styled-components";
import { getOrders,createOrder} from "../../../services/orders";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";

export function ModalCreateOrder({
  modalName,
  title,
  onReceiveRows,
  label,
}) {
  const [order, setOrder] = useState({
    OrderID: "",
    CustomerID: "",
    EmployeeID: "",
    OrderDate: "",
    RequiredDate: "",
    ShippedDate: "",
    ShipVia: "",
    Freight: 0,
    ShipName: "",
    ShipAddress: "",
    ShipCity: "",
    ShipRegion: "",
    ShipPostalCode: "",
    ShipCountry: "",
  });

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const handleCrearOrder = async () => {
    try {
      const formData = new FormData();

      Object.keys(order).forEach((key) => {
        formData.append(key, order[key]);
      });

      

      const response = await createOrder(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getOrders();
        const {
          data
        } = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear una orden:", error);
    }
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  }

 

  return (
    <Container>
      <button className="button_head" onClick={toggleModal}>
        {modalName}
      </button>
      {showModal && (
        <Modal
          label={label}
          onClose={toggleModal}
          onAction={handleCrearOrder}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="bg-slate-400 p-5">
              <FormColumn>
              <Field
          name="OrderDate"
          labelFor="OrderDate"
          labelText="Fecha del pedido:"
          inputId="OrderDateInput"
          type="date"
          value={order.OrderDate}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="RequiredDate"
          labelFor="RequiredDate"
          labelText="Fecha requerida"
          inputId="RequiredDateInput"
          type="date"
          value={order.RequiredDate}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShippedDate"
          labelFor="ShippedDate"
          labelText="Fecha de envío"
          inputId="ShippedDateInput"
          type="date"
          value={order.ShipAddress}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipVia"
          labelFor="ShipVia"
          labelText="Método de envío"
          inputId="ShipViaInput"
          type=""
          value={order.ShipVia}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="Freight"
          labelFor="Freight"
          labelText="Flete"
          inputId="FreightInput"
          type="number"
          id="freight"
          step="0.01"
          required
          min="0"
          value={order.Freight}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipName"
          labelFor="ShipName"
          labelText="Nombre del destinatario"
          inputId="ShipNameInput"
          type="text"
          value={order.ShipName}
          onChange={handleChange}
          isRequired={true}
          />
      </FormColumn>
      <FormColumn>
        <Field
          name="ShipAddress"
          labelFor="ShipAddress"
          labelText="Dirección de envío"
          inputId="ShipAddressInput"
          type="text"
          value={order.ShipAddress}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipCity"
          labelFor="ShipCity"
          labelText="Ciudad de envío"
          inputId="ShipCityInput"
          type="text"
          value={order.ShipCity}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipRegion"
          labelFor="ShipRegion"
          labelText="Región de envío"
          inputId="ShipRegionInput"
          type="text"
          placeholder="ShipRegion"
          value={order.ShipRegion}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipPostalCode"
          labelFor="ShipPostalCode"
          labelText="Código postal de envío"
          inputId="ShipPostalCodeInput"
          type="text"
          maxLength={10}
          value={order.ShipPostalCode}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipCountry"
          labelFor="ShipCountry"
          labelText="País de envío"
          inputId="ShipCountryInput"
          type="text"
          placeholder="ShipCountry"
          value={order.ShipCountry}
          onChange={handleChange}
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
