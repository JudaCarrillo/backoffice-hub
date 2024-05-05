import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getVendors,
  getVendorsId,
  updateVendor,
} from "../../../services/vendors";
import { InputComponent } from "../input";
import { ModalParaUpdate } from "../modalparaUpdate";
import { Modal } from "../../modals/modal";
import Field from "../../molecules/Field/field";
import TextAreaWithLabel from "../../molecules/TextAreaWithLabel/textwithlabel";
export function UpdateVendorsModal({
  label,
  open,
  onClose,
  vendorId,
  onReceiveRows,
  title,
}) {
  const [vendors, setVendors] = useState({
      id:  '', // Si es un autoincremento, déjalo vacío
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


useEffect(() => {
  const fetchData = async () => {
    try {
      const vendor = await getVendorsId(vendorId); // Reemplaza getVendorById con la función adecuada para obtener detalles de un vendedor por su ID
      const { success, data, message } = vendor.data;

      if (!success) {
        throw new Error(message);
      }

      setVendors({
        id: data.id,
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
      id: data.id , // Si es un autoincremento, déjalo vacío
      company_name: data.company_name ,
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
  };

  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
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
          name="CompanyName"
          labelFor="CompanyName" 
          labelText="Nombre de la empresa:" 
          inputId="CompanyNameInput" 
          type="text" 
		      value={vendors.company_name}
          onChange={handleChange}
        />
        <Field 
          name="ContactName"
          labelFor="ContactName" 
          labelText="Nombre de contacto:" 
          inputId="ContactNameInput" 
		      type="text" 
		      value={vendors.contact_title}
          onChange={handleChange}
        />
        <Field 
          name="ContactTitle"
          labelFor="ContactTitle" 
          labelText="Título de contacto:" 
          inputId="ContactTitleInput" 
		      type="text" 
		      value={vendors.contact_title}
          onChange={handleChange}
        />
        </FormColumn>
              <FormColumn>
        <Field 
          name="Address"
          labelFor="Address" 
          labelText="Dirección:" 
          inputId="AddressInput" 
		      type="text" 
		      value={vendors.address}
          onChange={handleChange}
        />
      
        <Field 
          name="City"
          labelFor="City" 
          labelText="Ciudad:" 
          inputId="CityInput" 
		      type="text" 
		      value={vendors.city}
          onChange={handleChange}
        />
	  
        <Field 
          name="Region"
          labelFor="Region" 
          labelText="Región:" 
          inputId="RegionInput" 
		      type="text" 
          value={vendors.region}
          onChange={handleChange}
        />
         
	  </FormColumn>
      <FormColumn>
        <Field 
          name="PostalCode"
          labelFor="PostalCode" 
          labelText="Código Postal:" 
          inputId="PostalCodeInput" 
          type="text" 
		      maxLength={10} 
		      value={vendors.postal_code}
          onChange={handleChange}
        />
	 
        <Field 
          name="Country"
          labelFor="Country" 
          labelText="País:" 
          inputId="CountryInput" 
          type="text" 
		      value={vendors.country}
          onChange={handleChange}
        />
        <Field 
          name="Phone"
          labelFor="Phone" 
          labelText="Teléfono:" 
          inputId="PhoneInput" 
          type="tel" 
		  value={vendors.phone}
          onChange={handleChange}
        />
        </FormColumn>
          <FormColumn>
        <Field 
          name="Fax"
          labelFor="Fax" 
          labelText="Fax:" 
          inputId="FaxInput" 
          type="text" 
		  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
		  value={vendors.fax}
          onChange={handleChange}
        /> 
		<TextAreaWithLabel
			id="homePage"
			name="homePage"
			value={vendors.home_page}
			onChange={handleChange}
			placeholder="Ingresa la URL de la página de inicio..."
			labelFor="homePage"
			labelText="Página de inicio:"
        />
      </FormColumn>
    </FormContainer>
        )}
      />
      
)}</Container>
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
