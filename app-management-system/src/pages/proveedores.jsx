import { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteVendor, exportVendorsToCsv, getVendors } from "../api/vendors";
import { ButtonHead } from "../components/button";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import ModalProveedor from "../components/modals/CrearModales/modalProveedor";
import { UpdateVendorsModal } from "../components/modals/updateModal/updateVendors";
import { getPrivileges } from "../services/privileges";
import { getCsv } from "../utils/logic";
import { Preloader } from "./preloader";

export function Proveedores() {
  const [prov, setProv] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editVendorId, setVendorId] = useState(null);

  const privilegesReport = getPrivileges("Report");
  const privilegesWrite = getPrivileges("Write");

  useEffect(() => {
    const cargartabla = async () => {
      try {
        const respuesta = await getVendors();
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
    setVendorId(id); // Almacena el ID de la categoría a editar
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setVendorId(null);
  };

  // Función de eliminación
  const handleDelete = async (id) => {
    try {
      const respuesta = await deleteVendor(id);
      const { success, data, message } = respuesta.data;
      if (success) {
        setProv(prov.filter((vendors) => vendors.id !== id));
      } else {
        throw new Error(message);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };
  const handleReceiveRows = async (data) => {
    data.sort((a, b) => a.id - b.id);
    setProv(data);
  };

  return (
    <Container>
      <Cabecera title={"Vendors"}>
        {privilegesReport.length > 0 && (
          <ButtonHead
            name={"Descargar"}
            onClick={() =>
              getCsv({ callback: exportVendorsToCsv, name: "vendors_data" })
            }
            buttonColor="#969593"
          />
        )}
        {privilegesWrite.length > 0 && (
          <ModalProveedor
            modalName={"Nuevo Proveedor"}
            title={"Crear proveedor"}
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
            data={prov}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          <UpdateVendorsModal
            open={isEditModalOpen}
            title={"Editar Proveedor"}
            onReceiveRows={handleReceiveRows}
            onClose={handleCloseEditModal}
            vendorsId={editVendorId}
          />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;
