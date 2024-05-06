import { useEffect, useState } from "react";
import styled from "styled-components";
import {
    getOrderById,
    getOrders,
    updateOrder,
} from "../../../services/orders";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const order= await getOrderById(orderId);
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

    if (open && orderId) {
      fetchData();
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
          value={order.shipped_date}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipVia"
          labelFor="ShipVia"
          labelText="Método de envío"
          inputId="ShipViaInput"
          type="text"
          value={order.ship_via}
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
          value={order.freight}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipName"
          labelFor="ShipName"
          labelText="Nombre del destinatario"
          inputId="ShipNameInput"
          type="text"
          value={order.ship_name}
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
          value={order.ship_address}
          onChange={handleChange}
          isRequired={true}
          />

        <Field
          name="ShipCity"
          labelFor="ShipCity"
          labelText="Ciudad de envío"
          inputId="ShipCityInput"
          type="text"
          value={order.ship_city}
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
          value={order.ship_region}
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
          value={order.ship_postal_code}
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
