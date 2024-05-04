import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getUserById,
  getUserProfile,
  getUsersToReport,
  getUsuarios,
  updateUsers,
} from "../../../services/auth";
import ChkBox from "../../molecules/CheckBox/checkbox";
import Field from "../../molecules/Field/field";
import LongText from "../../molecules/LongText/longText";
import ComboBox from "../comboBox";
import { Modal } from "../../modals/modal";
import Img_input from "../../molecules/Img/img_input";
export function UpdateUserModal({
  userId,
  open,
  onClose,
  onReceiveRows,
  title,
  label,
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
    is_active: true,
    id_profile: "",
    reports_to: "",
    photo: "",
  });

  const [photo, setPhoto] = useState(null);
  const [usersToReport, setUsersToReport] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(userId);
        const userProfiles = await getUserProfile();
        const usersToReport = await getUsersToReport();

        const { success, data, message } = user.data;
        const { success: successUsersToReport, data: users } =
          usersToReport.data;
        const { success: successProfiles, data: profiles } = userProfiles.data;

        if (!success || !successProfiles || !successUsersToReport) {
          throw new Error(message);
        }

        setUsers({
          last_name: data.last_name,
          first_name: data.first_name,
          title: data.title,
          title_of_courtesy: data.title_of_courtesy,
          birth_date: data.birth_date,
          hire_date: data.hire_date,
          address: data.address,
          city: data.city,
          region: data.region,
          postal_code: data.postal_code,
          country: data.country,
          home_phone: data.home_phone,
          extension: data.extension,
          notes: data.notes,
          email: data.email,
          is_active: data.is_active,
          id_profile: data.id_profile,
          reports_to: data.reports_to,
          photo: data.photo,
        });

        setUserProfiles(profiles);
        setUsersToReport(users);
      } catch (error) {
        console.error("Error al obtener los detalles de la categoría:", error);
      }
    };

    if (open && userId) {
      fetchData();
    }
  }, [open, userId]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      Object.keys(users).forEach((key) => {
        formData.append(key, users[key]);
      });

      if (photo) {
        formData.delete("photo");
        formData.append("photo", photo);
      }

      await updateUsers(userId, formData);
      const response = await getUsuarios();
      const { data } = response.data;
      onReceiveRows(data);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
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
      is_active: true,
      id_profile: "",
      reports_to: "",
      photo: "",
    });
  };

  const handleClose = () => {
    clearFormFields();
    onClose();
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
      {open && userId && (
        <Modal
          label={label}
          onClose={handleClose}
          onAction={handleUpdate}
          title={title}
          showModalContent={(handleCloseModal) => (
            <FormContainer className="bg-slate-400 p-5">
              <img
                src={users.photo}
                alt={users.first_name}
                width="500px"
                className="rounded-full"
              />

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
