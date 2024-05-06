import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getCustomerById,
  getCustomers,
  updateCustomer,
} from "../../../services/customers";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";
export function UpdateCustomerModal({
  customerId,
  open,
  onClose,
  onReceiveRows,
  title,
  label,
}) {
  const [customer, setCustomer] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer = await getCustomerById(customerId);
        const { success, data, message } = customer.data;

        if (!success) {
          throw new Error(message);
        }
        setCustomer({
          company_name: data.company_name,
          contact_name: data.contact_name,
          contact_title: data.contact_title,
          address: data.address,
          city: data.city,
          region: data.region,
          postal_code: data.postal_code,
          country: data.country,
          phone: data.phone,
          fax: data.fax,
        });
      } catch (error) {
        console.error("Error al obtener los detalles del vendedor:", error);
      }
    };

    if (open && customerId) {
      fetchData();
    }
  }, [open, customerId]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateCustomer(customerId, customer);
      const rows = await getCustomers();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setCustomer({
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
      {open && customerId && (
        <Modal
          label={label}
          onClose={handleClose}
          onAction={handleUpdate}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="p-5">
              <FormColumn>
                <Field
                  name="company_name"
                  labelFor="company_name"
                  labelText="Nombre de la compañia:"
                  inputId="CompanyNameInput"
                  type="text"
                  value={customer.company_name}
                  onChange={handleChange}
                />

                <Field
                  name="contact_name"
                  labelFor="contact_name"
                  labelText="Nombre de contacto:"
                  inputId="ContactNameInput"
                  type="text"
                  value={customer.contact_name}
                  onChange={handleChange}
                />

                <Field
                  name="contact_title"
                  labelFor="contact_title"
                  labelText="Titulo de contacto:"
                  inputId="ContactTitleInput"
                  type="text"
                  value={customer.contact_title}
                  onChange={handleChange}
                />

                <Field
                  name="address"
                  labelFor="address"
                  labelText="Dirección:"
                  inputId="AddressInput"
                  type="text"
                  value={customer.address}
                  onChange={handleChange}
                />

                <Field
                  name="city"
                  labelFor="city"
                  labelText="Ciudad:"
                  inputId="CityInput"
                  type="text"
                  value={customer.city}
                  onChange={handleChange}
                />

                <Field
                  name="region"
                  labelFor="region"
                  labelText="Región:"
                  inputId="RegionInput"
                  type="text"
                  value={customer.region}
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
                  value={customer.postal_code}
                  onChange={handleChange}
                />

                <Field
                  name="country"
                  labelFor="country"
                  labelText="País:"
                  inputId="CountryInput"
                  type="text"
                  value={customer.country}
                  onChange={handleChange}
                />

                <Field
                  name="phone"
                  labelFor="phone"
                  labelText="Teléfono:"
                  inputId="PhoneInput"
                  type="tel"
                  value={customer.phone}
                  onChange={handleChange}
                />

                <Field
                  name="fax"
                  labelFor="fax"
                  labelText="Fax:"
                  inputId="FaxInput"
                  type="text"
                  value={customer.fax}
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
