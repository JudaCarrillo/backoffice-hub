import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserById,
  getUserProfile,
  getUserProfileById,
  getUsuarios,
  updateUsers,
} from "../../../services/auth";
import ChkBox from "../../molecules/CheckBox/checkbox";
import Field from '../../molecules/Field/field';
import LongText from "../../molecules/LongText/longText";
import ComboBox from "../comboBox";
import { ModalParaUpdate } from "../modalparaUpdate";
export function UpdateUserModal({
  open,
  onClose,
  userId,
  onReceiveRows,
  title,
}) {
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
  const [usersToReport, setUsersToReport] = useState([]);
  const [profileUserName, setProfileUserName] = useState("");
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(userId);
        const {
          success,
          data: { items },
          message,
        } = user.data;
        if (!success) {
          throw new Error(message);
        }
        setUsers({
          last_name: items.last_name,
          first_name: items.first_name,
          title: items.title,
          title_of_courtesy: items.title_of_courtesy,
          birth_date: items.birth_date,
          hire_date: items.hire_date,
          address: items.address,
          city: items.city,
          region: items.region,
          postal_code: items.postal_code,
          country: items.country,
          home_phone: items.home_phone,
          extension: items.extension,
          notes: items.notes,
          email: items.email,
          password: "",
          is_active: items.is_active,
          id_profile: items.id_profile,
          reports_to: items.reports_to,
          photo: items.photo,
        });
      } catch (error) {
        console.error("Error al obtener los detalles de la categoría:", error);
      }
    };

    if (open && userId) {
      fetchData();
    }
  }, [open, userId]);

  useEffect(() => {
    const fetchProfileName = async () => {
      try {
        const profile = await getUserProfileById(users.id_profile);
        const { success, data, message } = profile.data;
        if (success) {
          setProfileUserName(data.name);
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.error("Error al obtener el nombre de la categoría:", error);
        // Establece el nombre de la categoría como vacío en caso de error
      }
    };

    fetchProfileName();
  }, [users.id_profile]);

  const fetchUsersReportsTo = async () => {
    const response = await getUsersToReport();
    const { success, data, message } = response.data;
    if (success) {
      setUsersToReport(data);
    } else {
      throw new Error(message);
    }
  };
  const getProfiles = async () => {
    const response = await getUserProfile();
    const { success, data, message } = response.data;
    if (success) {
      return data;
    } else {
      throw new Error(message);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUsers(userId, users);
      const response = await getUsuarios();
      const {
        data: { items },
      } = response.data;
      onReceiveRows(items);
      onClose(); // Cerrar el modal después de la actualización exitosa
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      // Mostrar un mensaje de error o realizar alguna otra acción de manejo de errores
    }
  };
  const clearFormFields = () => {
    setUsers({
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
  };
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUsers({
      ...users,
      [e.target.name]: value,
    });
  };
  const handleClose = () => {
    clearFormFields(); // Limpia los campos del formulario
    onClose(); // Cierra el modal
  };

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
  return (
      <ModalParaUpdate 
        open={open}
        title={title}
        showModalContent={() => (
          <>
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

                <ComboBox
                  name="reports_to"
                  label="Seleccione un Usuario"
                  onChange={handleChangeReportsTo}
                  options={usersToReport}
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

                {/*<Img_input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleImageChange}
                  accept="image/*"
                  chooseLabel="Seleccionar Archivo"
        />*/}
                {/* <Field
                  id="photo"
                  name="photo"
                  type="file"
                  labelFor="photo"
                  labelText="Imagen:"
                  // value={photo ? photo.name : ""}
                  onChange={handleImageChange}
                /> */}
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
                <ChkBox
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
          </>
        )}
        onClose={handleClose}
        onUpdate={handleUpdate}
      />
    
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
const FormContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
