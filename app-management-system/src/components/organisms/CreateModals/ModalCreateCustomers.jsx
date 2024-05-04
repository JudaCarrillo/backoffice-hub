import { useState } from "react";
import styled from "styled-components";
import { Modal } from "../../modals/modal";
import Field from "../../molecules/Field/field";
import { createUsers, getUsuarios } from "../../../api/auth"; // Asegúrate de importar createCategory y getCategories

export function ModalCreateCustomers({ modalName, title, onReceiveRows }) {
  const [showModal, setShowModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    CustomerID: "",
    CompanyName: "",
    ContactName: "",
    ContactTitle: "",
    Address: "",
    City: "",
    Region: "",
    PostalCode: "",
    Country: "",
    Phone: "",
    Fax: "",
  });

  const toggleModal = () => setShowModal(!showModal);

  const handleCrear = async () => {
    try {
      const data2 = {
        CompanyName: customerData.CompanyName,
        ContactName: customerData.ContactName,
        ContactTitle: customerData.ContactTitle,
        Address: customerData.Address,
        City: customerData.City,
        Region: customerData.Region,
        PostalCode: customerData.PostalCode,
        Country: customerData.Country,
        Phone: customerData.Phone,
        Fax: customerData.Fax,
      };
      const response = await createUsers(data2); // Utiliza customerData en lugar de categori
      const { success, data, message } = response.data;
      if (success) {
        const rows = await getUsuarios();
        const { data } = rows.data;
        onReceiveRows(data);
        toggleModal(); // Cierra el modal después de la creación exitosa
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <button className="button_head" onClick={toggleModal}>
        {modalName}
      </button>
      {showModal && (
        <Modal
          title={title}
          showModalContent={(handleCloseModal) => (
            <>
              <FormContainer>
                <FormColumn>
                  <Field
                    name="CompanyName"
                    labelFor="CompanyName"
                    labelText="Nombre de la empresa:"
                    inputId="CompanyNameInput"
                    type="text"
                    onChange={handleChange}
                  />
                  <Field
                    name="ContactName"
                    labelFor="ContactName"
                    labelText="Nombre de contacto:"
                    inputId="ContactNameInput"
                    type="text"
                    onChange={handleChange}
                  />
                  <Field
                    name="ContactTitle"
                    labelFor="ContactTitle"
                    labelText="Título de contacto:"
                    inputId="ContactTitleInput"
                    type="text"
                    onChange={handleChange}
                  />
                  <Field
                    name="Address"
                    labelFor="Address"
                    labelText="Dirección:"
                    inputId="AddressInput"
                    type="text"
                    onChange={handleChange}
                  />
                  <Field
                    name="City"
                    labelFor="City"
                    labelText="Ciudad:"
                    inputId="CityInput"
                    type="text"
                    onChange={handleChange}
                  />
                </FormColumn>
                <FormColumn>
                  <Field
                    name="Region"
                    labelFor="Region"
                    labelText="Región:"
                    inputId="RegionInput"
                    type="text"
                    onChange={handleChange}
                  />
                  <Field
                    name="PostalCode"
                    labelFor="PostalCode"
                    labelText="Código Postal:"
                    inputId="PostalCodeInput"
                    type="text"
                    onChange={handleChange}
                  />

                  <Field
                    name="Country"
                    labelFor="Country"
                    labelText="País:"
                    inputId="CountryInput"
                    type="text"
                    onChange={handleChange}
                  />
                  <Field
                    name="Phone"
                    labelFor="Phone"
                    labelText="Teléfono:"
                    inputId="PhoneInput"
                    type="tel"
                    onChange={handleChange}
                  />
                  <Field
                    name="Fax"
                    labelFor="Fax"
                    labelText="Fax:"
                    inputId="FaxInput"
                    type="text"
                    onChange={handleChange}
                  />
                </FormColumn>
              </FormContainer>
            </>
          )}
          onClose={toggleModal}
          onCreate={handleCrear}
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
