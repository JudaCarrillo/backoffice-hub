import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cabecera } from "../components/organisms/headers/cabecera";
import { Cuerpo } from "../components/organisms/body/cuerpo";
import { UpdateUserModal } from "../components/templates/updateModals/updateUser";
import { ModalCreateUsers } from "../components/templates/createModals/ModalCreateUsers";
import { disableUser, getUsers } from "../services/auth";
import { Preloader } from "./preloader";

export function Users() {
  const [user, setUser] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const cargartabla = async () => {
    try {
      const respuesta = await getUsers();
      const { success, data, message } = respuesta.data;
      if (success) {
        data.sort((a, b) => a.id - b.id);

        const nuevasColumnas = Object.keys(data[0]).map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          data: key,
          key: key,
        }));

        const columns = nuevasColumnas.map((item) => {
          return {
            ...item,
            title: item.title.replace("_", " "),
          };
        });

        setColumns(columns);
        setUser(data);
        setLoading(false);
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
      const respuesta = await disableUser(id);
      const { success, data, message } = respuesta.data;
      if (success) {
        // setUser(user.filter((users) => users.id !== id));
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
      <Cabecera title={"Users"}>
        <ModalCreateUsers
          modalName={"New User"}
          title={"Create user"}
          onReceiveRows={handleReceiveRows}
          label={"Create"}
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
            showActions={true}
          />
          <UpdateUserModal
            open={isEditModalOpen}
            userId={editUserId}
            onClose={handleCloseEditModal}
            label={"Update"}
            title={"Editar usuario"}
            onReceiveRows={handleReceiveRows}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
