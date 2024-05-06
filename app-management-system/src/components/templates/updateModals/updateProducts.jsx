import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCategories } from "../../../services/categories";
import {
  getProductById,
  updateProduct,
  getProducts,
} from "../../../services/products";
import { getSuppliers } from "../../../services/suppliers";
import ComboBox from "../../atoms/ComboBox/comboBox";
import { Modal } from "../../organisms/modals/modal";
import CheckBox from "../../molecules/CheckBox/checkbox";
import Field from "../../molecules/Field/field";
export function UpdateProductModal({
  productId,
  open,
  onClose,
  onReceiveRows,
  title,
  label,
}) {
  const [suppliers, setSuppliers] = useState([]);
  const [category, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
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
    const fetchData = async () => {
      try {
        const product = await getProductById(productId);
        const { success, data, message } = product.data;

        if (!success) {
          throw new Error(message);
        }
        setProduct({
          name: data.name,
          id_supplier: data.id_supplier,
          id_category: data.id_supplier,
          quantity_per_unit: data.quantity_per_unit,
          unit_price: data.unit_price,
          units_in_stock: data.units_in_stock,
          units_on_order: data.units_on_order,
          reorder_level: data.reorder_level,
          discontinued: data.discontinued,
        });
      } catch (error) {
        console.error("Error al obtener los detalles del vendedor:", error);
      }
    };

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
      const response = await getSuppliers();
      const { success, data, message } = response.data;
      if (success) {
        setSuppliers(data);
      } else {
        throw new Error(message);
      }
    };

    if (open && productId) {
      fetchData();
      fetchUserProfiles();
      fetchVendors();
    }
  }, [open, productId]);

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

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(productId, product);
      const rows = await getProducts();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setProduct({
      company_name: "",
      contact_name: "",
      contact_title: "",
      address: "",
      city: "",
      region: "",
      postal_code: "",
      country: "",
      phone: "",
      fax: "",
      home_page: "",
    });
  };

  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
  };

  return (
    <Container>
      {open && productId && (
        <Modal
          label={label}
          onClose={handleClose}
          onAction={handleUpdate}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className=" p-5">
              <FormColumn>
                <Field
                  name="name"
                  labelFor="name"
                  labelText="Nombre del producto:"
                  inputId="ProductNameInput"
                  type="text"
                  value={product.name}
                  onChange={handleChange}
                  isRequired={true}
                  minlength={1}
                  maxlength={40}
                />
                <div className="flex flex-col gap-4">
                  <ComboBox
                    name="id_category"
                    label="Seleccione la categoría"
                    onChange={handleChangeCategory}
                    options={category}
                  />
                  <ComboBox
                    name="id_supplier"
                    label="Seleccione el proveedor"
                    onChange={handleChangeSupplier}
                    options={suppliers}
                  />
                </div>
                <Field
                  name="quantity_per_unit"
                  labelFor="quantity_per_unit"
                  labelText="Cantidad por unidad:"
                  inputId="QuantityPerUnitInput"
                  type="text"
                  value={product.quantity_per_unit}
                  onChange={handleChange}
                  isRequired={true}
                  minlength={1}
                  maxlength={20}
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
