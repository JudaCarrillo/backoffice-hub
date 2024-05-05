import { useState } from "react";
import styled from "styled-components";
import { createCustomer, getCustomers } from "../../../services/customers";
import { generateRandomCode } from "../../../utils/logic";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";

export function ModalCreateCustomers({
  modalName,
  title,
  onReceiveRows,
  label,
}) {
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState({
    id: "",
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
  });

  useState(() => {
    const id = generateRandomCode();
    setCustomers({ ...customers, id: id });
  }, []);

  const toggleModal = () => setShowModal(!showModal);

  const handleCrearCustomers = async () => {
    try {
      const formData = new FormData();

      Object.keys(customers).forEach((key) => {
        formData.append(key, customers[key]);
      });

      const response = await createCustomer(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getCustomers();
        const { data } = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }
  };

  const handleChange = (e) => {
    setCustomers({ ...customers, [e.target.name]: e.target.value });
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
          onAction={handleCrearCustomers}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer>
              <FormColumn>
                <Field
                  name="id"
                  labelFor="id"
                  labelText="ID:"
                  inputId="CustomerIdInput"
                  type="text"
                  value={customers.id}
                  readOnly
                />

                <Field
                  name="company_name"
                  labelFor="company_name"
                  labelText="Nombre de la compañia:"
                  inputId="CompanyNameInput"
                  type="text"
                  value={customers.company_name}
                  onChange={handleChange}
                />

                <Field
                  name="contact_name"
                  labelFor="contact_name"
                  labelText="Nombre de contacto:"
                  inputId="ContactNameInput"
                  type="text"
                  value={customers.contact_name}
                  onChange={handleChange}
                />

                <Field
                  name="contact_title"
                  labelFor="contact_title"
                  labelText="Titulo de contacto:"
                  inputId="ContactTitleInput"
                  type="text"
                  value={customers.contact_title}
                  onChange={handleChange}
                />

                <Field
                  name="address"
                  labelFor="address"
                  labelText="Dirección:"
                  inputId="AddressInput"
                  type="text"
                  value={customers.address}
                  onChange={handleChange}
                />

                <Field
                  name="city"
                  labelFor="city"
                  labelText="Ciudad:"
                  inputId="CityInput"
                  type="text"
                  value={customers.city}
                  onChange={handleChange}
                />
              </FormColumn>
              <FormColumn>
                <Field
                  name="region"
                  labelFor="region"
                  labelText="Región:"
                  inputId="RegionInput"
                  type="text"
                  value={customers.region}
                  onChange={handleChange}
                />

                <Field
                  name="postal_code"
                  labelFor="postal_code"
                  labelText="Código Postal:"
                  inputId="PostalCodeInput"
                  type="text"
                  maxLength={10}
                  required
                  value={customers.postal_code}
                  onChange={handleChange}
                />

                <Field
                  name="country"
                  labelFor="country"
                  labelText="País:"
                  inputId="CountryInput"
                  type="text"
                  value={customers.country}
                  onChange={handleChange}
                />

                <Field
                  name="phone"
                  labelFor="phone"
                  labelText="Teléfono:"
                  inputId="PhoneInput"
                  type="tel"
                  value={customers.phone}
                  onChange={handleChange}
                />

                <Field
                  name="fax"
                  labelFor="fax"
                  labelText="Fax:"
                  inputId="FaxInput"
                  type="text"
                  value={customers.fax}
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
