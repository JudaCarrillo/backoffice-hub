import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrders, createOrder, getShippers } from "../../../services/orders";
import { getCustomers } from "../../../services/customers";
import { getUserEmail } from "../../../utils/logic";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";
import ComboBox from "../../atoms/ComboBox/comboBox";

export function ModalCreateOrder({ modalName, title, onReceiveRows, label }) {
  const [order, setOrder] = useState({
    order_date: "",
    required_date: "",
    customer_id: "",
    employee_id: 0,
    shipped_date: "",
    ship_via: "",
    freight: "",
    ship_name: "",
    ship_address: "",
    ship_city: "",
    ship_region: "",
    ship_postal_code: "",
    ship_country: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [shippers, setShippers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const fetchShippers = async () => {
      const response = await getShippers();
      const { success, data, message } = response.data;
      if (success) {
        setShippers(data);
      } else {
        throw new Error(message);
      }
    };

    const fetchCustomers = async () => {
      const response = await getCustomers();
      const { success, data, message } = response.data;
      if (success) {
        setCustomers(data);
      } else {
        throw new Error(message);
      }
    };

    if (showModal) {
      fetchShippers();
      fetchCustomers();
    }
  }, [showModal]);

  const handleCrearOrder = async () => {
    try {
      const formData = new FormData();

      Object.keys(order).forEach((key) => {
        formData.append(key, order[key]);
      });

      formData.append("email", getUserEmail());

      const response = await createOrder(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getOrders();
        const { data } = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear una orden:", error);
    }
  };

  const handleChangeShipper = (selectedShipper) => {
    setOrder({ ...order, ship_via: selectedShipper });
  };

  const handleChangeCustomer = (selectedCustomer) => {
    setOrder({ ...order, customer_id: selectedCustomer });
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
            <FormContainer className="p-5">
              <FormColumn>
                <Field
                  name="order_date"
                  labelFor="order_date"
                  labelText="Fecha del pedido:"
                  inputId="order_date"
                  type="date"
                  value={order.order_date}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="required_date"
                  labelFor="required_date"
                  labelText="Fecha requerida"
                  inputId="required_date"
                  type="date"
                  value={order.required_date}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="shipped_date"
                  labelFor="shipped_date"
                  labelText="Fecha de envío"
                  inputId="shipped_date"
                  type="date"
                  value={order.shipped_date}
                  onChange={handleChange}
                  isRequired={true}
                />

                <ComboBox
                  name="customer_id"
                  label="Seleccione el cliente"
                  inputId="customer_id"
                  options={customers}
                  onChange={handleChangeCustomer}
                />

                <ComboBox
                  name="ship_via"
                  label="Métodos de envío"
                  inputId="ship_via"
                  options={shippers}
                  onChange={handleChangeShipper}
                />

                <Field
                  name="freight"
                  labelFor="freight"
                  labelText="Flete"
                  inputId="freight"
                  type="number"
                  id="freight"
                  step="0.01"
                  required
                  min="0"
                  value={order.freight}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="ship_name"
                  labelFor="ship_name"
                  labelText="Nombre del destinatario"
                  inputId="ship_name"
                  type="text"
                  value={order.ship_name}
                  onChange={handleChange}
                  isRequired={true}
                />
              </FormColumn>
              <FormColumn>
                <Field
                  name="ship_address"
                  labelFor="ship_address"
                  labelText="Dirección de envío"
                  inputId="ship_address"
                  type="text"
                  value={order.ship_address}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="ship_city"
                  labelFor="ship_city"
                  labelText="Ciudad de envío"
                  inputId="ship_city"
                  type="text"
                  value={order.ship_city}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="ship_region"
                  labelFor="ship_region"
                  labelText="Región de envío"
                  inputId="ship_region"
                  type="text"
                  placeholder="ShipRegion"
                  value={order.ship_region}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="ship_postal_code"
                  labelFor="ship_postal_code"
                  labelText="Código postal de envío"
                  inputId="ship_postal_code"
                  type="text"
                  maxLength={10}
                  value={order.ship_postal_code}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="ship_country"
                  labelFor="ship_country"
                  labelText="País de envío"
                  inputId="ship_country"
                  type="text"
                  placeholder="ShipCountry"
                  value={order.ship_country}
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
