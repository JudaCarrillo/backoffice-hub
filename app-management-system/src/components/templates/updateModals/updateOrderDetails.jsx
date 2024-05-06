import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getOrderDetailById,
  getOrderDetails,
  updateOrderDetail,
} from "../../../services/order-detail";

import { getOrders } from "../../../services/orders";
import { getProducts } from "../../../services/products";
import ComboBox from "../../atoms/ComboBox/comboBox";
import Field from "../../molecules/Field/field";
import { Modal } from "../../organisms/modals/modal";
export function UpdateOrderDetailtModal({
  orderdetailId,
  open,
  onClose,
  onReceiveRows,
  title,
  label,
}) {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [ordendetail, setOrdenDetail] = useState({
    product_id: "",
    unit_price: "",
    quantity: "",
    discount: "",
    order_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordendetail = await getOrderDetailById(orderdetailId);
        const { success, data, message } = ordendetail.data;

        if (!success) {
          throw new Error(message);
        }
        setOrdenDetail({
          product_id: data.product_id,
          unit_price: data.unit_price,
          quantity: data.quantity,
          discount: data.discount,
          order_id: data.order_id,
        });
      } catch (error) {
        console.error("Error al obtener los detalles del vendedor:", error);
      }
    };

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

    if (open && orderdetailId) {
      fetchData();
      fetchProducts();
      fetchOrders();
    }
  }, [open, orderdetailId]);

  const handleChangeProduct = (selectedProduc) => {
    setOrdenDetail((prevOrdersDetail) => ({
      ...prevOrdersDetail,
      product_id: selectedProduc,
    }));
  };

  const handleChangeOrder = (selectedOrder) => {
    setOrdenDetail((prevOrdersDetail) => ({
      ...prevOrdersDetail,
      order_id: selectedOrder,
    }));
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateOrderDetail(orderdetailId, ordendetail);
      const rows = await getOrderDetails();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar el detalle de orden:", error);
    }
  };
  const clearFormFields = () => {
    setOrdenDetail({
      product_id: "",
      unit_price: "",
      quantity: "",
      discount: "",
      order_id: "",
    });
  };

  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
  };

  return (
    <Container>
      {open && orderdetailId && (
        <Modal
          label={label}
          onClose={handleClose}
          onAction={handleUpdate}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className=" p-5">
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
                  value={ordendetail.unit_price}
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
                  value={ordendetail.quantity}
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
                  value={ordendetail.discount}
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
