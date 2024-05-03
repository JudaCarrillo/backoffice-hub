import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createUsers, getUsuarios } from "../../../api/auth";
import Field from '../../molecules/Field/field';
import LongText from "../../molecules/LongText/longText";
import { getUserProfile } from "../../../api/auth";
import { ModalCompleto } from "../../modals/modalCompleto";
import ComboBox from "../../modals/comboBox";

export function ModalCreateEmployees({modalName, title, onReceiveRows}) {
  const [showModal, setShowModal] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [users, setUsers] = useState({
    employee_ID: '', // Si es un autoincremento, déjalo vacío
    last_name: '',
    first_name: '',
    title: '',
    title_of_courtesy: '',
    birth_date: '',
    hire_date: '',
    address: '',
    city: '',
    region: '',
    postal_code: 0,
    country: '',
    home_phone: 0,
    extension: '',
    notes: '',
	email: '',
    password: '',
    is_active: false,
    id_profile: '',
    reports_to: '',
    photo_path: '',
  });
  
  useEffect(() => {
    const fetchUserProfiles = async () => {
      const response = await getUserProfile();
      const { success, data, message } = response.data;
      if (success) {
        setUserProfiles(data);
      } else {
        throw new Error(message);
      }
    };

    if (showModal) {
      fetchUserProfiles();
    }

  }, [showModal]);

  const toggleModal = () => setShowModal(!showModal);

  const handleChangeProfile = (selectedProfile) => {
    setUsers((prevUser) => ({
      ...prevUser,
      id_profile: selectedProfile,
    }));
  };

  const handleCrearEmployee = async () => {
    try {
      const data2 = {
        last_name:users.last_name,
		first_name: users.first_name,
		title: users.title,
		title_of_courtesy: users.title_of_courtesy,
		birth_date: users.birth_date,
		hire_date: users.hire_date,
		address: users.address,
		city: users.cityData,
		region: users.region,
		postal_code: users.postal_code,
		country: users.country,
		home_phone: users.home_phone,
		extension: users.extension,
		notes: users.notes,
		email: users.email,
		password: users.password,
		is_active: users.is_active,
		id_profile: users.id_profile,
		reports_to: users.reports_to,
		photo_path: users.photo_path,
      };
      const response = await createUsers(data2);
      const { success, data, message } = response.data;
      if (success) {
        const rows = await getUsuarios();
        const {
          data: { items },
        } = rows.data;
        onReceiveRows(items);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear el empleado:", error);
    }
  };
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUsers({ ...users, [e.target.name]: value });
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
            <FormContainer>
              <FormColumn>
                <Field
                  name="last_name"
                  labelFor="last_name"
                  labelText="Apellido:"
                  inputId="LastNameInput"
                  type="text"
                  value={users.last_name}
                  onChange={handleChange}
                />

                <Field
                  name="first_name"
                  labelFor="first_name"
                  labelText="Nombre:"
                  inputId="FirstNameInput"
                  type="text"
                  value={users.first_name}
                  onChange={handleChange}
                />

                <Field
                  name="title"
                  labelFor="title"
                  labelText="Título:"
                  inputId="TitleInput"
                  type="text"
                  value={users.title}
                  onChange={handleChange}
                />

                <Field
                  name="title_of_courtesy"
                  labelFor="title_of_courtesy"
                  labelText="Título de cortesía:"
                  inputId="TitleOfCourtesyInput"
                  type="text"
                  value={users.title_of_courtesy}
                  onChange={handleChange}
                />

                <Field
                  name="birth_date"
                  labelFor="birth_date"
                  labelText="Fecha de nacimiento:"
                  inputId="BirthDateInput"
                  type="date"
                  value={users.birth_date}
                  onChange={handleChange}
                />

                <Field
                  name="hire_date"
                  labelFor="hire_date"
                  labelText="Fecha de contratación:"
                  inputId="HireDateInput"
                  type="date"
                  value={users.hire_date}
                  onChange={handleChange}
                />

                <Field
                  name="address"
                  labelFor="address"
                  labelText="Dirección:"
                  inputId="AddressInput"
                  type="text"
                  value={users.address}
                  onChange={handleChange}
                />

                <Field
                  name="city"
                  labelFor="city"
                  labelText="Ciudad:"
                  inputId="CityInput"
                  type="text"
                  value={users.city}
                  onChange={handleChange}
                />

                <Field
                  name="region"
                  labelFor="region"
                  labelText="Región:"
                  inputId="RegionInput"
                  type="text"
                  value={users.region}
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
                  value={users.postal_code}
                  onChange={handleChange}
                />
			  </FormColumn>
              <FormColumn>
                <Field
                  name="country"
                  labelFor="country"
                  labelText="País:"
                  inputId="CountryInput"
                  type="text"
                  value={users.country}
                  onChange={handleChange}
                />
              
                <Field
                  name="home_phone"
                  labelFor="home_phone"
                  labelText="Teléfono de casa:"
                  inputId="HomePhoneInput"
                  type="tel"
                  value={users.home_phone}
                  onChange={handleChange}
                />

                <Field
                  name="extension"
                  labelFor="extension"
                  labelText="Extensión:"
                  inputId="ExtensionInput"
                  type="text"
                  value={users.extension}
                  onChange={handleChange}
                />

                <LongText
                  id="notes"
                  name="notes"
                  value={users.notes}
                  onChange={handleChange}
                  labelFor="notes"
                  labelText="Notas:"
                  placeholder="Escribe notas..."
                />

                <Field
                  name="reports_to"
                  labelFor="reports_to"
                  labelText="Reporta a:"
                  inputId="ReportsToInput"
                  type="number"
                  value={users.reports_to}
                  onChange={handleChange}
                />

                <Field
                  id="photo_path"
                  name="photo_path"
                  type="file"
                  labelFor="photo_path"
                  labelText="Imagen:"
                  accept=".jpeg, .jpg, .png"
                  value={users.photo_path}
                  onChange={handleChange}
                />
				<Field
                  name="email"
                  labelFor="email"
                  labelText="Email:"
                  inputId="EmailInput"
				  type="email"
                  value={users.email}
				  onChange={handleChange}
				  required
				/>
				<Field
                  name="password"
                  labelFor="password"
                  labelText="Contraseña:"
                  inputId="PasswordInput"
				  type="password"
                  value={users.password}
				  onChange={handleChange}
				  required
				/>
				<Field
                  name="is_active"
                  type="checkbox"
                  labelFor="is_active"
                  labelText="Activo:"
                  value={users.is_active}
                  onChange={handleChange}
                />
				<ComboBox
                name="id_profile"
                label="Seleccione un perfil"
                onChange={handleChangeProfile}
                options={userProfiles}
              />
              </FormColumn>
            </FormContainer>
          )}
          onClose={toggleModal}
          onCreate={handleCrearEmployee}
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
