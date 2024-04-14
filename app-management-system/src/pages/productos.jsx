import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteProduct, exportProductsToCsv } from "../api/products";
import { getProducts } from "../api/usuarios";
import { ButtonHead } from "../components/button";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { ModalProductos } from "../components/modals/CrearModales/modalProductos";
import { getCsv } from "../utils/logic";
import { Preloader } from "./preloader";

export function Productos() {
  const [pro, setPro] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getProducts();
        const { success, data, message } = respuesta.data;
        if (success) {
          const userKeys = Object.keys(data[0]);
          const nuevasColumnas = userKeys.map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            data: key,
            key: key,
          }));
          setColumns(nuevasColumnas);
          setPro(data);
          setLoading(false);
        } else {
          throw new Error(message);
        }
      } catch (error) {
        console.error("Error al cargar la tabla:", error);
      }
    };

    cargartabla();
  }, []);

  const handleEdit = (id) => {
    console.log("Editar categoría con ID:", id);
  };

  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await deleteProduct(id);
      const { success, data, message } = respuesta.data;
      if (success) {
        setPro(pro.filter((products) => products.id !== id));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <Container>
      <Cabecera title={"products"}>
        <ButtonHead
          name={"Descargar"}
          onClick={() =>
            getCsv({ callback: exportProductsToCsv, name: "products_data" })
          }
          buttonColor="#969593"
        />
        <ModalProductos modalName={"Nueva producto"} title={"Crear producto"} />
      </Cabecera>
      {loading ? (
        <Preloader /> // Mostrar indicador de carga
      ) : (
        <Cuerpo
          columns={columns}
          data={pro}
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
