import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getProducts,
  getProductsId,
  updateProduct,
} from "../../../services/products";
import { getCategoriById, getCategories } from "../../../services/categories";
import { getVendors, getVendorsId } from "../../../services/vendors";
import ComboBox from "../comboBox";
import { InputComponent } from "../input";
import { ModalParaUpdate } from "../modalparaUpdate";

export function UpdateProductModal({
  open,
  onClose,
  productId,
  onReceiveRows,
  title,
}) {
  const [products, setProduct] = useState({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    id_category: "",
    id_vendor: "",
  });
  const [categoryName, setCategoryName] = useState("");
  const [vendorsName, setVendorsName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getProductsId(productId);
        const { success, data, message } = product.data;
        if (!success) {
          throw new Error(message);
        }
        setProduct({
          name: data.name,
          price: data.price,
          stock: data.stock,
          description: data.description,
          id_category: data.id_category,
          id_vendor: data.id_vendor,
        });
      } catch (error) {
        console.error("Error al obtener los detalles de la categoría:", error);
      }
    };

    if (open && productId) {
      fetchData();
    }
  }, [open, productId]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const categorias = await getCategoriById(products.id_category);
        const { success, data, message } = categorias.data;
        if (success) {
          setCategoryName(data.name);
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.error("Error al obtener el nombre de la categoría:", error);
        // Establece el nombre de la categoría como vacío en caso de error
      }
    };

    fetchCategoryName();
  }, [products.id_category]);
  useEffect(() => {
    const fetchVendorName = async () => {
      try {
        const vendors = await getVendorsId(products.id_vendor);
        const { success, data, message } = vendors.data;
        if (success) {
          setVendorsName(data.name);
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.error("Error al obtener el nombre de la categoría:", error);
        // Establece el nombre de la categoría como vacío en caso de error
      }
    };

    fetchVendorName();
  }, [products.id_vendor]);

  const getCategoriesForUpdate = async () => {
    const response = await getCategories();
    const { success, data, message } = response.data;
    if (success) {
      return data;
    } else {
      throw new Error(message);
    }
  };

  const getVendorsForUpdate = async () => {
    const response = await getVendors();
    const { success, data, message } = response.data;
    if (success) {
      return data;
    } else {
      throw new Error(message);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(productId, products);
      const rows = await getProducts();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setProduct({
      name: "",
      price: 0,
      stock: 0,
      description: "",
      id_category: "",
      id_vendor: "",
    });
  };
  const handleChange = (e) => {
    setProduct({
      ...products,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
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
    <ModalContainer open={open}>
      <ModalParaUpdate
        title={title}
        showModalContent={() => (
          <>
            <InputComponent
              name="name"
              label="Nombre"
              type="text"
              id="name"
              value={products.name}
              onChange={handleChange}
            />
            <InputComponent
              name="price"
              label="Precio"
              type="number"
              id="price"
              value={products.price}
              onChange={handleChange}
            />
            <InputComponent
              name="stock"
              label="Stock"
              type="number"
              id="stock"
              value={products.stock}
              onChange={handleChange}
            />
            <InputComponent
              name="description"
              label="Descripción"
              type="text"
              id="description"
              value={products.description}
              onChange={handleChange}
            />
            <ComboBox
              name="id_category"
              label={categoryName}
              onChange={handleChangeCategory}
              callback={getCategoriesForUpdate}
            />
            <ComboBox
              name="id_vendor"
              label={vendorsName}
              onChange={handleChangeVendor}
              callback={getVendorsForUpdate}
            />
          </>
        )}
        onClose={handleClose}
        onUpdate={handleUpdate}
      />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
