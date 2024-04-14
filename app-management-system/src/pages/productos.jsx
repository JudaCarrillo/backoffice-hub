import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteProduct, exportProductsToCsv } from "../api/products";
import { getProducts } from "../api/products";
import { ButtonHead } from "../components/button";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { ModalProductos } from "../components/modals/CrearModales/modalProductos";
import { UpdateProductModal } from "../components/modals/updateModal/updateProducts";
import { getPrivileges } from "../services/privileges";
import { getCsv } from "../utils/logic";
import { Preloader } from "./preloader";

export function Productos() {
  const [pro, setPro] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const privilegesReport = getPrivileges("Report");
  const privilegesWrite = getPrivileges("Write");

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getProducts();
        const { success, data, message } = respuesta.data;
        if (success) {
          data.sort((a, b) => a.id - b.id);
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
    setEditProductId(id); // Almacena el ID de la categoría a editar
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditProductId(null);
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
  const handleReceiveRows = async (data) => {
    data.sort((a, b) => a.id - b.id);
    setPro(data);
  };

  return (
    <Container>
      <Cabecera title={"products"}>
        {privilegesReport.length > 0 && (
          <ButtonHead
            name={"Descargar"}
            onClick={() =>
              getCsv({ callback: exportProductsToCsv, name: "products_data" })
            }
            buttonColor="#969593"
          />
        )}
        {privilegesWrite.length > 0 && (
          <ModalProductos
            modalName={"Nuevo producto"}
            title={"Crear producto"}
            onReceiveRows={handleReceiveRows}
          />
        )}
      </Cabecera>

      {loading ? (
        <Preloader /> // Mostrar indicador de carga
      ) : (
        <>
          <Cuerpo
            columns={columns}
            data={pro}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <UpdateProductModal
            title={"Editar Producto"}
            productId={editProductId}
            onReceiveRows={handleReceiveRows}
            onClose={handleCloseEditModal}
            open={isEditModalOpen}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
