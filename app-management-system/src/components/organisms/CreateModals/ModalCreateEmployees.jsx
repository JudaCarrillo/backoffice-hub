import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createUsers,
  getUserProfile,
  getUsersToReport,
} from "../../../services/auth";
import ComboBox from "../../modals/comboBox";
import { Modal } from "../../modals/modal";
import CheckBox from "../../molecules/CheckBox/checkbox";
import Field from "../../molecules/Field/field";
import Img_input from "../../molecules/Img/img_input";
import LongText from "../../molecules/LongText/longText";

export function ModalCreateEmployees({ modalName, title, onReceiveRows }) {
  const [showModal, setShowModal] = useState(false);
  const [userProfiles, setUserProfiles] = useState([]);
  const [usersToReport, setUsersToReport] = useState([]);
  const [photo, setPhoto] = useState(null);

  const [users, setUsers] = useState({
    last_name: "",
    first_name: "",
    title: "",
    title_of_courtesy: "",
    birth_date: "",
    hire_date: "",
    address: "",
    city: "",
    region: "",
    postal_code: 0,
    country: "",
    home_phone: 0,
    extension: "",
    notes: "",
    email: "",
    password: "",
    is_active: true,
    id_profile: "",
    reports_to: "",
    photo: "",
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

    const fetchUsersReportsTo = async () => {
      const response = await getUsersToReport();
      const { success, data, message } = response.data;
      if (success) {
        setUsersToReport(data);
      } else {
        throw new Error(message);
      }
    };

    if (showModal) {
      fetchUserProfiles();
      fetchUsersReportsTo();
    }
  }, [showModal]);

  const toggleModal = () => setShowModal(!showModal);

  const handleChangeProfile = (selectedProfile) => {
    setUsers((prevUser) => ({
      ...prevUser,
      id_profile: selectedProfile,
    }));
  };

  const handleChangeReportsTo = (selectedReportsTo) => {
    setUsers((prevUser) => ({
      ...prevUser,
      reports_to: selectedReportsTo,
    }));
  };

  const handleCrearEmployee = async () => {
    try {
      const formData = new FormData();
      formData.append("last_name", users.last_name);
      formData.append("first_name", users.first_name);
      formData.append("title", users.title);
      formData.append("title_of_courtesy", users.title_of_courtesy);
      formData.append("birth_date", users.birth_date);
      formData.append("hire_date", users.hire_date);
      formData.append("address", users.address);
      formData.append("city", users.city);
      formData.append("region", users.region);
      formData.append("postal_code", users.postal_code);
      formData.append("country", users.country);
      formData.append("home_phone", users.home_phone);
      formData.append("extension", users.extension);
      formData.append("notes", users.notes);
      formData.append("email", users.email);
      formData.append("password", users.password);
      formData.append("is_active", users.is_active);
      formData.append("id_profile", users.id_profile);
      formData.append("reports_to", users.reports_to);
      formData.append("photo", photo);

      const response = await createUsers(formData);
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

  const handleImageChange = (event) => {
    setPhoto(event.target.files[0]);
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
            <FormContainer className="bg-slate-400 p-5">
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
              </FormColumn>

              <FormColumn>
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
                  minLength={15}
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

                <ComboBox
                  name="reports_to"
                  label="Seleccione un Usuario"
                  onChange={handleChangeReportsTo}
                  options={usersToReport}
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
                  value={users.postal_code}
                  onChange={handleChange}
                />

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
              </FormColumn>

              <FormColumn>
                <Img_input
                  name="photo"
                  id="photo"
                  onChange={handleImageChange}
                  accept="image/*"
                  chooseLabel="Seleccionar Archivo"
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

                <CheckBox
                  name="is_active"
                  type="checkbox"
                  labelFor="is_active"
                  labelText="Estado:"
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