import { useState } from "react";
import styled from "styled-components";
import { getCategories } from "../../../api/categories";
import { createProduct, getProducts } from "../../../api/products";
import { getVendors } from "../../../api/vendors";
import ComboBox from "../comboBox";
import { InputComponent } from "../input";
import { ModalCompleto } from "../modalCompleto";

export function ModalProductos({ modalName, title, onReceiveRows }) {
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    id_category: "",
    id_vendor: "",
  });

  const getCategoriesForCreate = async () => {
    const response = await getCategories();
    const { success, data, message } = response.data;
    if (success) {
      return data;
    } else {
      throw new Error(message);
    }
  };

  const getVendorsForCreate = async () => {
    const response = await getVendors();
    const { success, data, message } = response.data;
    if (success) {
      return data;
    } else {
      throw new Error(message);
    }
  };

  const toggleModal = () => setShowModal(!showModal);

  const handleCrearProduct = async () => {
    try {
      const data2 = {
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        id_category: product.id_category,
        id_vendor: product.id_vendor,
      };
      const response = await createProduct(data2);
      const { success, data, message } = response.data;
      if (success) {
        const rows = await getProducts();
        const data = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangeCategory = (selectedCategory) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      id_category: selectedCategory,
    }));
  };

  const handleChangeVendor = (selectedVendor) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      id_vendor: selectedVendor,
    }));
  };

  return (
    <Container>
      <button className="button_head" onClick={toggleModal}>
        {modalName}
      </button>
      {showModal && (
        <ModalCompleto
          title={title}
          showModalContent={(handleCloseModal) => (
            <>
              <InputComponent
                name="name"
                label="Nombre"
                type="text"
                id="name"
                onChange={handleChange}
              />
              <InputComponent
                name="price"
                label="Precio"
                type="number"
                id="price"
                onChange={handleChange}
              />
              <InputComponent
                name="stock"
                label="Stock"
                type="number"
                id="stock"
                onChange={handleChange}
              />
              <InputComponent
                name="description"
                label="Descripción"
                type="text"
                id="description"
                onChange={handleChange}
              />
              <ComboBox
                name="id_category"
                label="Seleccione la categoría"
                onChange={handleChangeCategory}
                callback={getCategoriesForCreate}
              />
              <ComboBox
                name="id_vendor"
                label="Seleccione el proveedor"
                onChange={handleChangeVendor}
                callback={getVendorsForCreate}
              />
            </>
          )}
          onClose={toggleModal}
          onCreate={handleCrearProduct}
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
