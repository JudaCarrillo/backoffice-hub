import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import {
  deleteCategory,
  exportCategoriesToCsv,
  getCategories,
} from "../services/categories";
import { getCsv, getPrivileges, hasPrivileges } from "../utils/logic";
import { Preloader } from "./preloader";
import { ModalCreateCategory } from "../components/organisms/CreateModals/ModalCreateCategory";
import {UpdateCategoryModal} from "../components/modals/updateModal/updateCategoria";

export function Categoria() {
  const [cat, setCat] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const privilegesReport = getPrivileges("Report");
  const privilegesWrite = getPrivileges("Write");

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getCategories();
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
          setCat(data);
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
  // Función de edición
  const handleEdit = (id) => {
    setEditCategoryId(id); // Almacena el ID de la categoría a editar
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditCategoryId(null);
  };

  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await deleteCategory(id);
      const { success, data, message } = respuesta.data;
      if (success) {
        setCat(cat.filter((categoria) => categoria.id !== id));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };
  const handleReceiveRows = async (data) => {
    data.sort((a, b) => a.id - b.id);
    setCat(data);
  };

  return (
    <Container>
      <Cabecera title={"Category"}>
        {privilegesWrite.length > 0 && (
          <ModalCreateCategory
            modalName={"Nueva Categoria"}
            title={"Crear categoria"}
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
            data={cat}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showActions={hasPrivileges(privilegesWrite)}
            showActionForDownload={hasPrivileges(privilegesReport)}
            handleDownload={() =>
              getCsv({ callback: exportCategoriesToCsv, name: "categories_data" })
            }
          />
          <UpdateCategoryModal
            open={isEditModalOpen}
            title={"Edit Category"}
            onReceiveRows={handleReceiveRows}
            onClose={handleCloseEditModal}
            categoryId={editCategoryId}
            label={"Save"}
          /> 
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
`;
