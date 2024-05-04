import { useEffect, useState } from "react";
import styled from "styled-components";
import { disabledUser, getUsuarios } from "../services/auth";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { ModalUsuario } from "../components/modals/CrearModales/modalUsuario";
import { UpdateUserModal } from "../components/modals/updateModal/updateUser";
import { Preloader } from "./preloader";
import { ModalCreateEmployees } from "../components/organisms/CreateModals/ModalCreateEmployees";

export function Usuarios() {
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
        <ModalCreateEmployees
          modalName={"Nuevo Usuarios"}
          title={"Crear nuevo usuario"}
          onReceiveRows={handleReceiveRows}
          label={"Crear"}
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
            label={"Actualizar"}
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
