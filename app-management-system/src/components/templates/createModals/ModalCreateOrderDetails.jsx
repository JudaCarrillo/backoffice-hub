import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ComboBox from "../../atoms/ComboBox/comboBox";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";
import {
  getOrderDetails,
  createOrderDetail,
} from "../../../services/order-detail";
import { getOrders } from "../../../services/orders";
import { getProducts } from "../../../services/products";

export function ModalCreateOrderDetails({
  modalName,
  title,
  onReceiveRows,
  label,
}) {
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [orderDetailsData, setOrderDetailsData] = useState({
    product_id: "",
    unit_price: "",
    quantity: "",
    discount: "",
    order_id: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      const { success, data, message } = response.data;
      if (success) {
        setProduct(data);
      } else {
        throw new Error(message);
      }
    };

    const fetchOrders = async () => {
      const response = await getOrders();
      const { success, data, message } = response.data;
      if (success) {
        setOrder(data);
      } else {
        throw new Error(message);
      }
    };

    if (showModal) {
      fetchProducts();
      fetchOrders();
    }
  }, [showModal]);

  const toggleModal = () => setShowModal(!showModal);

  const handleCreateOrderDetail = async () => {
    try {
      const formData = new FormData();

      Object.keys(orderDetailsData).forEach((key) => {
        formData.append(key, orderDetailsData[key]);
      });

      const response = await createOrderDetail(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getOrderDetails();
        const { data } = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setOrderDetailsData({ ...orderDetailsData, [name]: value });
  }

  const handleChangeProduct = (selectedProduc) => {
    setOrderDetailsData((prevOrdersDetail) => ({
      ...prevOrdersDetail,
      product_id: selectedProduc,
    }));
  };

  const handleChangeOrder = (selectedOrder) => {
    setOrderDetailsData((prevOrdersDetail) => ({
      ...prevOrdersDetail,
      order_id: selectedOrder,
    }));
  };
  return (
    <Container>
      <button className="button_head" onClick={toggleModal}>
        {modalName}
      </button>
      {showModal && (
        <Modal
          label={label}
          onClose={toggleModal}
          onAction={handleCreateOrderDetail}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="p-5">
              <FormColumn>
                <div className="flex flex-col gap-4">
                  <ComboBox
                    name="order_id"
                    label="Select Order:"
                    onChange={handleChangeOrder}
                    options={order}
                  />
                  <ComboBox
                    name="product_id"
                    label="Select Product:"
                    onChange={handleChangeProduct}
                    options={product}
                  />
                </div>
                <Field
                  name="unit_price"
                  labelFor="unit_price"
                  labelText="Precio unitario:"
                  inputId="UnitPriceInput"
                  type="number"
                  value={orderDetailsData.unit_price}
                  onChange={handleChange}
                  minlength={1}
                  maxlength={40}
                  isRequired={true}
                />

                <Field
                  name="quantity"
                  labelFor="quantity"
                  labelText="Cantidad:"
                  inputId="QuantityInput"
                  type="number"
                  value={orderDetailsData.quantity}
                  onChange={handleChange}
                  minlength={1}
                  maxlength={40}
                  isRequired={true}
                />

                <Field
                  name="discount"
                  type="number"
                  labelFor="discount"
                  labelText="Descuento:"
                  inputId="DiscountInput"
                  value={orderDetailsData.discount}
                  onChange={handleChange}
                  minlength={1}
                  maxlength={40}
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
