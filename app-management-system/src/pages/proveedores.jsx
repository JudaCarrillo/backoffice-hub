import { useEffect, useState } from "react";
import styled from "styled-components";
import { Cabecera } from "../components/cabecera";
import { Cuerpo } from "../components/cuerpo";
import { UpdateVendorsModal } from "../components/modals/updateModal/updateVendors";
import {
  deleteVendor,
  exportVendorsToCsv,
  getVendors,
} from "../services/vendors";
import { getCsv, getPrivileges, hasPrivileges } from "../utils/logic";
import { Preloader } from "./preloader";
import { ModalCreateSuppliers } from "../components/organisms/CreateModals/ModalCreateSuppliers";

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

          const columns = nuevasColumnas.map((column) => {
            return {
              ...column,
              title: column.title.replace(/_/g, " "),
            };
          });

          setColumns(columns);
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
      console.error("Error al eliminar Proveedor:", error);
    }
  };
  const handleReceiveRows = async (data) => {
    data.sort((a, b) => a.id - b.id);
    setProv(data);
  };

  return (
    <Container>
      <Cabecera title={"Suppliers"}>
        {privilegesWrite.length > 0 && (
          <ModalCreateSuppliers
            modalName={"Nuevo Proveedor"}
            title={"Crear proveedor"}
            onReceiveRows={handleReceiveRows}
          />
        )}
      </Cabecera>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Cuerpo
            columns={columns}
            data={prov}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            showActions={hasPrivileges(privilegesWrite)}
            showActionForDownload={hasPrivileges(privilegesReport)}
            handleDownload={() =>
              getCsv({ callback: exportVendorsToCsv, name: "vendors_data" })
            }
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
