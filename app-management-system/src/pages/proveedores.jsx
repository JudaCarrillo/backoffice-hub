import { useEffect, useState } from "react";
import styled from "styled-components";
import { getVendors } from "../api/usuarios";
import { exportVendorsToCsv } from "../api/vendors";
import { ButtonHead } from "../components/button";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { getCsv } from "../utils/logic";
import { Preloader } from "./preloader";

export function Proveedores() {
  const [prov, setProv] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getVendors();
        const { success, data, message } = respuesta.data;
        if (success) {
          const userKeys = Object.keys(data[0]);
          const nuevasColumnas = userKeys.map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            data: key,
            key: key,
          }));
          setColumns(nuevasColumnas);
          setProv(data);
          setLoading(false); // Indicar que los datos se han cargado
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
    console.log('Editar categoría con ID:', id);
};

// Función de eliminación
const handleDelete = async (id) => {
    try {
        const respuesta = await deleteVendor(id);
        const { success, data, message } = respuesta.data;
        if (success) {
            setProv(prov.filter( vendors => vendors.id !== id));
        } else {
            throw new Error(message);
        }
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
     }
}



  return (
    <Container>
      <Cabecera title={"Vendors"}>
        <ButtonHead
          name={"Descargar"}
          onClick={() =>
            getCsv({ callback: exportVendorsToCsv, name: "vendors_data" })
          }
          buttonColor="#969593"
        />
        <ButtonHead name={"Nuevo Vendor"}  />
      </Cabecera>
      {loading ? (
        <Preloader /> // Mostrar indicador de carga
      ) : (
        <Cuerpo columns={columns} data={prov} handleEdit={handleEdit} handleDelete={handleDelete}   />
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
