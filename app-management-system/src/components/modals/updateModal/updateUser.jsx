import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputComponent } from '../input';
import { ModalParaUpdate } from '../modalparaUpdate';
import ComboBox from '../comboBox';
import { getUserById, getUserProfile, getUserProfileById, getUsuarios, updateUsers } from '../../../api/usuarios';


export function UpdateUserModal ({ open, onClose, userId, onReceiveRows,title }) {
    const [users, setUsers] = useState({
        username: "",
        email: "",
        password: "",
        is_active: false,
        id_profile: "",
      });
    
    const [profileUserName, setProfileUserName] = useState('');

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const user = await getUserById(userId);
          const { success, data: { items }, message } = user.data;
          if (!success) {
            throw new Error(message);
          }
          setUsers({
            username: items.username,
            email: items.email,
            password: items.password,
            is_active: items.is_active == "on" ? true : false, 
            id_profile: items.id_profile,
          });
        } catch (error) {
          console.error('Error al obtener los detalles de la categoría:', error);
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
            console.error('Error al obtener el nombre de la categoría:', error);
             // Establece el nombre de la categoría como vacío en caso de error
        }
        };
    
        fetchProfileName();
    }, [users.id_profile]);
   

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
          const { data: { items } } = response.data;
          onReceiveRows(items);
          onClose(); // Cerrar el modal después de la actualización exitosa
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
          // Mostrar un mensaje de error o realizar alguna otra acción de manejo de errores
        }
      };
    const clearFormFields = () => {
      setUsers({
        username: "",
        email: "",
        password: "",
        is_active: false,
        id_profile: "",
      });
    };
    const handleChange = (e) => {
        setUsers({
          ...users,
          [e.target.name]: e.target.value,
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
    
  
    return (
      <ModalContainer open={open}>
        <ModalParaUpdate
          title={title}
          showModalContent={() => (
            <>
              <InputComponent
                name={"username"}
                label={"Usuario"}
                type={"text"}
                id={"usuario"}
                value={users.username}
                onChange={handleChange}
              />
              <InputComponent
                name={"email"}
                label={"E-mail"}
                type={"email"}
                id={"email"}
                value={users.email}
                onChange={handleChange}
              />
              <InputComponent
                name={"password"}
                label={"Contraseña"}
                type={"password"}
                id={"contrasena"}
                value={users.password}
                onChange={handleChange}
              />
              <InputComponent
                name={"is_active"}
                label={"Activo"}
                type={"checkbox"}
                id={"activo"}
                checked={users.is_active}
                onChange={handleChange}
              />
              <ComboBox
                name="id_profile"
                label={profileUserName}
                onChange={handleChangeProfile}
                callback={getProfiles}
              />
            </>
          )}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      </ModalContainer>
    );
  }

  
  const ModalContainer = styled.div`
    display: ${({ open }) => (open ? 'block' : 'none')};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  `;