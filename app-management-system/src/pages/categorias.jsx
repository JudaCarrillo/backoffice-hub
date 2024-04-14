import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteCategory, exportCategoriesToCsv } from "../api/categories";
import { getCategories } from "../api/usuarios";
import { ButtonHead } from "../components/button";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { getCsv } from "../utils/logic";
import { Preloader } from "./preloader";
import { UpdateModal } from "../components/modals/updateModal/updateCategoria";
import { ProductsModal } from "../components/modals/CrearModales/modalCategoria";

export function Categoria() {
  const [cat, setCat] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null); 


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
      console.log('Editar categoría con ID:', id);
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
             <Cabecera title={'Categoria'}>
             <ButtonHead
          name={"Descargar"}
          onClick={() =>
            getCsv({ callback: exportCategoriesToCsv, name: "categories_data" })
          }
          buttonColor="#969593"
        />
            
                <ProductsModal modalName={'Nueva Categoria'} title={'Crear categoria'} onReceiveRows={handleReceiveRows} />
            </Cabecera>
            {loading ? (
                <Preloader />
            ) : (
              <>
                <Cuerpo columns={columns} data={cat} handleEdit={handleEdit} handleDelete={handleDelete} />
                <UpdateModal
                  open={isEditModalOpen}
                  onClose={handleCloseEditModal}
                  categoryId={editCategoryId}
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
