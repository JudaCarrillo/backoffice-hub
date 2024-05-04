import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getVendors,
  getVendorsId,
  updateVendor,
} from "../../../services/vendors";
import { InputComponent } from "../input";
import { ModalParaUpdate } from "../modalparaUpdate";
export function UpdateVendorsModal({
  open,
  onClose,
  vendorsId,
  onReceiveRows,
  title,
}) {
  const [vendors, setVendors] = useState({
    name: "",
    email: "",
    direction: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendor = await getVendorsId(vendorsId);
        const { success, data, message } = vendor.data;
        if (!success) {
          throw new Error(message);
        }
        setVendors({
          name: data.name,
          email: data.email,
          direction: data.direction,
          phone: data.phone,
        });
      } catch (error) {
        console.error("Error al obtener los detalles del vendedor:", error);
      }
    };

    if (open && vendorsId) {
      fetchData();
    }
  }, [open, vendorsId]);

  const handleChange = (e) => {
    setVendors({
      ...vendors,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateVendor(vendorsId, vendors);
      const rows = await getVendors();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setVendors({
      name: "",
      email: "",
      direction: "",
      phone: "",
    });
  };

  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
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
              value={vendors.name}
              onChange={handleChange}
            />
            <InputComponent
              name="email"
              label="Email"
              type="text"
              id="email"
              value={vendors.email}
              onChange={handleChange}
            />
            <InputComponent
              name="direction"
              label="Dirección"
              type="text"
              id="direction"
              value={vendors.direction}
              onChange={handleChange}
            />
            <InputComponent
              name="phone"
              label="Telefón"
              type="text"
              id="phone"
              value={vendors.phone}
              onChange={handleChange}
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
