import { useEffect, useState } from "react";
import styled from "styled-components";
import { disabledUser, getUsuarios } from "../api/auth";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { ModalUsuario } from "../components/modals/CrearModales/modalUsuario";
import { UpdateUserModal } from "../components/modals/updateModal/updateUser";
import { Preloader } from "./preloader";

export function Usuarios() {
  const urlBase = process.env.API_BASE_URL_AUTH;

  const [user, setUser] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const cargartabla = async () => {
    try {
      const respuesta = await getUsuarios();
      const { success, data, message } = respuesta.data;
      if (success) {
        const newData = data
          .sort((a, b) => a.id - b.id)
          .map((item) => {
            return {
              ...item,
              photo: `${urlBase}${item.photo}`,
            };
          });

        const userKeys = Object.keys(newData[0]).filter((key) => {
          return (
            key !== "password" &&
            key !== "created_at" &&
            key !== "updated_at" &&
            key !== "birth_day" &&
            key !== "title_of_courtesy"
          );
        });

        const nuevasColumnas = userKeys.map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          data: key,
          key: key,
        }));
        setColumns(nuevasColumnas);
        setUser(newData);
        setLoading(false); // Indicar que los datos se han cargado
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al cargar la tabla:", error);
    }
  };

  useEffect(() => {
    cargartabla();
  }, []);

  const handleEdit = (id) => {
    setEditUserId(id); // Almacena el ID de la categoría a editar
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditUserId(null);
  };

  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await disabledUser(id);
      const {
        success,
        data: { items },
        message,
      } = respuesta.data;
      if (success) {
        cargartabla();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };
  const handleReceiveRows = async (items) => {
    items.sort((a, b) => a.id - b.id);
    setUser(items);
  };

  return (
    <Container>
      <Cabecera title={"Usuarios"}>
        <ModalUsuario
          modalName={"Nuevo Usuarios"}
          title={"Crear nuevo usuario"}
          onReceiveRows={handleReceiveRows}
        />
      </Cabecera>
      {loading ? (
        <Preloader /> // Mostrar indicador de carga
      ) : (
        <>
          <Cuerpo
            columns={columns}
            data={user}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <UpdateUserModal
            open={isEditModalOpen}
            onClose={handleCloseEditModal}
            userId={editUserId}
            onReceiveRows={handleReceiveRows}
            title={"Editar usuario"}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
