import React, { useState } from 'react';
import styled from "styled-components";
import { createVendor, getVendors } from '../../../services/vendors';
import { Modal } from "../../modals/modal";
import Field from "../../molecules/Field/field";

export function ModalCreateSuppliers ({ modalName, title, onReceiveRows, label }) {
  const [showModal, setShowModal] = useState(false);
  const [suppliers, setSuppliers] = useState({
    company_name: '',
    contact_name: '',
    contact_title: '',
    address: '',
    city: '',
    region: '',
    postal_code: '',
    country: '',
    phone: '',
    fax: '',
    home_page: '',
  });

  const toggleModal = () => setShowModal(!showModal);

  const handleCrearSuppliers = async () => {
    try {
      const formData = new FormData();
      
      Object.keys(suppliers).forEach((key) => {
        formData.append(key, suppliers[key]);
      });

      const response = await createVendor(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getVendors();
        const {
          data: { items },
        } = rows.data;
        onReceiveRows(items);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear el proveedor:", error);
    }
  };
  
  const handleChange = (e) => {
    setSuppliers({ ...suppliers, [e.target.name]: e.target.value });
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
          onAction={handleCrearSuppliers}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="">
              <FormColumn>
                <Field
                  name="company_name"
                  labelFor="company_name"
                  labelText="Nombre de la compañia:"
                  inputId="CompanyNameInput"
                  type="text"
                  value={suppliers.company_name}
                  onChange={handleChange}
                />

                <Field
                  name="contact_name"
                  labelFor="contact_name"
                  labelText="Nombre de contacto:"
                  inputId="ContactNameInput"
                  type="text"
                  value={suppliers.contact_name}
                  onChange={handleChange}
                />

                <Field
                  name="contact_title"
                  labelFor="contact_title"
                  labelText="Titulo de contacto:"
                  inputId="ContactTitleInput"
                  type="text"
                  value={suppliers.contact_name}
                  onChange={handleChange}
                />

                <Field
                  name="address"
                  labelFor="address"
                  labelText="Dirección:"
                  inputId="AddressInput"
                  type="text"
                  value={suppliers.address}
                  onChange={handleChange}
                />

                <Field
                  name="city"
                  labelFor="city"
                  labelText="Ciudad:"
                  inputId="CityInput"
                  type="text"
                  value={suppliers.city}
                  onChange={handleChange}
                />

                <Field
                  name="region"
                  labelFor="region"
                  labelText="Región:"
                  inputId="RegionInput"
                  type="text"
                  value={suppliers.region}
                  onChange={handleChange}
                />
              </FormColumn>
              <FormColumn>
                <Field
                  name="postal_code"
                  labelFor="postal_code"
                  labelText="Código Postal:"
                  inputId="PostalCodeInput"
                  type="text"
                  maxLength={10}
                  required
                  value={suppliers.postal_code}
                  onChange={handleChange}
                />

                <Field
                  name="country"
                  labelFor="country"
                  labelText="País:"
                  inputId="CountryInput"
                  type="text"
                  value={suppliers.country}
                  onChange={handleChange}
                />

                <Field
                  name="phone"
                  labelFor="phone"
                  labelText="Teléfono:"
                  inputId="PhoneInput"
                  type="tel"
                  value={suppliers.phone}
                  onChange={handleChange}
                />

                <Field 
                  name="fax"
                  labelFor="fax" 
                  labelText="Fax:" 
                  inputId="FaxInput" 
                  type="text" 
                  value={suppliers.fax}
                  onChange={handleChange}
                />

                <Field 
                  type="url" 
                  name="home_page" 
                  labelFor="home_page" 
                  labelText="Página de inicio:"
                  inputId="HomePageInput" 
                  value={suppliers.home_page}  
                  onChange={handleChange}
                  required
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
    background: ${(props) => props.buttonColor || props.theme.bgbtton}; /* Color de fondo del botón */
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    font-size: 17px; /* Tamaño de la fuente */
    font-weight: 800; /* Peso de la fuente */
    color: ${(props) => props.theme.text}; /* Color del texto */
    box-shadow: 0.1rem 0.3rem #00000040; /* Sombra del botón */
    
    /* Efecto hover */
    &:hover {
      background: ${(props) => props.theme.gray700}; /* Cambia el color de fondo al pasar el ratón */
      color: ${(props) => props.theme.body}; /* Cambia el color del texto al pasar el ratón */
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
