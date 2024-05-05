import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getSupplierById,
  getSuppliers,
  updateSupplier,
} from "../../../services/suppliers";
import { Modal } from "../../organisms/modals/modal";
import Field from "../../molecules/Field/field";

export function UpdateVendorsModal({
  label,
  open,
  onClose,
  vendorId,
  onReceiveRows,
  title,
}) {
  const [vendors, setVendors] = useState({
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendor = await getSupplierById(vendorId);
        const { success, data, message } = vendor.data;

        if (!success) {
          throw new Error(message);
        }

        setVendors({
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
          home_page: data.home_page,
        });
      } catch (error) {
        console.error("Error al obtener los detalles del vendedor:", error);
      }
    };

    if (open && vendorId) {
      fetchData();
    }
  }, [open, vendorId]);

  const handleChange = (e) => {
    setVendors({
      ...vendors,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateSupplier(vendorId, vendors);
      const rows = await getSuppliers();
      const { data } = rows.data;
      onReceiveRows(data);
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };
  const clearFormFields = () => {
    setVendors({
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
    clearFormFields();
    onClose();
  };

  return (
    <Container>
      {open && vendorId && (
        <Modal
          label={label}
          onClose={handleClose}
          onAction={handleUpdate}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="bg-slate-400 p-5">
              <FormColumn>
                <Field
                  name="company_name"
                  labelFor="company_name"
                  labelText="Nombre de la empresa:"
                  inputId="CompanyNameInput"
                  type="text"
                  value={vendors.company_name}
                  onChange={handleChange}
                  isRequired={false}
                />
                <Field
                  name="contact_name"
                  labelFor="contact_name"
                  labelText="Nombre de contacto:"
                  inputId="ContactNameInput"
                  type="text"
                  value={vendors.contact_title}
                  onChange={handleChange}
                />
                <Field
                  name="contact_title"
                  labelFor="contact_title"
                  labelText="Título de contacto:"
                  inputId="ContactTitleInput"
                  type="text"
                  value={vendors.contact_title}
                  onChange={handleChange}
                />
              </FormColumn>
              <FormColumn>
                <Field
                  name="address"
                  labelFor="address"
                  labelText="Dirección:"
                  inputId="AddressInput"
                  type="text"
                  value={vendors.address}
                  onChange={handleChange}
                />

                <Field
                  name="city"
                  labelFor="city"
                  labelText="Ciudad:"
                  inputId="CityInput"
                  type="text"
                  value={vendors.city}
                  onChange={handleChange}
                />

                <Field
                  name="region"
                  labelFor="region"
                  labelText="Región:"
                  inputId="RegionInput"
                  type="text"
                  value={vendors.region}
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
                  value={vendors.postal_code}
                  onChange={handleChange}
                />

                <Field
                  name="country"
                  labelFor="country"
                  labelText="País:"
                  inputId="CountryInput"
                  type="text"
                  value={vendors.country}
                  onChange={handleChange}
                />
                <Field
                  name="phone"
                  labelFor="phone"
                  labelText="Teléfono:"
                  inputId="PhoneInput"
                  type="tel"
                  value={vendors.phone}
                  onChange={handleChange}
                />
              </FormColumn>
              <FormColumn>
                <Field
                  name="fax"
                  labelFor="fax"
                  labelText="Fax:"
                  inputId="FaxInput"
                  type="text"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={vendors.fax}
                  onChange={handleChange}
                />
                <Field
                  name="home_page"
                  labelFor="home_page"
                  labelText="Página de inicio:"
                  inputId="HomePageInput"
                  type="url"
                  value={vendors.home_page}
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
