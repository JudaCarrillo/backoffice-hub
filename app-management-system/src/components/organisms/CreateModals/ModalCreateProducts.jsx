import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCategories } from "../../../services/categories";
import { createProduct, getProducts } from "../../../services/products";
import { getVendors } from "../../../services/vendors";
import ComboBox from "../../atoms/ComboBox/comboBox";
import { Modal } from "../../modals/modal";
import CheckBox from "../../molecules/CheckBox/checkbox";
import Field from "../../molecules/Field/field";

export function ModalCreateProducts({
  modalName,
  title,
  onReceiveRows,
  label,
}) {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    id_supplier: "",
    id_category: "",
    quantity_per_unit: "",
    unit_price: 0,
    units_in_stock: 0,
    units_on_order: 0,
    reorder_level: 0,
    discontinued: false,
  });

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const response = await getCategories();
      const { success, data, message } = response.data;
      if (success) {
        setCategories(data);
      } else {
        throw new Error(message);
      }
    };

    const fetchVendors = async () => {
      const response = await getVendors();
      const { success, data, message } = response.data;
      if (success) {
        setSuppliers(data);
      } else {
        throw new Error(message);
      }
    };

    if (showModal) {
      fetchUserProfiles();
      fetchVendors();
    }
  }, [showModal]);

  const toggleModal = () => setShowModal(!showModal);

  const handleCrearProducts = async () => {
    try {
      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      const response = await createProduct(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getProducts();
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
    setProduct({ ...product, [name]: value });
  }

  const handleChangeCategory = (selectedCategory) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      id_category: selectedCategory,
    }));
  };

  const handleChangeSupplier = (selectedSupplier) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      id_supplier: selectedSupplier,
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
          onAction={handleCrearProducts}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="bg-slate-400 p-5">
              <FormColumn>
                <Field
                  name="product_name"
                  labelFor="product_name"
                  labelText="Nombre del producto:"
                  inputId="ProductNameInput"
                  type="text"
                  value={product.product_name}
                  onChange={handleChange}
                />
                <ComboBox
                  name="id_category"
                  label="Seleccione la categoría"
                  onChange={handleChangeCategory}
                  options={category}
                />
                <ComboBox
                  name="id_vendor"
                  label="Seleccione el proveedor"
                  onChange={handleChangeSupplier}
                  options={suppliers}
                />
                <Field
                  name="quantity_per_unit"
                  labelFor="quantity_per_unit"
                  labelText="Cantidad por unidad:"
                  inputId="QuantityPerUnitInput"
                  type="text"
                  value={product.quantity_per_unit}
                  onChange={handleChange}
                />

                <Field
                  name="unit_price"
                  labelFor="unit_price"
                  labelText="Precio unitario:"
                  inputId="UnitPriceInput"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={product.unit_price}
                  onChange={handleChange}
                />
              </FormColumn>
              <FormColumn>
                <Field
                  name="units_in_stock"
                  labelFor="units_in_stock"
                  labelText="Unidades en stock:"
                  inputId="UnitsInStockInput"
                  type="number"
                  min="0"
                  value={product.units_in_stock}
                  onChange={handleChange}
                />
                <Field
                  name="units_on_order"
                  labelFor="units_on_order"
                  labelText="Unidades en orden:"
                  inputId="UnitsOnOrderInput"
                  type="number"
                  min="0"
                  max="6"
                  required
                  value={product.units_on_order}
                  onChange={handleChange}
                />

                <Field
                  name="reorder_level"
                  labelFor="reorder_level"
                  labelText="Nivel de reorden:"
                  inputId="ReorderLevelInput"
                  type="number"
                  min="0"
                  max="6"
                  required
                  value={product.reorder_level}
                  onChange={handleChange}
                />

                <CheckBox
                  name="discontinued"
                  htmlfor="discontinued"
                  labelText="Descatalogado:"
                  value={product.discontinued}
                  onChange={handleChange}
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
