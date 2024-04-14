import { useEffect, useState } from "react";
import styled from "styled-components";
import { disabledUser, getUsuarios } from "../api/usuarios";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { ModalUsuario } from "../components/modals/CrearModales/modalUsuario";
import { Preloader } from "./preloader";

export function Usuarios() {
  const [user, setUser] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargartabla = async () => {
    try {
      const respuesta = await getUsuarios();
      const {
        success,
        data: { items },
        message,
      } = respuesta.data;
      if (success) {
        const userKeys = Object.keys(items[0]).filter(
          (key) => key !== "password"
        );
        const nuevasColumnas = userKeys.map((key) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          data: key,
          key: key,
        }));
        setColumns(nuevasColumnas);
        setUser(items);
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
    console.log("Editar categoría con ID:", id);
  };

  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await disabledUser(id);
      const { success, data, message } = respuesta.data;
      if (success) {
        cargartabla();
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  // TODO: implements onReceiveRows
  return (
    <Container>
      <Cabecera title={"Usuarios"}>
        <ModalUsuario
          modalName={"Nuevo Usuarios"}
          title={"Crear nuevo usuario"}
        />
      </Cabecera>
      {loading ? (
        <Preloader /> // Mostrar indicador de carga
      ) : (
        <Cuerpo
          columns={columns}
          data={user}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
