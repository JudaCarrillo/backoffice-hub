import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createUser,
  getUserProfile,
  getUsers,
  getUsersToReport,
} from "../../../services/auth";
import ComboBox from "../../atoms/ComboBox/comboBox";
import { Modal } from "../../organisms/modals/modal";
import CheckBox from "../../molecules/CheckBox/checkbox";
import Field from "../../molecules/Field/field";
import Img_input from "../../molecules/Img/img_input";
import LongText from "../../molecules/LongText/longText";

export function ModalCreateUsers({ modalName, title, onReceiveRows, label }) {
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
    postal_code: "",
    country: "",
    home_phone: "",
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

      Object.keys(users).forEach((key) => {
        formData.append(key, users[key]);
      });

      if (photo) {
        formData.delete("photo");
        formData.append("photo", photo);
      }

      const response = await createUser(formData);
      const { success, data, message } = response.data;

      if (success) {
        const rows = await getUsers();
        const { data } = rows.data;
        onReceiveRows(data);
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
    setPhoto(event.files[0]);
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
          onAction={handleCrearEmployee}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className=" p-5">
              <FormColumn>
                <Field
                  name="last_name"
                  labelFor="last_name"
                  labelText="Apellido:"
                  inputId="LastNameInput"
                  type="text"
                  value={users.last_name}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={20}
                />

                <Field
                  name="first_name"
                  labelFor="first_name"
                  labelText="Nombre:"
                  inputId="FirstNameInput"
                  type="text"
                  value={users.first_name}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={10}
                />

                <Field
                  name="title"
                  labelFor="title"
                  labelText="Título:"
                  inputId="TitleInput"
                  type="text"
                  value={users.title}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={30}
                />

                <Field
                  name="title_of_courtesy"
                  labelFor="title_of_courtesy"
                  labelText="Título de cortesía:"
                  inputId="TitleOfCourtesyInput"
                  type="text"
                  value={users.title_of_courtesy}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={25}
                />

                <Field
                  name="birth_date"
                  labelFor="birth_date"
                  labelText="Fecha de nacimiento:"
                  inputId="BirthDateInput"
                  type="date"
                  value={users.birth_date}
                  onChange={handleChange}
                  isRequired={true}
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
                  isRequired={true}
                />

                <Field
                  name="address"
                  labelFor="address"
                  labelText="Dirección:"
                  inputId="AddressInput"
                  type="text"
                  value={users.address}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={20}
                />

                <Field
                  name="city"
                  labelFor="city"
                  labelText="Ciudad:"
                  inputId="CityInput"
                  type="text"
                  value={users.city}
                  onChange={handleChange}
                  minLength={1}
                  maxLength={15}
                  isRequired={true}
                />

                <Field
                  name="region"
                  labelFor="region"
                  labelText="Región:"
                  inputId="RegionInput"
                  type="text"
                  value={users.region}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={15}
                />

                <ComboBox
                  name="reports_to"
                  label="Seleccione un Usuario"
                  onChange={handleChangeReportsTo}
                  options={usersToReport}
                  isRequired={true}
                />
              </FormColumn>

              <FormColumn>
                <Field
                  name="postal_code"
                  labelFor="postal_code"
                  labelText="Código Postal:"
                  inputId="PostalCodeInput"
                  type="text"
                  minLength={1}
                  maxLength={10}
                  required
                  value={users.postal_code}
                  onChange={handleChange}
                  isRequired={true}
                />

                <Field
                  name="country"
                  labelFor="country"
                  labelText="País:"
                  inputId="CountryInput"
                  type="text"
                  value={users.country}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={15}
                />

                <Field
                  name="home_phone"
                  labelFor="home_phone"
                  labelText="Teléfono de casa:"
                  inputId="HomePhoneInput"
                  type="tel"
                  value={users.home_phone}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={24}
                />

                <Field
                  name="extension"
                  labelFor="extension"
                  labelText="Extensión:"
                  inputId="ExtensionInput"
                  type="text"
                  value={users.extension}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={4}
                />

                <LongText
                  id="notes"
                  name="notes"
                  value={users.notes}
                  onChange={handleChange}
                  labelFor="notes"
                  labelText="Notas:"
                  placeholder="Escribe notas..."
                  minLength={1}
                />
              </FormColumn>

              <FormColumn>
                <Img_input
                  name="photo"
                  id="photo"
                  onChange={handleImageChange}
                  accept="image/*"
                  chooseLabel="Seleccionar Archivo"
                  isRequired={true}
                />

                <Field
                  name="email"
                  labelFor="email"
                  labelText="Email:"
                  inputId="EmailInput"
                  type="email"
                  value={users.email}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={254}
                />

                <Field
                  name="password"
                  labelFor="password"
                  labelText="Contraseña:"
                  inputId="PasswordInput"
                  type="password"
                  value={users.password}
                  onChange={handleChange}
                  isRequired={true}
                  minLength={1}
                  maxLength={255}
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
    background: ${(props) =>
      props.buttonColor || props.theme.bgbtton}; /* Color de fondo del botón */
    cursor: pointer;
    border: none;
    border-radius: 1rem;
    font-size: 17px; /* Tamaño de la fuente */
    font-weight: 800; /* Peso de la fuente */
    color: ${(props) => props.theme.text}; /* Color del texto */
    box-shadow: 0.1rem 0.3rem #00000040; /* Sombra del botón */

    /* Efecto hover */
    &:hover {
      background: ${(props) =>
        props.theme.gray700}; /* Cambia el color de fondo al pasar el ratón */
      color: ${(props) =>
        props.theme.body}; /* Cambia el color del texto al pasar el ratón */
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
