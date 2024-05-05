import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cabecera } from "../components/organisms/headers/cabecera";
import { Cuerpo } from "../components/organisms/body/cuerpo";
import { UpdateProductModal } from "../components/templates/updateModals/updateProducts";
import { ModalCreateProducts } from "../components/templates/createModals/ModalCreateProducts";
import {
  desabiledProduct,
  exportProductsToCsv,
  getProducts,
} from "../services/products";
import { getCsv, getPrivileges, hasPrivileges } from "../utils/logic";
import { Preloader } from "./preloader";

export function Products() {
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
            key,
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
    setEditProductId(id);
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditProductId(null);
  };
  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await desabiledProduct(id);
      const { success, message } = respuesta.data;
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
      <Cabecera title="Products">
        {privilegesWrite.length > 0 && (
          <ModalCreateProducts
            modalName={"New Product"}
            title={"Create Product"}
            onReceiveRows={handleReceiveRows}
            label={"Create"}
          />
        )}
      </Cabecera>

      {loading ? (
        <Preloader />
      ) : (
        <>
          <Cuerpo
            columns={columns}
            data={pro}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showActions={hasPrivileges(privilegesWrite)}
            showActionForDownload={hasPrivileges(privilegesReport)}
            handleDownload={() =>
              getCsv({
                callback: exportProductsToCsv,
                name: "products_data",
              })
            }
          />
          <UpdateProductModal
            title="Edit Product"
            productId={editProductId}
            onReceiveRows={handleReceiveRows}
            onClose={handleCloseEditModal}
            open={isEditModalOpen}
            label={"Actulizar"}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
