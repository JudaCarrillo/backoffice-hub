import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { createUsers, getUsuarios } from "../../../api/auth";
import ComboBox from "../comboBox";
import { InputComponent } from "../input";
import { ModalCompleto } from "../modalCompleto";

export function ModalUsuario({ modalName, title, onReceiveRows }) {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
    is_active: false,
    id_profile: "",
  });

  const toggleModal = () => setShowModal(!showModal);

  const handleChangeProfile = (selectedProfile) => {
    setUsers((prevUser) => ({
      ...prevUser,
      id_profile: selectedProfile,
    }));
  };

  const getProfiles = async () => {
    const response = await axios.get("http://localhost:8000/v1/user_profiles/");
    const { success, data, message } = response.data;
    if (success) {
      return data;
    } else {
      throw new Error(message);
    }
  };

  const handleCrearUser = async () => {
    try {
      const data2 = {
        username: users.username,
        email: users.email,
        password: users.password,
        is_active: users.is_active,
        id_profile: users.id_profile,
      };
      const response = await createUsers(data2);
      const { success, data, message } = response.data;
      if (success) {
        const rows = await getUsuarios();
        const { data } = rows.data;
        onReceiveRows(data);
        toggleModal();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
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
            <>
              <InputComponent
                name={"username"}
                label={"Usuario"}
                type={"text"}
                id={"usuario"}
                onChange={handleChange}
              />
              <InputComponent
                name={"email"}
                label={"E-mail"}
                type={"email"}
                id={"email"}
                onChange={handleChange}
              />
              <InputComponent
                name={"password"}
                label={"Contraseña"}
                type={"password"}
                id={"contrasena"}
                onChange={handleChange}
              />
              <InputComponent
                is_required={false}
                name={"is_active"}
                label={"Activo"}
                type={"checkbox"}
                id={"activo"}
                onChange={handleChange}
              />
              <ComboBox
                name="id_profile"
                label="Seleccione un perfil"
                onChange={handleChangeProfile}
                callback={getProfiles}
              />
            </>
          )}
          onClose={toggleModal}
          onCreate={handleCrearUser}
        />
      )}
    </Container>
  );
}

export default ModalUsuario;

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