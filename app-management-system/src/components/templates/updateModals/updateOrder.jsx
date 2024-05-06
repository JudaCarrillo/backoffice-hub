import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCustomers } from "../../../services/customers";
import {
  getOrderById,
  getOrders,
  getShippers,
  updateOrder,
} from "../../../services/orders";
import { getUserEmail } from "../../../utils/logic";
import ComboBox from "../../atoms/ComboBox/comboBox";
import Field from "../../molecules/Field/field";
import { Modal } from "../../organisms/modals/modal";

export function UpdateOrderModal({
  orderId,
  open,
  onClose,
  onReceiveRows,
  title,
  label,
}) {
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
  const [shippers, setShippers] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order = await getOrderById(orderId);
        const { success, data, message } = order.data;

        if (!success) {
          throw new Error(message);
        }
        setOrder({
          order_date: data.order_date,
          required_date: data.required_date,
          shipped_date: data.shipped_date,
          ship_via: data.ship_via,
          freight: data.freight,
          ship_name: data.ship_name,
          ship_address: data.ship_address,
          ship_city: data.ship_city,
          ship_region: data.ship_region,
          ship_postalCode: data.ship_postal_code,
          ship_country: data.ship_country,
        });
      } catch (error) {
        console.error("Error al obtener los detalles del vendedor:", error);
      }
    };

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

    if (open && orderId) {
      fetchData();
      fetchShippers();
      fetchCustomers();
    }
  }, [open, orderId]);

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      order.email = getUserEmail();
      await updateOrder(orderId, order);
      const rows = await getOrders();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setOrder({
      order_date: "",
      required_date: "",
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
  };

  const handleChangeShipper = (selectedShipper) => {
    setOrder({ ...order, ship_via: selectedShipper });
  };

  const handleChangeCustomer = (selectedCustomer) => {
    setOrder({ ...order, customer_id: selectedCustomer });
  };

  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
  };

  return (
    <Container>
      {open && orderId && (
        <Modal
          label={label}
          onClose={handleClose}
          onAction={handleUpdate}
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
  height: 45px;
  width: 170px;
  .button_head {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.buttonColor || props.theme.bgbtton};
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    font-size: 17px;
    font-weight: 800;
    color: ${(props) => props.theme.text};
    box-shadow: 0.1rem 0.3rem #00000040;
    &:hover {
      background: ${(props) => props.theme.gray700};
      color: ${(props) => props.theme.body};
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
